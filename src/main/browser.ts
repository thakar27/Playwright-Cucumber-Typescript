import { isDeepStrictEqual } from 'node:util';
import { Browser, chromium, firefox, webkit, LaunchOptions } from 'playwright';

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

type BrowserConfig = {
  name: BrowserName;
  headless: boolean;
  launchOptions: LaunchOptions;
};

let sharedBrowser: Browser | undefined;
let sharedBrowserConfig: BrowserConfig | undefined;

function getLauncher(name: BrowserName) {
  return name === 'firefox' ? firefox : name === 'webkit' ? webkit : chromium;
}

function needsNewBrowser(
  current: Browser | undefined,
  config: BrowserConfig | undefined,
  desired: BrowserConfig
) {
  if (!current || !current.isConnected() || !config) {
    return true;
  }
  if (config.name !== desired.name || config.headless !== desired.headless) {
    return true;
  }
  return !isDeepStrictEqual(config.launchOptions, desired.launchOptions);
}

export async function getBrowser(
  name: BrowserName = 'chromium',
  headless: boolean = false,
  launchOptions: LaunchOptions = {}
): Promise<Browser> {
  const desiredConfig: BrowserConfig = {
    name,
    headless,
    launchOptions: launchOptions ?? {},
  };

  if (needsNewBrowser(sharedBrowser, sharedBrowserConfig, desiredConfig)) {
    if (sharedBrowser) {
      await sharedBrowser.close().catch(() => undefined);
    }
    const launcher = getLauncher(name);
    sharedBrowser = await launcher.launch({ headless, ...launchOptions });
    sharedBrowserConfig = {
      name,
      headless,
      launchOptions: { ...launchOptions },
    };
  }

  if (!sharedBrowser) {
    throw new Error('Unable to obtain a Playwright browser instance.');
  }

  return sharedBrowser;
}

export async function closeSharedBrowser() {
  if (sharedBrowser) {
    await sharedBrowser.close().catch(() => undefined);
    sharedBrowser = undefined;
    sharedBrowserConfig = undefined;
  }
}
