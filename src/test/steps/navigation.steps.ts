import { Given, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import type { TestWorld } from '../../main/base/test-world';
import { NavigationPage } from '../../main/page_object/navigation-page';
import { getUrl } from '../../main/helper/url-config';

function getNavigation(world: TestWorld) {
  if (!world.page) {
    throw new Error('Page is not initialised on the world instance.');
  }
  return new NavigationPage(world.page);
}

Given('I open {string}', async function (this: TestWorld, urlKey: string) {
  const navigation = getNavigation(this);
  const url = getUrl(urlKey);
  await navigation.open(url);
});

Then('I should see the title contains {string}', async function (this: TestWorld, part: string) {
  const navigation = getNavigation(this);
  await navigation.waitForDomContentLoaded();
  const title = await navigation.getTitle();
  expect(title).to.include(part);
});
