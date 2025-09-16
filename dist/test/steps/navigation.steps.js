"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
(0, cucumber_1.Given)('I open {string}', async function (url) {
    await this.page.goto(url);
});
(0, cucumber_1.Then)('I should see the title contains {string}', async function (part) {
    await this.page.waitForLoadState('domcontentloaded');
    const title = await this.page.title();
    (0, chai_1.expect)(title).to.include(part);
});
