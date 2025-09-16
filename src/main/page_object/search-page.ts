import { BasePage } from './base-page';

export class SearchPage extends BasePage {
  private readonly searchBox = 'textarea[name="q"]';
  private readonly results = '#search';

  async search(query: string) {
    await this.elements.fill(this.searchBox, query);
    await this.elements.press(this.searchBox, 'Enter');
  }

  async resultsVisible() {
    await this.page.waitForLoadState('networkidle');
    return this.page.locator(this.results).isVisible();
  }
}
