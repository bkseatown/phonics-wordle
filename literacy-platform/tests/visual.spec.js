const path = require('path');
const { pathToFileURL } = require('url');
const { test, expect } = require('@playwright/test');

const pages = [
  { id: 'home', file: 'index.html', ready: '.home-main' },
  { id: 'word-quest', file: 'word-quest.html', ready: '#game-canvas' },
  { id: 'fluency', file: 'fluency.html', ready: '.fluency-main' },
  { id: 'cloze', file: 'cloze.html', ready: '.cloze-main' },
  { id: 'comprehension', file: 'comprehension.html', ready: '.comp-main' },
  { id: 'writing', file: 'writing.html', ready: '.writing-main' },
  { id: 'plan-it', file: 'plan-it.html', ready: '.planit-main' },
  { id: 'number-sense', file: 'number-sense.html', ready: '.numsense-main' },
  { id: 'operations', file: 'operations.html', ready: '.numsense-main' },
  { id: 'teacher-report', file: 'teacher-report.html', ready: '.report-main' }
];

const rootDir = path.resolve(__dirname, '..');

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('hq_english_voice_notice', 'true');
      localStorage.setItem('hq_voice_notice_shown', 'true');
    } catch (e) {}

    const fixedNow = 1735689600000;
    const NativeDate = Date;
    class FixedDate extends NativeDate {
      constructor(...args) {
        if (args.length === 0) {
          super(fixedNow);
        } else {
          super(...args);
        }
      }
      static now() {
        return fixedNow;
      }
    }
    Date = FixedDate;

    let seed = 1337;
    Math.random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  });
});

for (const pageConfig of pages) {
  test(`${pageConfig.id} visual layout`, async ({ page }, testInfo) => {
    if (pageConfig.id === 'plan-it') {
      testInfo.setTimeout(120_000);
    }

    const url = pathToFileURL(path.join(rootDir, pageConfig.file)).href;
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await expect(page.locator(pageConfig.ready)).toBeVisible();
    await page.addStyleTag({
      content: `
        * { caret-color: transparent !important; }
        #toast-container, .toast { display: none !important; }
      `
    });
    await page.waitForTimeout(500);

    if (pageConfig.id === 'fluency') {
      await expect(page.locator('#quick-response-dock')).toBeHidden();
      await expect(page.locator('#story-track .story-track-steps')).toBeHidden();
    }

    if (pageConfig.id === 'word-quest' && testInfo.project.name === 'desktop-chromium') {
      const hasNoVerticalOverflow = await page.evaluate(() => {
        const tolerance = 2;
        return document.documentElement.scrollHeight <= window.innerHeight + tolerance;
      });
      expect(hasNoVerticalOverflow).toBeTruthy();
    }

    const screenshot = await page.screenshot({
      fullPage: false,
      animations: 'disabled'
    });
    expect(screenshot).toMatchSnapshot(`${pageConfig.id}.png`, {
      maxDiffPixelRatio: 0.01
    });
  });
}
