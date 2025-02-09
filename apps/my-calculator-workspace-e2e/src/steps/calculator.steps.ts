import { Given, When, Then } from '@cucumber/cucumber';
import { CalculatorWorld } from '../../world';
import { PomCalculator } from '../POM/pomCalculator';
import { expect } from '@playwright/test';

let calculator: PomCalculator;

Given('the calculator is open', async function (this: CalculatorWorld) {
  await this.init();
  calculator = new PomCalculator(this.page);
});

When('I enter {float}', async function (this: CalculatorWorld, number: number) {
  await calculator.enterNumber(number);
});

When('I press add', async function (this: CalculatorWorld) {
  await calculator.pressAdd();
});

When('I press subtract', async function (this: CalculatorWorld) {
  await calculator.pressSubtract();
});

When('I press multiply', async function (this: CalculatorWorld) {
  await calculator.pressMultiply();
});

When('I press divide', async function (this: CalculatorWorld) {
  await calculator.pressDivide();
});

When('I press equals', async function (this: CalculatorWorld) {
  await calculator.pressEquals();
});

When('I press clear', async function (this: CalculatorWorld) {
  await calculator.pressClear();
});

When('I press plus minus', async function (this: CalculatorWorld) {
  await calculator.pressAdd();
});

Then(
  'the result should be {float}',
  async function (this: CalculatorWorld, result: number) {
    expect(await calculator.getResult()).toBe(result.toString());
  }
);
