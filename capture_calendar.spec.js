const { test } = require('@playwright/test');

test('Capture full page for manual calendar view', async ({ page }) => {
  await page.goto('http://localhost:8000/index.html');

  // Give the iframe a generous amount of time to load its content
  await page.waitForTimeout(10000); // 10 seconds

  // Take a screenshot of the full page. I will manually inspect this
  // to find the November events in the embedded calendar.
  await page.screenshot({ path: 'november_calendar_view.png', fullPage: true });
});