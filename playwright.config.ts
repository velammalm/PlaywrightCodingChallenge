import { defineConfig, devices } from '@playwright/test';
import { WaitForLoadStateOptions } from './framework-setup/optional-parameter-types';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */




export default defineConfig({
  testDir: './specs',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
 // reporter: [['./utils/logger.ts'], ['html', { open: 'never' }], ['dot']],

  reporter: [['./framework-setup/logger.ts'], ['html', { outputFolder: 'my-report' }], ['list'], ['allure-playwright', {outputFolder: 'allure-results'}],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.ab-in-den-urlaub.de/',
    headless: false,
    launchOptions: {
      // 1
      args: ["--start-maximized"],
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

     /* Records traces after each test failure for debugging purposes. */
    trace: 'retain-on-failure',
    screenshot: 'on',
    video: 'on'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
       // ...devices['Desktop Chrome'] ,
      //viewport: { width: 1600, height: 1000 },
      viewport: null,
      },
      
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { 
       // ...devices['Desktop Safari'] 
       browserName: 'webkit',
        viewport: { width: 1600, height: 1000 },
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});