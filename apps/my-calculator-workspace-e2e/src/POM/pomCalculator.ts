import { Page } from '@playwright/test';

export class PomCalculator {
  constructor(private page: Page) {}

  private expressionDisplay = '[data-testid="expression"]';
  private resultDisplay = '[data-testid="result"]';
  private buttonSelector = (label: string) => `[data-testid="${label}"]`;

  async enterNumber(number: number | string) {
    //number is -12

    const isNegative = number.toString().startsWith('-');
    if (isNegative) {
      number = number.toString().slice(1);
    }

    const digits = number.toString();
    for (const digit of digits) {
      if (digit === '.') {
        await this.pressDecimal();
      } else {
        await this.page.click(this.buttonSelector(`digit-${digit}`));
      }
    }
    if (isNegative == true) {
      await this.plusMinus();
    }
  }

  async plusMinus() {
    await this.page.click(this.buttonSelector('function-plus-minus'));
  }

  async pressAdd() {
    await this.page.click(this.buttonSelector('operator-+'));
  }

  async pressSubtract() {
    await this.page.click(this.buttonSelector('operator--'));
  }

  async pressMultiply() {
    await this.page.click(this.buttonSelector('operator-×'));
  }

  async pressDivide() {
    await this.page.click(this.buttonSelector('operator-÷'));
  }

  async pressEquals() {
    await this.page.click(this.buttonSelector('operator-='));
  }

  async pressClear() {
    await this.page.click(this.buttonSelector('function-ac'));
  }

  async pressDecimal() {
    await this.page.click(this.buttonSelector('decimal'));
  }

  async getResult() {
    return await this.page.textContent(this.resultDisplay);
  }
}
