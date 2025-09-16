import { BasePage } from './base-page';

export class NavigationPage extends BasePage {
  async open(url: string) {
    await this.goto(url);
  }

  async waitForDomContentLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getTitle() {
    return this.page.title();
  }
}
