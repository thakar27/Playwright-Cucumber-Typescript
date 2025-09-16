import { Given, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import type { TestWorld } from '../../main/base/test-world';

Given('I open {string}', async function (this: TestWorld, url: string) {
  await this.page!.goto(url);
});

Then('I should see the title contains {string}', async function (this: TestWorld, part: string) {
  await this.page!.waitForLoadState('domcontentloaded');
  const title = await this.page!.title();
  expect(title).to.include(part);
});
