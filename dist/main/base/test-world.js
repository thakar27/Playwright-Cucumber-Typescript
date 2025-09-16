"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestWorld = void 0;
const cucumber_1 = require("@cucumber/cucumber");
const browser_1 = require("./browser");
class TestWorld extends cucumber_1.World {
    constructor(opts) {
        super(opts);
        this.parameters = opts.parameters || {};
    }
    async createPage() {
        await this.closePage();
        const browserName = this.parameters.browser ?? (process.env.BROWSER || 'chromium');
        const headless = this.parameters.headless ?? (process.env.HEADLESS ? process.env.HEADLESS !== 'false' : false);
        const launchOptions = this.parameters.launchOptions ?? {};
        const browser = await (0, browser_1.getBrowser)(browserName, headless, launchOptions);
        let context;
        let page;
        try {
            context = await browser.newContext(this.parameters.contextOptions);
            page = await context.newPage();
        }
        catch (error) {
            await page?.close().catch(() => undefined);
            await context?.close().catch(() => undefined);
            throw error;
        }
        this.browser = browser;
        this.context = context;
        this.page = page;
    }
    async closePage() {
        const closers = [];
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
exports.TestWorld = TestWorld;
(0, cucumber_1.setWorldConstructor)(TestWorld);
