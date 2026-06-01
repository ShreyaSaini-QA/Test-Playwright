// @ts-check
const { expect } = require('@playwright/test');

/**
 * Page Object Model for Login Page
 * This class encapsulates the login page interactions and locators
 */
class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        
        // Locators - using Playwright's recommended locator strategy
        // Note: example.com doesn't have a real login form, so we'll create a generic structure
        // that can be adapted for any login page
        
        // Username/Email field
        this.usernameInput = page.locator('input[name="username"], input[type="email"], input#email, input#username');
        
        // Password field
        this.passwordInput = page.locator('input[name="password"], input[type="password"], input#password');
        
        // Submit/Login button
        this.loginButton = page.locator('button[type="submit"], input[type="submit"], button:has-text("Login"), button:has-text("Sign In")');
        
        // Error message (if login fails)
        this.errorMessage = page.locator('.error-message, .alert-danger, .validation-error, [role="alert"]');
        
        // Success indicator (if login succeeds)
        this.successMessage = page.locator('.success-message, .alert-success, .welcome-message');
        
        // Remember me checkbox (optional)
        this.rememberMeCheckbox = page.locator('input[type="checkbox"]#remember, input#remember-me');
        
        // Forgot password link (optional)
        this.forgotPasswordLink = page.locator('a:has-text("Forgot Password"), a:has-text("Reset Password")');
    }

    /**
     * Navigate to the login page
     * @param {string} url - The URL to navigate to
     */
    async goto(url = 'https://example.com/login') {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Enter username/email
     * @param {string} username - The username or email to enter
     */
    async enterUsername(username) {
        await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.usernameInput.fill(username);
    }

    /**
     * Enter password
     * @param {string} password - The password to enter
     */
    async enterPassword(password) {
        await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.passwordInput.fill(password);
    }

    /**
     * Click the login button
     */
    async clickLogin() {
        await this.loginButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.loginButton.click();
    }

    /**
     * Complete login process
     * @param {string} username - The username or email
     * @param {string} password - The password
     */
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    /**
     * Check if error message is displayed
     * @returns {Promise<boolean>}
     */
    async isErrorVisible() {
        try {
            await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Get error message text
     * @returns {Promise<string|null>}
     */
    async getErrorMessage() {
        await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
        return await this.errorMessage.textContent();
    }

    /**
     * Check if success message is displayed
     * @returns {Promise<boolean>}
     */
    async isSuccessVisible() {
        try {
            await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Verify login page is loaded
     */
    async verifyLoginPageLoaded() {
        await expect(this.usernameInput).toBeVisible({ timeout: 10000 });
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    /**
     * Check if remember me checkbox is available
     * @returns {Promise<boolean>}
     */
    async isRememberMeAvailable() {
        try {
            await this.rememberMeCheckbox.waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Check remember me checkbox
     */
    async checkRememberMe() {
        if (await this.isRememberMeAvailable()) {
            await this.rememberMeCheckbox.check();
        }
    }

    /**
     * Click forgot password link
     */
    async clickForgotPassword() {
        if (await this.forgotPasswordLink.isVisible()) {
            await this.forgotPasswordLink.click();
        }
    }
}

module.exports = LoginPage;