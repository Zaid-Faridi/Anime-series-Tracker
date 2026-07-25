const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message, error.stack));
  
  try {
    await page.goto('http://localhost:8082', { waitUntil: 'networkidle2' });
  } catch (err) {
    console.error("GOTO ERROR:", err);
  }
  
  await browser.close();
})();
