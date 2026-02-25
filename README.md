# ✨Luminary Restaurant Website

A modern, elegant restaurant website featuring a celestial-inspired design with **enterprise-grade** features including full accessibility, performance optimization, comprehensive testing, and SEO best practices.

## 🌟 Features

### ✨Core Features

- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Interactive Menu Carousel**: Browse through different menu categories with smooth transitions
- **Reservation System**: Multi-step booking form with date and time picker modals
- **Mobile Navigation**: Hamburger menu for seamless mobile browsing
- **Video & Image Placeholders**: Ready for multimedia content integration
- **Elegant UI**: Dark theme with gold accent colors for a premium feel

### 🥋 Black Belt Features

<!-- cSpell:disable -->
- **Full Accessibility**: WCAG 2.1 AA compliant with ARIA labels and keyboard navigation
<!-- cSpell:enable -->
- **Smooth Animations**: Professional transitions and hover effects
- **Performance Optimized**: Lazy loading images, optimized assets
- **Comprehensive Testing**: Unit tests and E2E tests with Playwright
- **SEO Optimized**: Meta tags, Open Graph, sitemap, robots.txt
<!-- cSpell:disable -->
- **CMS Ready**: Decap CMS integration for content management
<!-- cSpell:enable -->
- **Netlify Forms**: Reservation form with backend submission handling

## 📄 Pages

- **Home** (`index.html`) - Hero section, story overview, chef philosophy, and menu carousel
- **About** (`about.html`) - Detailed restaurant story and chef philosophy with media sections
- **Menu** (`menu.html`) - Full menu display
- **Events** (`events.html`) - Private events information
- **Book** (`book.html`) - Table reservation system with interactive date/time pickers

## 🛠️ Technologies Used

- HTML5 (Semantic)
- CSS3 (Flexbox, Grid, Custom Properties, Animations)
- Vanilla JavaScript (ES6+)
- CSS Reset (Meyer Web Reset v2.0)
- Playwright (E2E Testing)
- Intersection Observer API (Lazy Loading)
<!-- cSpell:disable -->
- Decap CMS (Content Management)
<!-- cSpell:enable -->
- Netlify (Hosting & Forms)

## 🚀 Getting Started

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/luminary-restaurant.git
cd luminary-restaurant
```

1. Open `index.html` in your browser to view the website

### Testing

1. Install dependencies:

```bash
npm install
```

1. Run tests:

```bash
# Unit tests
node tests.js

# E2E tests (requires local server)
python -m http.server 8000
npm run test:e2e
```

### Deployment

**GitHub Pages** (Static hosting):

- Push to GitHub and enable Pages in repository settings
- Site will be available at `https://yourusername.github.io/repo-name`
- CMS and forms will not function

**Netlify** (Full features):

1. Connect repository to Netlify
2. Enable Netlify Identity for CMS access
3. Enable Git Gateway in Identity settings
<!-- cSpell:disable -->
4. Access CMS at `yoursite.com/admin`
<!-- cSpell:enable -->
5. See `SETUP_GUIDE.md` for detailed instructions

## 📱 Responsive Breakpoints

- **Mobile**: up to 640px
- **Tablet**: 641px to 1024px
- **Desktop**: 1025px to 1440px
- **Large Desktop**: 1441px and above

## 🎨 Color Scheme

- Background: `#000000`
- Text: `#ffffff`
- Accent: `#FFD700` 
- Borders: `#333333`
- Light Grey: `#f4f4f4`
- Dark Grey: `#e0e0e0`

## 📂 Project Structure

<!-- cSpell:disable -->
```text
LuminaryWeb/
 ├── admin/                  # Decap CMS
 │   ├── config.yml          # CMS configuration
 │   └── index.html          # CMS admin interface
 ├── content/                # CMS content (JSON)
 │   ├── menu/               # Menu items
 │   ├── about.json          # About page content
 │   ├── events.json         # Events page content
 │   ├── home.json           # Home page content
 │   └── theme.json          # Site theme settings
 ├── images/                 # Image assets
 ├── videos/                 # Video assets
 ├── index.html              # Homepage
 ├── about.html              # About page
 ├── menu.html               # Menu page
 ├── events.html             # Events page
 ├── book.html               # Booking page
 ├── confirmation.html       # Confirmation page
 ├── styles.css              # Main styles
 ├── animations.css          # Animations & transitions
 ├── skip-link.css           # Accessibility styles
 ├── menu.js                 # Menu functionality
 ├── carousel.js             # Carousel logic
 ├── booking.js              # Booking system
 ├── accessibility.js        # ARIA & keyboard nav
 ├── lazy-load.js            # Performance optimization
 ├── tests.js                # Unit tests
 ├── e2e.test.js             # E2E tests
 ├── package.json            # Dependencies
 ├── netlify.toml            # Netlify configuration
 ├── robots.txt              # SEO
 ├── sitemap.xml             # SEO
 ├── README.md               # This file
 └── SETUP_GUIDE.md          # Netlify & CMS setup
```
<!-- cSpell:enable -->

## ✨ Key Features Breakdown

### Menu Carousel

- 5 slides with navigation arrows
- Pagination dots indicator
- 2x2 grid layout for menu items
- Responsive image display

### Reservation System

- Step-by-step booking process
- Custom date picker with booked dates
- Time slot selection
- Guest count and special requests
- Netlify Forms integration (when deployed to Netlify)

### Content Management

- Decap CMS for non-technical content editing
- Edit site colors and fonts
- Manage menu items (add/edit/delete)
- Update page content and images
- Access at `/admin` (Netlify only)

### Mobile Optimization

- Hamburger menu animation
- Stacked layouts for small screens
- Touch-friendly navigation
- Optimized typography and spacing

## 🎯 Performance & Quality

### Lighthouse Scores (Target)

- ✅ Performance: 90+
- ✅ Accessibility: 100
- ✅ Best Practices: 100
- ✅ SEO: 100

### Accessibility (WCAG 2.1 AA)

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ ARIA labels
- ✅ Focus management
- ✅ Skip to main content

### Testing Coverage

- ✅ Unit tests for all core functions
- ✅ E2E tests for critical user flows
- ✅ Accessibility testing
- ✅ Mobile responsiveness testing

## 📚 Documentation

- **README.md** - Project overview (this file)

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📝 License

This project is open source.

## 👤 Author

Created with precision and celestial inspiration ✨


## ✨ Luminary - Celestial in spirit. Precise in execution.

Now with enterprise-grade features: Accessibility, Performance, Testing, and SEO!
