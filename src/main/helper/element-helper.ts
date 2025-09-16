import type { Locator, Page } from 'playwright';

export type Target = string | Locator;

export class ElementHelper {
  constructor(private readonly page: Page) {}

  private resolve(target: Target) {
    return typeof target === 'string' ? this.page.locator(target) : target;
  }

  async click(target: Target, options?: Parameters<Locator['click']>[0]) {
    const locator = this.resolve(target);
    await locator.waitFor({ state: 'visible' });
    await locator.click(options);
  }

  async fill(target: Target, value: string, options?: Parameters<Locator['fill']>[1]) {
    const locator = this.resolve(target);
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value, options);
  }

  async type(target: Target, value: string, options?: Parameters<Locator['type']>[1]) {
    const locator = this.resolve(target);
    await locator.waitFor({ state: 'visible' });
    await locator.type(value, options);
  }

  async hover(target: Target, options?: Parameters<Locator['hover']>[0]) {
    const locator = this.resolve(target);
    await locator.waitFor({ state: 'visible' });
    await locator.hover(options);
  }

  async selectOption(
    target: Target,
    values: Parameters<Locator['selectOption']>[0],
    options?: Parameters<Locator['selectOption']>[1]
  ) {
    const locator = this.resolve(target);
    await locator.waitFor({ state: 'visible' });
    await locator.selectOption(values, options);
  }

  async press(target: Target, key: string, options?: Parameters<Locator['press']>[1]) {
    const locator = this.resolve(target);
    await locator.waitFor({ state: 'visible' });
    await locator.press(key, options);
  }
}
