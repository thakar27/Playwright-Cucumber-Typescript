"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const chai_1 = require("chai");
const navigation_page_1 = require("../../main/page_object/navigation-page");
const url_config_1 = require("../../main/helper/url-config");
function getNavigation(world) {
    if (!world.page) {
        throw new Error('Page is not initialised on the world instance.');
    }
    return new navigation_page_1.NavigationPage(world.page);
}
(0, cucumber_1.Given)('I open {string}', async function (urlKey) {
    const navigation = getNavigation(this);
    const url = (0, url_config_1.getUrl)(urlKey);
    await navigation.open(url);
});
(0, cucumber_1.Then)('I should see the title contains {string}', async function (part) {
    const navigation = getNavigation(this);
    await navigation.waitForDomContentLoaded();
    const title = await navigation.getTitle();
    (0, chai_1.expect)(title).to.include(part);
});
