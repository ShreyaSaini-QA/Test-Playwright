const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.defactoinfotech.com/', { waitUntil: 'domcontentloaded' });
  const inputs = await page.$$eval('input, textarea, button', els =>
    els.map(e => ({
      tag: e.tagName,
      id: e.id,
      name: e.name,
      type: e.type,
      class: e.className,
      text: e.innerText,
    })).slice(0, 100)
  );
  console.log('INPUTS', JSON.stringify(inputs, null, 2));
  const submit = await page.$('button, input[type=submit]');
  if (submit) console.log('SUBMIT', await submit.evaluate(e => ({ tag: e.tagName, id: e.id, name: e.name, type: e.type, class: e.className, text: e.innerText })));
  const success = await page.$('text="Thank you for contacting us! We will get back to you shortly."');
  console.log('SUCCESS_PRESENT', !!success);
  await browser.close();
})();
