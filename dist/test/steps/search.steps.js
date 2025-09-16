"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const search_page_1 = require("../../main/page_object/search-page");
function getSearch(world) {
    if (!world.page) {
        throw new Error('Page is not initialised on the world instance.');
    }
    return new search_page_1.SearchPage(world.page);
}
(0, cucumber_1.When)('I search for {string}', async function (term) {
    const search = getSearch(this);
    await search.search(term);
});
(0, cucumber_1.Then)('I should see search results', async function () {
    const search = getSearch(this);
    (0, chai_1.expect)(await search.resultsVisible()).to.be.true;
});
