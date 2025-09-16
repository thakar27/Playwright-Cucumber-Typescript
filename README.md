# Playwright + Cucumber (TypeScript)

Project layout keeps reusable test utilities in `src/main` and all feature files with their step definitions in `src/test`.

## Quick start
```bash
npm install
npx playwright install
npm test
```

## Reports
```bash
npm run test:report        # build, execute tests, generate dashboard report
npm run report:mchr        # regenerate Multiple Cucumber HTML report
```

## Switch browser/headless
```bash
BROWSER=firefox HEADLESS=false npm test
BROWSER=webkit npm test
```

Override browser, headless flag, context options, and launch options per scenario via Cucumber world parameters or environment variables (see `src/main/test-world.ts`).
