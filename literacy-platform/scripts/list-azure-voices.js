#!/usr/bin/env node

function parseArgs(argv) {
    const args = {};
    argv.forEach((part) => {
        if (!part.startsWith('--')) return;
        const raw = part.slice(2);
        const eqIndex = raw.indexOf('=');
        if (eqIndex === -1) {
            args[raw] = 'true';
            return;
        }
        const key = raw.slice(0, eqIndex);
        const value = raw.slice(eqIndex + 1);
        args[key] = value;
    });
    return args;
}

function splitList(value = '') {
    return String(value || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

function printUsage() {
    console.log(`
List Azure TTS voices

Usage:
  node scripts/list-azure-voices.js [options]

Credentials:
  --region=<region>        or env AZURE_SPEECH_REGION
  --key=<key>              or env AZURE_SPEECH_KEY

Filters:
  --lang=en-US,en-GB       language prefix filter (optional)
  --search=ava,emma,dragon case-insensitive name contains filter
  --limit=40               max rows to print (default 80)
`);
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    if (args.help === 'true' || args.h === 'true') {
        printUsage();
        return;
    }

    const region = (args.region || process.env.AZURE_SPEECH_REGION || '').trim();
    const key = (args.key || process.env.AZURE_SPEECH_KEY || '').trim();
    if (!region || !key) {
        throw new Error('Missing Azure credentials. Set AZURE_SPEECH_REGION and AZURE_SPEECH_KEY.');
    }

    const langFilters = splitList(args.lang).map((item) => item.toLowerCase());
    const searchTerms = splitList(args.search).map((item) => item.toLowerCase());
    const limit = Number.isFinite(Number(args.limit)) ? Math.max(1, Number(args.limit)) : 80;

    const response = await fetch(
        `https://${region}.tts.speech.microsoft.com/cognitiveservices/voices/list`,
        {
            headers: {
                'Ocp-Apim-Subscription-Key': key
            }
        }
    );
    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Voice list request failed (${response.status}): ${body.slice(0, 240)}`);
    }

    const voices = await response.json();
    if (!Array.isArray(voices)) {
        throw new Error('Unexpected voice list response.');
    }

    let filtered = voices.slice();
    if (langFilters.length) {
        filtered = filtered.filter((voice) => {
            const locale = String(voice?.Locale || '').toLowerCase();
            return langFilters.some((filter) => locale.startsWith(filter.toLowerCase()));
        });
    }
    if (searchTerms.length) {
        filtered = filtered.filter((voice) => {
            const name = String(voice?.ShortName || '').toLowerCase();
            const display = String(voice?.DisplayName || '').toLowerCase();
            const style = Array.isArray(voice?.StyleList) ? voice.StyleList.join(' ').toLowerCase() : '';
            return searchTerms.some((term) => name.includes(term) || display.includes(term) || style.includes(term));
        });
    }

    filtered = filtered.sort((a, b) => {
        const localeA = String(a?.Locale || '');
        const localeB = String(b?.Locale || '');
        if (localeA !== localeB) return localeA.localeCompare(localeB);
        const shortA = String(a?.ShortName || '');
        const shortB = String(b?.ShortName || '');
        return shortA.localeCompare(shortB);
    });

    const sliced = filtered.slice(0, limit);
    console.log(`Voices matched: ${filtered.length} (showing ${sliced.length})`);
    console.log('ShortName | Locale | Gender | Multilingual | Styles');
    console.log('---');
    sliced.forEach((voice) => {
        const shortName = String(voice?.ShortName || '');
        const locale = String(voice?.Locale || '');
        const gender = String(voice?.Gender || '');
        const multilingual = /multilingual/i.test(shortName) ? 'yes' : 'no';
        const styles = Array.isArray(voice?.StyleList) && voice.StyleList.length
            ? voice.StyleList.slice(0, 4).join(',')
            : '-';
        console.log(`${shortName} | ${locale} | ${gender} | ${multilingual} | ${styles}`);
    });
}

main().catch((error) => {
    console.error(`[voices] ${error.message || String(error)}`);
    process.exit(1);
});
