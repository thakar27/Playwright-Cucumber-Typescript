import type { Page } from 'playwright';
import { ElementHelper } from '../helper/element-helper';

export abstract class BasePage {
  protected readonly elements: ElementHelper;

  constructor(protected readonly page: Page) {
    this.elements = new ElementHelper(page);
  }

  async goto(path: string, options?: Parameters<Page['goto']>[1]) {
    await this.page.goto(path, options);
  }
}
