const { test } = require('@playwright/test');

test('Capture correct calendar view for November 2025', async ({ page }) => {
  await page.goto('http://localhost:8000/index.html');

  // Wait for the iframe to be present
  const iframeElement = await page.waitForSelector('iframe[src*="calendar.google.com"]');
  const frame = await iframeElement.contentFrame();

  // Wait for a specific element inside the iframe to ensure it's loaded
  await frame.waitForSelector('[role="grid"]');

  // Take a screenshot of the calendar area
  await iframeElement.screenshot({ path: 'correct_november_calendar_view.png' });
});