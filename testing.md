# Testing Guide for Luminary Restaurant Website

## Overview
This project includes comprehensive testing coverage with unit tests and end-to-end (E2E) tests.

## Setup

### Install Dependencies
```bash
npm install
```

### Install Playwright for E2E Tests
```bash
npx playwright install
```

## Running Tests

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
# Start local server first
npm run serve

# In another terminal, run E2E tests
npm run test:e2e
```

## Test Coverage

### Unit Tests (tests.js)
- ✅ Date validation (past/future dates)
- ✅ Time format conversion (24h to 12h)
- ✅ Form validation (email, phone, required fields)
- ✅ Carousel navigation logic
- ✅ Category updates

### E2E Tests (e2e.test.js)
- ✅ Homepage loading
- ✅ Navigation between pages
- ✅ Carousel interaction
- ✅ Complete booking flow
- ✅ Mobile responsiveness
- ✅ Keyboard accessibility

## Accessibility Features Implemented

### ARIA Labels
- Navigation landmarks
- Button labels
- Live regions for dynamic content
- Modal dialogs

### Keyboard Navigation
- Tab navigation through all interactive elements
- Arrow keys for carousel navigation
- Enter/Space for button activation
- Escape to close modals

### Screen Reader Support
- Skip to main content link
- Form error announcements
- Dynamic content updates
- Semantic HTML structure

## Performance Optimizations

### Lazy Loading
- Images load only when visible in viewport
- Reduces initial page load time
- Improves performance scores

### Animations
- Smooth transitions for better UX
- Hardware-accelerated transforms
- Optimized CSS animations

### SEO Enhancements
- Meta descriptions and keywords
- Open Graph tags for social sharing
- Canonical URLs
- Sitemap.xml
- Robots.txt
- Semantic HTML structure

## Best Practices Implemented

1. **Accessibility (WCAG 2.1 AA)**
   - Keyboard navigation
   - Screen reader support
   - Focus management
   - Color contrast

2. **Performance**
   - Lazy loading images
   - Minified assets (ready for production)
   - Optimized animations
   - Efficient JavaScript

3. **SEO**
   - Meta tags
   - Structured data
   - Sitemap
   - Mobile-friendly

4. **Testing**
   - Unit tests for logic
   - E2E tests for user flows
   - Accessibility testing

## Continuous Integration (Optional)

Add to `.github/workflows/test.yml`:
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
      - run: npx playwright install
      - run: npm run test:e2e
```

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Lighthouse Scores Target
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100
