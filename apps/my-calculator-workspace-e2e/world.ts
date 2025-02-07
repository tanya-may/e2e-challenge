import { setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';

export class CalculatorWorld extends World {
  browser: Browser;
  page: Page;

  constructor(options) {
    super(options);
  }

  private isInitialized = false;
  async init() {
    if (this.isInitialized) return;

    this.browser = await chromium.launch();
    this.page = await this.browser.newPage();
    await this.page.goto('http://localhost:4200/');
    this.isInitialized = true;
  }

  async close() {
    await this.page.close();
    await this.browser.close();
  }
}

setWorldConstructor(CalculatorWorld);
