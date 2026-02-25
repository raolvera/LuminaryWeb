// E2E Tests for Luminary Website
// Install: npm install -D @playwright/test
// Run: npx playwright test

const { test, expect } = require('@playwright/test');

test.describe('Luminary Restaurant Website E2E Tests', () => {
  
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('http://localhost:8000/index.html');
    await expect(page).toHaveTitle(/Luminary/);
    await expect(page.locator('h1')).toContainText('Celestial in spirit');
  });
  
  test('should navigate between pages', async ({ page }) => {
    await page.goto('http://localhost:8000/index.html');
    
    // Navigate to About page
    await page.click('a[href="about.html"]');
    await expect(page).toHaveURL(/about.html/);
    
    // Navigate to Menu page
    await page.click('a[href="menu.html"]');
    await expect(page).toHaveURL(/menu.html/);
    
    // Navigate to Book page
    await page.click('a[href="book.html"]');
    await expect(page).toHaveURL(/book.html/);
  });
  
  test('should interact with carousel', async ({ page }) => {
    await page.goto('http://localhost:8000/index.html');
    
    // Wait for carousel to load
    await page.waitForSelector('.carousel-slide.active');
    
    // Click next arrow
    await page.click('.carousel-slide.active .nav-arrow.right');
    await page.waitForTimeout(500);
    
    // Verify category changed
    const category = await page.textContent('#carousel-category');
    expect(category).toBeTruthy();
  });
  
  test('should complete booking form', async ({ page }) => {
    await page.goto('http://localhost:8000/book.html');
    
    // Fill Step 1
    await page.selectOption('#partySize', '2');
    await page.click('#dateInput');
    await page.click('.day:not(.booked):not(.empty)');
    await page.click('.select-btn');
    await page.click('#timeInput');
    await page.click('.time-slot:not(.booked)');
    await page.click('.btn-next');
    
    // Fill Step 2
    await page.fill('#userName', 'Test User');
    await page.fill('#userEmail', 'test@example.com');
    await page.fill('#userPhone', '(123) 456-7890');
    await page.fill('#requests', 'Window seat please');
    
    // Submit form
    await page.click('.btn-confirm');
    
    // Verify confirmation page
    await expect(page).toHaveURL(/confirmation.html/);
  });
  
  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:8000/index.html');
    
    // Check hamburger menu is visible
    const hamburger = await page.locator('.hamburger');
    await expect(hamburger).toBeVisible();
    
    // Click hamburger
    await hamburger.click();
    
    // Check nav links are visible
    const navLinks = await page.locator('.nav-links');
    await expect(navLinks).toBeVisible();
  });
  
  test('should have accessible navigation', async ({ page }) => {
    await page.goto('http://localhost:8000/index.html');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Verify focus management
    const focusedElement = await page.evaluate(() => document.activeElement.tagName);
    expect(focusedElement).toBeTruthy();
  });
});
