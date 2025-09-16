const { existsSync, readdirSync } = require('node:fs');
const path = require('node:path');
const report = require('multiple-cucumber-html-reporter');

const jsonDir = path.resolve('reports');
if (!existsSync(jsonDir)) {
  throw new Error('No Cucumber results found. Run the test suite before generating reports.');
}

const hasJson = readdirSync(jsonDir).some((file) => file.endsWith('.json'));
if (!hasJson) {
  throw new Error('Expected at least one Cucumber JSON file in the reports directory.');
}

report.generate({
  jsonDir,
  reportPath: 'reports/mchr',
  displayDuration: true,
  metadata: {
    browser: { name: process.env.BROWSER || 'chromium', version: 'Playwright' },
    device: 'Local',
    platform: { name: process.platform, version: process.version }
  },
});
