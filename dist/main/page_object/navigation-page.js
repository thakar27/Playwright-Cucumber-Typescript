"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationPage = void 0;
const base_page_1 = require("./base-page");
class NavigationPage extends base_page_1.BasePage {
    async open(url) {
        await this.goto(url);
    }
    async waitForDomContentLoaded() {
        await this.page.waitForLoadState('domcontentloaded');
    }
    async getTitle() {
        return this.page.title();
    }
}
exports.NavigationPage = NavigationPage;
