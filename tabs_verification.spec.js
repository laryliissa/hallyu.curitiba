const { test, expect } = require('@playwright/test');

test('Event tabs should switch content correctly', async ({ page }) => {
  // 1. Navigate to the index page
  await page.goto('http://localhost:8000/index.html');

  // The test runs on a date in November, so the script should select the November tab by default.

  // 2. Locate the tab buttons and panels
  const setembroButton = page.locator('.tab-button[data-month="8"]');
  const novembroButton = page.locator('.tab-button[data-month="10"]');

  const setembroPanel = page.locator('.tab-panel[data-month="8"]');
  const novembroPanel = page.locator('.tab-panel[data-month="10"]');

  // 3. By default, Novembro should be visible and Setembro should be hidden.
  await expect(novembroPanel).toBeVisible();
  await expect(setembroPanel).toBeHidden();
  await expect(novembroButton).toHaveClass(/bg-vermelho-paixao/);
  await expect(setembroButton).not.toHaveClass(/bg-vermelho-paixao/);

  // 4. Click the 'Setembro' tab button
  await setembroButton.click();

  // 5. Verify that the Setembro panel is now visible and Novembro is hidden
  await expect(novembroPanel).toBeHidden();
  await expect(setembroPanel).toBeVisible();

  // 6. Verify the button styles have updated
  await expect(novembroButton).not.toHaveClass(/bg-vermelho-paixao/);
  await expect(setembroButton).toHaveClass(/bg-vermelho-paixao/);

  // 7. Take a screenshot to visually confirm the result
  await page.screenshot({ path: 'tabs_verification.png' });
});
