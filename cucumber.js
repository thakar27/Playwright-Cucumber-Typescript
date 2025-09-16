// cucumber.js (precompiled JS; no ts-node)
function parseJsonEnv(name) {
  const raw = process.env[name];
  if (!raw) {
    return undefined;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid JSON for ${name}: ${reason}`);
  }
}

const contextOptions = parseJsonEnv('PLAYWRIGHT_CONTEXT_OPTIONS');
const launchOptions = parseJsonEnv('PLAYWRIGHT_LAUNCH_OPTIONS');

module.exports = {
  default: {
    paths: ['src/test/features/**/*.feature'],
    require: [
      'dist/test/steps/**/*.js',
      'dist/main/**/*.js'
    ],
    worldParameters: {
      browser: process.env.BROWSER || 'chromium',
      headless: process.env.HEADLESS ? process.env.HEADLESS !== 'false' : false,
      contextOptions,
      launchOptions
    },
    format: [
      'json:reports/cucumber.json'
    ]
  }
};
