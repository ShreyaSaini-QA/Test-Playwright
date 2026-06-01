const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.defactoinfotech.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  const button = page.locator('text=Request we contact you').first();
  console.log('BUTTON_COUNT', await button.count());
  console.log('BUTTON_VISIBLE', await button.isVisible().catch(() => false));
  const triggerInfo = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('a, button, div, span').forEach(el => {
      if (el.innerText && el.innerText.trim().includes('Request we contact you')) {
        results.push({ tag: el.tagName, id: el.id, class: el.className, outerHTML: el.outerHTML.slice(0, 400) });
      }
    });
    return results;
  });
  console.log('TRIGGER_INFO', JSON.stringify(triggerInfo, null, 2));
  const modalTriggers = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('[data-bs-target], [data-target], [data-toggle], [onclick], [aria-controls]').forEach(el => {
      const target = el.getAttribute('data-bs-target') || el.getAttribute('data-target') || el.getAttribute('aria-controls');
      const toggle = el.getAttribute('data-bs-toggle') || el.getAttribute('data-toggle');
      const onclick = el.getAttribute('onclick');
      if (target?.includes('loginPopUpModal') || onclick?.includes('loginPopUpModal') || onclick?.includes('submitFreeDemoForm')) {
        results.push({
          tag: el.tagName,
          id: el.id,
          class: el.className,
          target,
          toggle,
          onclick,
          text: el.innerText.trim().slice(0, 100),
          outerHTML: el.outerHTML.slice(0, 300),
        });
      }
    });
    return results;
  });
  console.log('MODAL_TRIGGERS', JSON.stringify(modalTriggers, null, 2));
  await button.click();
  await page.waitForTimeout(4000);
  const inspect = async selector => {
    const el = await page.$(selector);
    if (!el) return { exists: false };
    const style = await page.evaluate(sel => {
      const e = document.querySelector(sel);
      if (!e) return null;
      const s = window.getComputedStyle(e);
      const ancestors = [];
      let parent = e.parentElement;
      while (parent) {
        const pStyle = window.getComputedStyle(parent);
        ancestors.push({
          tag: parent.tagName,
          id: parent.id,
          class: parent.className,
          display: pStyle.display,
          visibility: pStyle.visibility,
          opacity: pStyle.opacity,
          rect: parent.getBoundingClientRect().toJSON(),
          outerHTML: parent.outerHTML.slice(0, 200),
        });
        parent = parent.parentElement;
      }
      return {
        display: s.display,
        visibility: s.visibility,
        opacity: s.opacity,
        width: s.width,
        height: s.height,
        rect: e.getBoundingClientRect().toJSON(),
        outerHTML: e.outerHTML,
        ancestors,
      };
    }, selector);
    return { exists: true, style };
  };
  const firstName = await inspect('#firstName');
  const lastName = await inspect('#lastName');
  const submit = await inspect('#submitDemo');
  console.log('FIRSTNAME', JSON.stringify(firstName, null, 2));
  console.log('LASTNAME', JSON.stringify(lastName, null, 2));
  console.log('SUBMIT', JSON.stringify(submit, null, 2));
  await page.screenshot({ path: 'form-open.png', fullPage: true });
  await browser.close();
})();
