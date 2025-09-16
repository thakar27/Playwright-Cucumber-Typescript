"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementHelper = void 0;
class ElementHelper {
    constructor(page) {
        this.page = page;
    }
    resolve(target) {
        return typeof target === 'string' ? this.page.locator(target) : target;
    }
    async click(target, options) {
        const locator = this.resolve(target);
        await locator.waitFor({ state: 'visible' });
        await locator.click(options);
    }
    async fill(target, value, options) {
        const locator = this.resolve(target);
        await locator.waitFor({ state: 'visible' });
        await locator.fill(value, options);
    }
    async type(target, value, options) {
        const locator = this.resolve(target);
        await locator.waitFor({ state: 'visible' });
        await locator.type(value, options);
    }
    async hover(target, options) {
        const locator = this.resolve(target);
        await locator.waitFor({ state: 'visible' });
        await locator.hover(options);
    }
    async selectOption(target, values, options) {
        const locator = this.resolve(target);
        await locator.waitFor({ state: 'visible' });
        await locator.selectOption(values, options);
    }
    async press(target, key, options) {
        const locator = this.resolve(target);
        await locator.waitFor({ state: 'visible' });
        await locator.press(key, options);
    }
}
exports.ElementHelper = ElementHelper;
