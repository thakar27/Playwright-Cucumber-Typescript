"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = getUrl;
exports.listKnownUrls = listKnownUrls;
const urls = {
    google: 'https://www.google.com/'
};
function getUrl(nameOrUrl) {
    const key = nameOrUrl.trim().toLowerCase();
    if (key in urls) {
        return urls[key];
    }
    return nameOrUrl;
}
function listKnownUrls() {
    return Object.keys(urls);
}
