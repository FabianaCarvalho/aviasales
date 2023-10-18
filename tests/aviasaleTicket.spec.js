const { test, expect } = require('@playwright/test');

test('Test for ticket search @ticketSearch', async ({ page }) => {
  const { chromium } = require('playwright');

  await page.goto('https://www.aviasales.com/');
  await expect(page).toHaveURL('https://www.aviasales.com/?params=SAO1')
  await page.screenshot({ path: 'screenshots/screenshot1.png' });
  await page.locator('[data-test-id="switch"] span').first().click();
  await page.locator('[data-test-id="origin-autocomplete-field"]').click();
  await page.locator('[data-test-id="origin-autocomplete-field"]').fill('ne');
  await page.getByText('John F. Ken').click();
  await page.locator('[data-test-id="destination-autocomplete-field"]').fill('Berlin');
  await page.locator('[data-test-id="departure-date-field"]').click();
  await page.getByLabel('Mon Oct 30 2023').getByText('30').click();
  await page.locator('[data-test-id="no-return-ticket"]').click();
  await page.locator('[data-test-id="passengers-field"]').click();
  await page.locator('[data-test-id="passengers-adults-field"] a').nth(1).click();
  await page.getByText('2 passengers').click();
  await page.screenshot({ path: 'screenshots/screenshot2.png' });

  const pagePromise = page.context().waitForEvent('page');
  await page.locator('[data-test-id="form-submit"]').click();

  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  console.log(await newPage.title());
  const url = 'https://www.aviasales.com/search/JFK3010BER2?expected_price_currency=usd&expected_price_source=calendar&expected_price_value=198&origin_airports=0&request_source=search_form&origin_airports=0'

  //Note: blue screen was displayed, and when trying to identify the cause, it is not available with { visibility: Hidden }

  await expect(page).toHaveTitle('Prices for nearby dates')
  expect('[placeholder="From"]').toContain('John F. Kennedy')
  expect('#destination').toContain('Berlin')
  expect('[placeholder="Depart"]').toContain('Mon, October 30')
  expect('[data-test-id="passengers-field"]').toContain('2 passengers')

});





