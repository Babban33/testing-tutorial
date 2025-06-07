# Jest Testing Setup for Next.js Project

This guide outlines the steps to set up Jest for testing a Next.js project that includes a form. The instructions are based on the official Next.js documentation and are tailored for a project using TypeScript and a form component. Follow these steps to configure Jest and related testing libraries.

**Reference**: [Next.js Testing Guide - Jest](https://nextjs.org/docs/app/guides/testing/jest)

## Prerequisites

- A Next.js project set up with TypeScript.
- Node.js and a package manager (`npm`, `yarn`, or `pnpm`) installed.
- Basic familiarity with testing concepts and Jest.

## Setup Steps

### Step 1: Install Jest and Testing Dependencies

Install Jest and related testing libraries as development dependencies to enable testing in your Next.js project. These libraries include Jest, JSDOM for DOM testing, React Testing Library for component testing, and TypeScript support.

Run one of the following commands based on your package manager:

```bash
# Using npm
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest

# Using yarn
yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest

# Using pnpm
pnpm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest
```

**Purpose:** This installs:
- `jest`: The core testing framework.
- `jest-environment-jsdom`: Simulates a browser environment for DOM testing.
- `@testing-library/react and @testing-library/dom`: Utilities for testing React components and DOM elements.
- `@testing-library/jest-dom`: Custom Jest matchers for DOM assertions.
ts-node
- `@types/jest`: TypeScript support for Jest.

### Step 2: Initialize Jest Configuration

Generate a Jest configuration file using the Jest CLI to set up the testing environment.

Run one of the following commands:
```bash
# Using npm
npm init jest@latest

# Using yarn
yarn create jest@latest

# Using pnpm
pnpm create jest@latest
```

### Step 3: Answer Jest Configuration Prompts
During the initialization, you’ll be prompted with several questions. The recommended answers for this setup are:

- Would you like to use Jest when running "test" script in "package.json"?: Select `yes` to add a test script to package.json.
- Would you like to use TypeScript for the configuration file?: Select `yes` to generate a jest.config.ts file for TypeScript support.
- Choose the test environment that will be used for testing: Select `jsdom` ( for React component testing).
- Do you want Jest to add coverage reports?: Select yes to enable code coverage reports.
- Which provider should be used to instrument code for coverage?: Select `v8` for the coverage provider.
- Automatically clear mock calls, instances, contexts, and results before every test?: Select `yes` to reset mocks between tests for consistency.

### Step 4: Update Jest Configuration
Replace the generated `jest.config.ts` with the following configuration to integrate Jest with Next.js and set up the JSDOM environment:

```typescript

import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
```

**Purpose**: This configuration uses `next/jest` to load Next.js configurations (e.g., `next.config.js` and `.env` files).

### Step 5: Enable Jest Setup File
Uncomment and activate the setupFilesAfterEnv option in `jest.config.ts` to include a setup file for Jest:
```typescript
setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
```

### Step 6: Create Jest Setup File
Create a file named `jest.setup.ts` in the root of your project and add the following import:
```bash
import '@testing-library/jest-dom'
```

### Step 7: Update TypeScript Configuration
Modify the `tsconfig.json` file to update the paths configuration for module resolution. Replace:
```json
"paths": {
  "@/*": ["./*"]
}
```
With:
```
"baseUrl": "./",
"paths": {
  "@/components/*": ["components/*"]
}
```
### Step 8: Add Module Name Mapper to Jest
Update `jest.config.ts` by adding a `moduleNameMapper` to the config object to align Jest’s module resolution with the `tsconfig.json` paths:
```typescript
moduleNameMapper: {
  '^@/components/(.*)$': '<rootDir>/components/$1',
}
```

### Step 9: Update Store Import
Since the `@` alias is now specific to the `components/` directory, update the import for the Zustand store in `app/personal-details/page.tsx`. Change:
```typescript
import { useDevoteeStore } from '@store/devotee-store'
```
to
```typescript
import { useDevoteeStore } from 'store/devotee-store'
```

Verification
After completing all steps, commit your changes with the exact commit message:
```bash
git add .
git commit -m "setup jest"
git push origin master
```
