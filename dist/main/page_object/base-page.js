"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const element_helper_1 = require("../helper/element-helper");
class BasePage {
    constructor(page) {
        this.page = page;
        this.elements = new element_helper_1.ElementHelper(page);
    }
    async goto(path, options) {
        await this.page.goto(path, options);
    }
}
exports.BasePage = BasePage;
