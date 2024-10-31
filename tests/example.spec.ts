import { test, expect } from '@playwright/test';
import * as allure from "allure-js-commons";
import { logger } from '../framework-setup/logger';

test('has title', async ({ page }) => {

  await page.goto('https://www.ab-in-den-urlaub.de/');
  logger.info("Opened the web site");
  console.log("hello")
 await allure.description("This is a samplet test");
 await allure.owner("invia");
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Urlaub mit bis zu 60% Rabatt sichern ▷ ab in den urlaub!/);
});

