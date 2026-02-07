# Voice Pack Runbook

Use this to generate multiple high-quality Azure voice packs and switch them in Teacher settings.

## 1) Set Azure credentials

```bash
cd "/Users/robertwilliamknaus/Desktop/New project/literacy-platform"
export AZURE_SPEECH_KEY='YOUR_KEY'
export AZURE_SPEECH_REGION='eastus'
```

## 1.5) Discover available voices in your region

```bash
npm run tts:voices -- --lang=en-US,en-GB --search=ava,emma,dragon,sonia,ryan --limit=60
```

## 2) Build packs

### Ava multilingual (EN/ES/ZH/TL)

```bash
npm run tts:azure -- --pack-id=ava-multi --pack-name="Ava Multilingual" --languages=en,es,zh,tl --fields=word,def,sentence --fallback-lang=en --voice-map=scripts/azure-voice-map.ava-multilingual.example.json --overwrite=true
```

### Emma English

```bash
npm run tts:azure -- --pack-id=emma-en --pack-name="Emma English" --languages=en --fields=word,def,sentence --voice-map=scripts/azure-voice-map.en-emma.example.json --overwrite=true
```

### British Sonia English

```bash
npm run tts:azure -- --pack-id=sonia-en-gb --pack-name="Sonia British English" --languages=en --fields=word,def,sentence --voice-map=scripts/azure-voice-map.en-gb-sonia.example.json --overwrite=true
```

### British Ryan English

```bash
npm run tts:azure -- --pack-id=ryan-en-gb --pack-name="Ryan British English" --languages=en --fields=word,def,sentence --voice-map=scripts/azure-voice-map.en-gb-ryan.example.json --overwrite=true
```

## 3) Confirm generated files

Voice packs are written to:

```text
audio/tts/packs/<pack-id>/
```

Pack registry used by the app:

```text
audio/tts/packs/pack-registry.json
```

## 4) Switch packs in app

1. Open **Teacher** in Word Quest
2. In **Audio voice pack**, click **Refresh packs**
3. Choose a pack from the dropdown
4. Click **Play pack sample** to verify clip quality instantly

The selected pack is stored in your local settings.
