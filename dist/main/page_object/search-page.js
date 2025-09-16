"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPage = void 0;
const base_page_1 = require("./base-page");
class SearchPage extends base_page_1.BasePage {
    constructor() {
        super(...arguments);
        this.searchBox = 'textarea[name="q"]';
        this.results = '#search';
    }
    async search(query) {
        await this.elements.fill(this.searchBox, query);
        await this.elements.press(this.searchBox, 'Enter');
    }
    async resultsVisible() {
        await this.page.waitForLoadState('networkidle');
        return this.page.locator(this.results).isVisible();
    }
}
exports.SearchPage = SearchPage;
