const { test, expect } = require('@playwright/test');

test('Verifica se a aba de Novembro foi atualizada corretamente', async ({ page }) => {
  // Navega para a página principal
  await page.goto('http://localhost:3000');

  // Clica na aba de Novembro
  await page.click('button[data-month="10"]');

  // Tira uma captura de tela da seção de eventos de Novembro
  const novemberEvents = await page.$('#events-novembro');
  await novemberEvents.screenshot({ path: 'november_events_verification.png' });
});
