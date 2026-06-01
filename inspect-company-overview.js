const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.defactoinfotech.com/company-overview/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  const headers = await page.$$eval('h1, h2, h3, h4, h5', els => els.map(e => ({ tag: e.tagName, text: e.innerText.trim() })));
  const links = await page.$$eval('a', els => els.map(e => ({ text: e.innerText.trim(), href: e.href })).filter(l => l.text).slice(0, 80));
  const buttons = await page.$$eval('button', els => els.map(e => ({ text: e.innerText.trim(), id: e.id, class: e.className })));
  console.log('TITLE:', await page.title());
  console.log('HEADERS:', JSON.stringify(headers.slice(0, 40), null, 2));
  console.log('LINKS:', JSON.stringify(links.slice(0, 40), null, 2));
  console.log('BUTTONS:', JSON.stringify(buttons.slice(0, 40), null, 2));
  await browser.close();
})();