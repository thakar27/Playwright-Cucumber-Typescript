import { mkdirSync } from 'node:fs';
import { BeforeAll, Before, After, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { closeSharedBrowser } from './browser';
import type { TestWorld } from './test-world';

setDefaultTimeout(60_000);

BeforeAll(() => {
  for (const dir of ['reports', 'reports/mchr']) {
    mkdirSync(dir, { recursive: true });
  }
});

Before(async function (this: TestWorld) {
  await this.createPage();
});

After(async function (this: TestWorld, { result }) {
  if (result?.status !== 'PASSED' && this.page) {
    try {
      const png = await this.page.screenshot({ fullPage: true });
      await this.attach(png, 'image/png');
    } catch (error) {
      await this.attach(`Screenshot capture failed: ${(error as Error).message}`, 'text/plain');
    }
  }
  await this.closePage();
});

AfterAll(async () => {
  await closeSharedBrowser();
});
