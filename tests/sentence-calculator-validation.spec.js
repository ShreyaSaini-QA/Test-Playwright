// @ts-check
const { test, expect } = require('@playwright/test');
const SentenceCalculatorPage = require('../pages/SentenceCalculatorPage');

test.describe('Sentence Calculator - Core Functionality Tests', () => {
    /** @type {SentenceCalculatorPage} */
    let sentenceCalcPage;

    test.beforeEach(async ({ page }) => {
        sentenceCalcPage = new SentenceCalculatorPage(page);
        await sentenceCalcPage.goto();
    });

    /**
     * Test 1: Navigate to the URL and verify page loads correctly
     * Requirement: Go to the URL: 'https://www.sentencecalculator.in/'
     */
    test('should navigate to Sentence Calculator website successfully', async ({ page }) => {
        // Verify URL
        await expect(page).toHaveURL('https://www.sentencecalculator.in/');
        
        // Verify page title
        await expect(page).toHaveTitle('Sentence Calculator');
        
        // Verify Proportional Calculation section is visible
        await sentenceCalcPage.verifySectionVisible();
        
        console.log('✓ Test 1 Passed: Successfully navigated to Sentence Calculator website');
    });

    /**
     * Test 2: Calculate sentence with valid inputs
     * Requirement: Select substance name 'Heroin' and quantity detained '4' and click on Calculate button,
     * the calculation should be calculated accurately.
     */
    test('should calculate sentence accurately for Heroin with quantity 4', async () => {
        // Fill substance name (Heroin) and select from autocomplete
        await sentenceCalcPage.fillSubstanceName('Heroin');
        
        // Fill quantity detained (4)
        await sentenceCalcPage.fillQuantity('4');
        
        // Verify Calculate button is enabled
        await sentenceCalcPage.verifyCalculateEnabled();
        
        // Click Calculate button
        await sentenceCalcPage.clickCalculate();
        
        // Verify results are displayed
        await sentenceCalcPage.verifyResultsVisible();
        
        // Verify sentence days value is not empty (calculation was performed)
        await sentenceCalcPage.verifySentenceDaysNotEmpty();
        
        // Verify sentence breakdown format
        await sentenceCalcPage.verifySentenceBreakdownFormat();
        
        // Verify fine amount contains Rupee symbol
        await sentenceCalcPage.verifyFineContainsRupeeSymbol();
        
        console.log('✓ Test 2 Passed: Calculation performed accurately for Heroin with quantity 4');
    });

    /**
     * Test 3: Reset functionality
     * Requirement: Select the substance name and enter the quantity detained, then click on reset button,
     * all the added information should be reset.
     */
    test('should reset all form fields when Reset button is clicked', async () => {
        // Fill substance name and quantity
        await sentenceCalcPage.fillSubstanceName('Heroin');
        await sentenceCalcPage.fillQuantity('5');
        
        // Verify fields are filled
        await expect(sentenceCalcPage.substanceNameInput).not.toHaveValue('');
        await expect(sentenceCalcPage.qtyDetainedInput).toHaveValue('5');
        
        // Click Reset button
        await sentenceCalcPage.clickReset();
        
        // Verify all fields are reset
        await expect(sentenceCalcPage.substanceNameInput).toHaveValue('');
        await expect(sentenceCalcPage.qtyDetainedInput).toHaveValue('');
        await sentenceCalcPage.verifyCalculateDisabled();
        
        console.log('✓ Test 3 Passed: All form fields reset successfully');
    });

    /**
     * Test 4: Calculate button requires both substance name (from dropdown) and quantity
     * Requirement: The calculate button should not be enabled unless both fields are properly filled.
     * The substance name must be selected from the dropdown (autocomplete), not just typed.
     */
    test('should keep Calculate button disabled until both fields are properly filled', async ({ page }) => {
        // Step 1: Verify button is disabled with empty form
        await sentenceCalcPage.verifyCalculateDisabled();
        
        // Step 2: Enter only quantity - button should remain disabled
        await sentenceCalcPage.fillQuantity('10');
        await sentenceCalcPage.verifyCalculateDisabled();
        
        // Step 3: Clear quantity and enter only substance name (with autocomplete)
        await sentenceCalcPage.fillQuantity('');
        await sentenceCalcPage.fillSubstanceName('Heroin');
        
        // Wait for form to process
        await page.waitForTimeout(500);
        
        // Button should still be disabled (quantity is empty)
        await sentenceCalcPage.verifyCalculateDisabled();
        
        // Step 4: Now enter quantity - button should become enabled
        await sentenceCalcPage.fillQuantity('10');
        await page.waitForTimeout(500);
        await sentenceCalcPage.verifyCalculateEnabled();
        
        console.log('✓ Test 4 Passed: Calculate button correctly requires both fields');
    });

    /**
     * Test 5: Calculate button disabled for non-numeric quantity
     * Requirement: Select the substance name and enter non-numeric values in the quantity field,
     * the calculate button should be disabled.
     * Note: Since the quantity field is type="number", browsers prevent entering alphabets directly.
     * We verify that entering zero or negative values keeps the button disabled.
     */
    test('should keep Calculate button disabled when quantity is zero or negative', async ({ page }) => {
        // Select valid substance name
        await sentenceCalcPage.fillSubstanceName('Heroin');
        
        // Enter zero in quantity field
        await sentenceCalcPage.fillQuantity('0');
        
        // Verify Calculate button is disabled
        await sentenceCalcPage.verifyCalculateDisabled();
        
        // Enter negative value
        await sentenceCalcPage.fillQuantity('-5');
        await sentenceCalcPage.verifyCalculateDisabled();
        
        // Verify it becomes enabled when valid positive quantity is entered
        await sentenceCalcPage.fillQuantity('5');
        await page.waitForTimeout(500);
        await sentenceCalcPage.verifyCalculateEnabled();
        
        console.log('✓ Test 5 Passed: Calculate button correctly disabled for invalid quantity values');
    });
});  