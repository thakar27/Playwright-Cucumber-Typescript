"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const cucumber_1 = require("@cucumber/cucumber");
const browser_1 = require("./browser");
(0, cucumber_1.setDefaultTimeout)(60000);
(0, cucumber_1.BeforeAll)(() => {
    for (const dir of ['reports', 'reports/mchr']) {
        (0, node_fs_1.mkdirSync)(dir, { recursive: true });
    }
});
(0, cucumber_1.Before)(async function () {
    await this.createPage();
});
(0, cucumber_1.After)(async function ({ result }) {
    if (result?.status !== 'PASSED' && this.page) {
        try {
            const png = await this.page.screenshot({ fullPage: true });
            await this.attach(png, 'image/png');
        }
        catch (error) {
            await this.attach(`Screenshot capture failed: ${error.message}`, 'text/plain');
        }
    }
    await this.closePage();
});
(0, cucumber_1.AfterAll)(async () => {
    await (0, browser_1.closeSharedBrowser)();
});
