import { When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import type { TestWorld } from '../../main/base/test-world';
import { SearchPage } from '../../main/page_object/search-page';

function getSearch(world: TestWorld) {
  if (!world.page) {
    throw new Error('Page is not initialised on the world instance.');
  }
  return new SearchPage(world.page);
}

When('I search for {string}', async function (this: TestWorld, term: string) {
  const search = getSearch(this);
  await search.search(term);
});

Then('I should see search results', async function (this: TestWorld) {
  const search = getSearch(this);
  expect(await search.resultsVisible()).to.be.true;
});
