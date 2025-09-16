"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = getUrl;
exports.listKnownUrls = listKnownUrls;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
let cachedUrls;
function loadUrls() {
    if (!cachedUrls) {
        const filePath = (0, node_path_1.resolve)(process.cwd(), 'config', 'urls.json');
        const raw = (0, node_fs_1.readFileSync)(filePath, 'utf-8').replace(/^\uFEFF/, '');
        cachedUrls = JSON.parse(raw);
    }
    return cachedUrls;
}
function getUrl(nameOrUrl) {
    const urls = loadUrls();
    const key = nameOrUrl.trim().toLowerCase();
    if (key in urls) {
        return urls[key];
    }
    return nameOrUrl;
}
function listKnownUrls() {
    return Object.keys(loadUrls());
}
