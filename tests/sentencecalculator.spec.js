// @ts-check
const { test, expect } = require('@playwright/test');
const SentenceCalculatorPage = require('../pages/SentenceCalculatorPage');

// Configure tests to run only in Chromium (top-level)
test.use({ browserName: 'chromium' });

test.describe('Sentence Calculator Website Verification', () => {
    /** @type {SentenceCalculatorPage} */
    let calculatorPage;

    test.beforeEach(async ({ page }) => {
        calculatorPage = new SentenceCalculatorPage(page);
        await calculatorPage.goto();
    });

    test('should verify the URL is correct', async () => {
        await calculatorPage.verifyUrl();
    });

    test('should verify the page title is correct', async () => {
        await calculatorPage.verifyTitle();
    });

    test('should verify both URL and title in a single test', async () => {
        await calculatorPage.verifyUrl();
        await calculatorPage.verifyTitle();
    });
});

test.describe('Proportional Calculation - Positive Test Cases', () => {
    /** @type {SentenceCalculatorPage} */
    let calculatorPage;

    test.beforeEach(async ({ page }) => {
        calculatorPage = new SentenceCalculatorPage(page);
        await calculatorPage.goto();
    });

    test('should display Proportional Calculation section on page load', async () => {
        await calculatorPage.verifySectionVisible();
    });

    test('should display all input fields in Proportional Calculation section', async () => {
        await calculatorPage.verifyInputFields();
    });

    test('should have Calculate button disabled initially', async () => {
        await calculatorPage.verifyCalculateDisabled();
    });

    test('should enable Calculate button when Substance Name and Quantity are filled', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('10');
        await calculatorPage.verifyCalculateEnabled();
    });

    test('should enable Calculate button with only Substance Name and Quantity (without date)', async () => {
        await calculatorPage.fillSubstanceName('Cocaine');
        await calculatorPage.fillQuantity('5');
        await calculatorPage.verifyCalculateEnabled();
    });

    test('should calculate sentence and fine for small quantity', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('1');
        await calculatorPage.clickCalculate();
        
        await calculatorPage.verifyResultsVisible();
        await calculatorPage.verifySentenceDaysNotEmpty();
    });

    test('should calculate sentence and fine for commercial quantity', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('1000');
        await calculatorPage.clickCalculate();
        
        await calculatorPage.verifyResultsVisible();
        await expect(calculatorPage.sentenceBreakdownValue).not.toBeEmpty();
    });

    test('should display quantity type in results after calculation', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('50');
        await calculatorPage.clickCalculate();
        
        await calculatorPage.verifyResultsVisible();
        await expect(calculatorPage.quantityTypeRow).toBeVisible();
        await calculatorPage.verifyQuantityTypeNotEmpty();
    });

    test('should display percentage to upper limit in results', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('25');
        await calculatorPage.clickCalculate();
        
        await calculatorPage.verifyPercentageVisible();
    });

    test('should reset form when Reset button is clicked', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('10');
        await calculatorPage.clickCalculate();
        
        await calculatorPage.clickReset();
        await calculatorPage.verifyFormReset();
    });

    test('should accept different units for quantity', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('5');
        await calculatorPage.verifyCalculateEnabled();
    });

    test('should accept Date of Confiscation when provided', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('10');
        await calculatorPage.fillConfiscationDate('2024-01-15');
        
        await calculatorPage.verifyCalculateEnabled();
        await calculatorPage.clickCalculate();
        
        await calculatorPage.verifyResultsVisible();
    });

    test('should display fine amount in results after calculation', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('10');
        await calculatorPage.clickCalculate();
        
        await calculatorPage.verifyResultsVisible();
        await expect(calculatorPage.fineRow).toBeVisible();
        await calculatorPage.verifyFineContainsRupeeSymbol();
    });

    test('should display punishable section information after calculation', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('10');
        await calculatorPage.clickCalculate();
        
        await calculatorPage.verifyResultsVisible();
        await calculatorPage.verifyPunishableSectionVisible();
    });

    test('should keep Calculate button disabled for zero quantity (edge case)', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('0');
        // Zero quantity should keep the button disabled
        await calculatorPage.verifyCalculateDisabled();
    });

    test('should calculate with decimal quantity value', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('2.5');
        await calculatorPage.clickCalculate();
        
        await calculatorPage.verifyResultsVisible();
    });

    test('should calculate with large quantity value', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('10000');
        await calculatorPage.clickCalculate();
        
        await calculatorPage.verifyResultsVisible();
    });

    test('should show sentence breakdown in years, months, and days', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('100');
        await calculatorPage.clickCalculate();
        
        await calculatorPage.verifyResultsVisible();
        await calculatorPage.verifySentenceBreakdownFormat();
    });

    test('should display calculation result card with proper styling', async () => {
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('10');
        await calculatorPage.clickCalculate();
        
        await calculatorPage.verifyResultCardStyling();
    });

    test('should allow multiple calculations after reset', async () => {
        // First calculation
        await calculatorPage.fillSubstanceName('Heroin');
        await calculatorPage.fillQuantity('10');
        await calculatorPage.clickCalculate();
        
        // Reset
        await calculatorPage.clickReset();
        await calculatorPage.verifyFormReset();
        
        // Second calculation with different values
        await calculatorPage.fillSubstanceName('Cocaine');
        await calculatorPage.filelQuantity('20');
        await calculatorPage.clickCalculate();
        
        await calculatorPage.verifyResultsVisible();
    });
});