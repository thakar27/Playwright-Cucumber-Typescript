import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import type { Browser, BrowserContext, LaunchOptions, Page } from 'playwright';
import { getBrowser, BrowserName } from './browser';

export interface TestWorldParams {
  browser?: BrowserName;
  headless?: boolean;
  contextOptions?: Parameters<Browser['newContext']>[0];
  launchOptions?: LaunchOptions;
}

export class TestWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  parameters: TestWorldParams;

  constructor(opts: IWorldOptions) {
    super(opts);
    this.parameters = (opts.parameters as TestWorldParams) || {};
  }

  async createPage() {
    await this.closePage();

    const browserName =
      this.parameters.browser ?? ((process.env.BROWSER as BrowserName) || 'chromium');

    const headless =
      this.parameters.headless ?? (process.env.HEADLESS ? process.env.HEADLESS !== 'false' : false);

    const launchOptions = this.parameters.launchOptions ?? {};
    const browser = await getBrowser(browserName, headless, launchOptions);

    let context: BrowserContext | undefined;
    let page: Page | undefined;

    try {
      context = await browser.newContext(this.parameters.contextOptions);
      page = await context.newPage();
    } catch (error) {
      await page?.close().catch(() => undefined);
      await context?.close().catch(() => undefined);
      throw error;
    }

    this.browser = browser;
    this.context = context;
    this.page = page;
  }

  async closePage() {
    const closers = [] as Array<Promise<unknown>>;
    if (this.page) {
      closers.push(this.page.close().catch(() => undefined));
    }
    if (this.context) {
      closers.push(this.context.close().catch(() => undefined));
    }
    if (closers.length) {
      await Promise.all(closers);
    }
    this.page = undefined;
    this.context = undefined;
  }
}

setWorldConstructor(TestWorld);
