const { test, expect } = require('@playwright/test');

test('Verifica se as abas de Novembro e Dezembro foram atualizadas corretamente', async ({ page }) => {
  // Navega para a página principal
  await page.goto('http://localhost:3000');

  // Clica na aba de Novembro e tira uma captura de tela
  await page.click('button[data-month="10"]');
  const novemberEvents = await page.$('#events-novembro');
  await novemberEvents.screenshot({ path: 'november_events_verification.png' });

  // Clica na aba de Dezembro e tira uma captura de tela
  await page.click('button[data-month="11"]');
  const decemberEvents = await page.$('#events-dezembro');
  await decemberEvents.screenshot({ path: 'december_events_verification.png' });
});
