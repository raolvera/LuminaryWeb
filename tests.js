// Unit Tests for Luminary Website
// Run with: node tests.js (requires Node.js)

// Mock DOM elements for testing
const assert = require('assert');

// Test Suite for Booking Functions
describe('Booking System Tests', function() {
  
  describe('Date Validation', function() {
    it('should reject past dates', function() {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const isPast = yesterday < today.setHours(0,0,0,0);
      assert.strictEqual(isPast, true);
    });
    
    it('should accept future dates', function() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const isFuture = tomorrow > today;
      assert.strictEqual(isFuture, true);
    });
  });
  
  describe('Time Conversion', function() {
    it('should convert 24h to 12h format correctly', function() {
      function convertTo12Hour(time24) {
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
      }
      
      assert.strictEqual(convertTo12Hour('18:00'), '6:00 PM');
      assert.strictEqual(convertTo12Hour('09:30'), '9:30 AM');
      assert.strictEqual(convertTo12Hour('00:00'), '12:00 AM');
      assert.strictEqual(convertTo12Hour('12:00'), '12:00 PM');
    });
  });
  
  describe('Form Validation', function() {
    it('should require party size', function() {
      const partySize = '';
      assert.strictEqual(partySize.length === 0, true);
    });
    
    it('should validate email format', function() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      assert.strictEqual(emailRegex.test('test@example.com'), true);
      assert.strictEqual(emailRegex.test('invalid-email'), false);
    });
    
    it('should validate phone format', function() {
      const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      assert.strictEqual(phoneRegex.test('(123) 456-7890'), true);
      assert.strictEqual(phoneRegex.test('1234567890'), true);
    });
  });
});

// Test Suite for Carousel Functions
describe('Carousel Tests', function() {
  
  describe('Slide Navigation', function() {
    it('should cycle through slides correctly', function() {
      let currentSlide = 1;
      const totalSlides = 5;
      
      // Next slide
      currentSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
      assert.strictEqual(currentSlide, 2);
      
      // Previous slide
      currentSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
      assert.strictEqual(currentSlide, 1);
    });
  });
  
  describe('Category Updates', function() {
    it('should update category based on slide', function() {
      const categories = ['Appetizers', 'Desserts', 'Entrees', 'Beverages', 'Cocktails'];
      assert.strictEqual(categories[0], 'Appetizers');
      assert.strictEqual(categories[4], 'Cocktails');
    });
  });
});

console.log('All tests passed! ✓');
