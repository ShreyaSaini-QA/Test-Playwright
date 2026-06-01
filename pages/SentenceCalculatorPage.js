// @ts-check
const { expect } = require('@playwright/test');

/**
 * Page Object Model for Sentence Calculator - Proportional Calculation Section
 * This class encapsulates the proportional calculation page interactions and locators
 */
class SentenceCalculatorPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // ===== URL and Title =====
        this.url = 'https://www.sentencecalculator.in/';
        this.expectedTitle = 'Sentence Calculator';

        // ===== Proportional Calculation Section Locators =====
        
        // Main section container
        this.proportionalSection = page.locator('app-proportional-calculation');
        
        // Section title
        this.sectionTitle = this.proportionalSection.locator('.mat-mdc-card-title').filter({ hasText: 'PROPORTIONAL CALCULATION' });
        
        // Input fields - Using more stable selectors
        this.substanceNameInput = page.locator('#substanceName');
        this.qtyDetainedInput = page.locator('#qtyDetained');
        // Use aria-label or placeholder instead of dynamic ID for units dropdown
        this.unitsDropdown = page.locator('button[aria-label="Units"]').or(page.locator('.mat-mdc-select-trigger').first());
        // Use label-based selector for date input - more reliable for Angular Material
        // The date input has placeholder "Choose a date" and is in a section with "Date of Confiscation" text
        this.confiscationDateInput = page.locator('input[placeholder="Choose a date"]').or(
            page.getByLabel('Date of Confiscation (optional)')
        ).or(
            page.locator('mat-form-field').filter({ hasText: /confiscation|date/i }).locator('input').first()
        );
        
        // Buttons
        this.calculateButton = this.proportionalSection.locator('button').filter({ hasText: 'Calculate' }).first();
        this.resetButton = this.proportionalSection.locator('button').filter({ hasText: 'Reset' }).first();
        
        // Results section
        this.resultCard = this.proportionalSection.locator('.calculation_result').first();
        
        // Result table rows - Using text-based filtering for more stable selectors
        this.punishableUnderSectionRow = this.resultCard.locator('tbody tr').filter({ hasText: /punishable|section/i }).first();
        this.sentenceDaysRow = this.resultCard.locator('tbody tr').filter({ hasText: /sentence|days/i }).first();
        this.sentenceBreakdownRow = this.resultCard.locator('tbody tr').filter({ hasText: /breakdown|years?|months?/i }).first();
        this.fineRow = this.resultCard.locator('tbody tr').filter({ hasText: /fine|rupees?|₹/i }).first();
        this.quantityTypeRow = this.resultCard.locator('tbody tr').filter({ hasText: /quantity|type/i }).first();
        this.percentageRow = this.resultCard.locator('tbody tr').filter({ hasText: /percentage|upper limit/i }).first();
        
        // Result values
        this.punishableSectionValue = this.punishableUnderSectionRow.locator('td');
        this.sentenceDaysValue = this.sentenceDaysRow.locator('td');
        this.sentenceBreakdownValue = this.sentenceBreakdownRow.locator('td');
        this.fineValue = this.fineRow.locator('td');
        this.quantityTypeValue = this.quantityTypeRow.locator('td');
        this.percentageValue = this.percentageRow.locator('td');
    }

    // ===== Navigation Methods =====

    /**
     * Navigate to the Sentence Calculator page
     */
    async goto() {
        await this.page.goto(this.url);
        await this.page.waitForLoadState('networkidle');
    }

    // ===== Verification Methods =====

    /**
     * Verify the URL is correct
     */
    async verifyUrl() {
        await expect(this.page).toHaveURL(this.url);
    }

    /**
     * Verify the page title is correct
     */
    async verifyTitle() {
        await expect(this.page).toHaveTitle(this.expectedTitle);
    }

    /**
     * Verify Proportional Calculation section is visible
     */
    async verifySectionVisible() {
        await expect(this.proportionalSection).toBeVisible();
        await expect(this.sectionTitle).toBeVisible();
    }

    /**
     * Verify all input fields are visible and editable
     */
    async verifyInputFields() {
        await expect(this.substanceNameInput).toBeVisible();
        await expect(this.substanceNameInput).toBeEditable();
        await expect(this.qtyDetainedInput).toBeVisible();
        await expect(this.qtyDetainedInput).toBeEditable();
        await expect(this.unitsDropdown).toBeVisible();
        await expect(this.confiscationDateInput).toBeVisible();
        await expect(this.confiscationDateInput).toBeEditable();
    }

    /**
     * Verify Calculate button is disabled
     */
    async verifyCalculateDisabled() {
        await expect(this.calculateButton).toBeDisabled();
    }

    /**
     * Verify Calculate button is enabled
     */
    async verifyCalculateEnabled() {
        await expect(this.calculateButton).toBeEnabled();
    }

    // ===== Input Methods =====

    /**
     * Fill substance name and select from autocomplete
     * @param {string} substanceName - The substance name to enter
     */
    async fillSubstanceName(substanceName) {
        await this.substanceNameInput.click();
        await this.substanceNameInput.fill(substanceName);
        // Wait for autocomplete options to appear and select the first one
        const autocompleteOption = this.page.locator('mat-option, .mat-option, [role="option"]').first();
        await autocompleteOption.waitFor({ state: 'visible', timeout: 5000 });
        await autocompleteOption.click();
    }

    /**
     * Fill quantity detained
     * @param {string|number} quantity - The quantity to enter
     */
    async fillQuantity(quantity) {
        await this.qtyDetainedInput.fill(quantity.toString());
    }

    /**
     * Set date of confiscation (optional field)
     * @param {string} date - Date in YYYY-MM-DD format
     */
    async fillConfiscationDate(date) {
        await this.confiscationDateInput.fill(date);
    }

    /**
     * Select unit from dropdown
     * @param {string} unit - The unit to select (e.g., 'Gram', 'Kilogram')
     */
    async selectUnit(unit) {
        await this.unitsDropdown.click();
        await this.page.getByRole('option', { name: unit, exact: true }).first().click();
    }

    // ===== Action Methods =====

    /**
     * Click Calculate button
     */
    async clickCalculate() {
        await this.calculateButton.click();
        // Wait for results to appear instead of fixed timeout
        await this.resultCard.waitFor({ state: 'visible', timeout: 10000 });
    }

    /**
     * Click Reset button
     */
    async clickReset() {
        await this.resetButton.click();
    }

    /**
     * Perform complete calculation with substance name and quantity
     * @param {string} substanceName - The substance name
     * @param {string|number} quantity - The quantity
     * @param {string} [date] - Optional date of confiscation
     */
    async performCalculation(substanceName, quantity, date) {
        await this.fillSubstanceName(substanceName);
        await this.fillQuantity(quantity);
        
        if (date) {
            await this.fillConfiscationDate(date);
        }
        
        await this.clickCalculate();
    }

    // ===== Result Verification Methods =====

    /**
     * Verify results section is visible
     */
    async verifyResultsVisible() {
        await expect(this.resultCard).toBeVisible();
    }

    /**
     * Verify sentence days value is not empty
     */
    async verifySentenceDaysNotEmpty() {
        await expect(this.sentenceDaysValue).not.toBeEmpty();
    }

    /**
     * Verify sentence breakdown contains year(s), month(s), day(s) format
     */
    async verifySentenceBreakdownFormat() {
        await expect(this.sentenceBreakdownValue).toContainText('year(s)');
        await expect(this.sentenceBreakdownValue).toContainText('month(s)');
        await expect(this.sentenceBreakdownValue).toContainText('day(s)');
    }

    /**
     * Verify fine amount contains Rupee symbol
     */
    async verifyFineContainsRupeeSymbol() {
        await expect(this.fineValue).toContainText('₹');
    }

    /**
     * Verify quantity type is not empty/NA
     */
    async verifyQuantityTypeNotEmpty() {
        await expect(this.quantityTypeValue).not.toBeEmpty();
    }

    /**
     * Verify percentage row is visible
     */
    async verifyPercentageVisible() {
        await expect(this.percentageRow).toBeVisible();
    }

    /**
     * Verify punishable section row is visible
     */
    async verifyPunishableSectionVisible() {
        await expect(this.punishableUnderSectionRow).toBeVisible();
    }

    /**
     * Verify result card has proper CSS classes
     */
    async verifyResultCardStyling() {
        await expect(this.resultCard).toHaveClass(/mat-mdc-card/);
        await expect(this.resultCard).toHaveClass(/mdc-card--outlined/);
    }

    /**
     * Verify form is reset (inputs are empty, calculate is disabled)
     */
    async verifyFormReset() {
        await expect(this.substanceNameInput).toHaveValue('');
        await expect(this.qtyDetainedInput).toHaveValue('');
        await expect(this.calculateButton).toBeDisabled();
    }

    /**
     * Get sentence days text
     * @returns {Promise<string>}
     */
    async getSentenceDaysText() {
        return await this.sentenceDaysValue.textContent() || '';
    }

    /**
     * Get fine amount text
     * @returns {Promise<string>}
     */
    async getFineText() {
        return await this.fineValue.textContent() || '';
    }

    /**
     * Get quantity type text
     * @returns {Promise<string>}
     */
    async getQuantityTypeText() {
        return await this.quantityTypeValue.textContent() || '';
    }

    /**
     * Get sentence breakdown text
     * @returns {Promise<string>}
     */
    async getSentenceBreakdownText() {
        return await this.sentenceBreakdownValue.textContent() || '';
    }
}

module.exports = SentenceCalculatorPage;