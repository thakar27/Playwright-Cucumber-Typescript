"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrowser = getBrowser;
exports.closeSharedBrowser = closeSharedBrowser;
const node_util_1 = require("node:util");
const playwright_1 = require("playwright");
let sharedBrowser;
let sharedBrowserConfig;
function getLauncher(name) {
    return name === 'firefox' ? playwright_1.firefox : name === 'webkit' ? playwright_1.webkit : playwright_1.chromium;
}
function needsNewBrowser(current, config, desired) {
    if (!current || !current.isConnected() || !config) {
        return true;
    }
    if (config.name !== desired.name || config.headless !== desired.headless) {
        return true;
    }
    return !(0, node_util_1.isDeepStrictEqual)(config.launchOptions, desired.launchOptions);
}
async function getBrowser(name = 'chromium', headless = false, launchOptions = {}) {
    const desiredConfig = {
        name,
        headless,
        launchOptions: launchOptions ?? {},
    };
    if (needsNewBrowser(sharedBrowser, sharedBrowserConfig, desiredConfig)) {
        if (sharedBrowser) {
            await sharedBrowser.close().catch(() => undefined);
        }
        const launcher = getLauncher(name);
        sharedBrowser = await launcher.launch({ headless, ...launchOptions });
        sharedBrowserConfig = {
            name,
            headless,
            launchOptions: { ...launchOptions },
        };
    }
    if (!sharedBrowser) {
        throw new Error('Unable to obtain a Playwright browser instance.');
    }
    return sharedBrowser;
}
async function closeSharedBrowser() {
    if (sharedBrowser) {
        await sharedBrowser.close().catch(() => undefined);
        sharedBrowser = undefined;
        sharedBrowserConfig = undefined;
    }
}
