# Pinnacle Shield Insurance

Pinnacle Shield Insurance is a modern, responsive insurance website that provides users with information about insurance products and allows them to easily request a quote. The site is designed for clarity, accessibility, and user engagement, with a focus on usability and conversion.

**Live Site:** [https://iltStudent05.github.io/pinnacle-shield-insurance](https://iltStudent05.github.io/pinnacle-shield-insurance)
# Pinnacle Shield Insurance

Pinnacle Shield Insurance is a modern, responsive insurance website built with HTML5, CSS3, Bootstrap 5, and JavaScript. It provides users with information about insurance products and allows them to easily request a quote.




## Features

- Responsive design with Bootstrap 5 and custom media queries
- Semantic HTML5 structure and accessible navigation
- Custom CSS for a modern look, stepper, and insurance type badges
- Smooth scrolling and dynamic active navigation highlighting
- Hero section, "Why Choose Us" cards, and insurance types overview
- Footer with contact info and persistent navigation
- **Dynamic Quote Form:**
  - Insurance type selector (Auto, Home, Life) with icon cards
  - Stepper/progress indicator visually guides users through the quote process
  - Form fields update based on selected insurance type
  - Only visible fields are required and validated
  - Custom JavaScript validation with user-friendly error messages
  - Mock quote calculation based on user input and insurance type
  - Results section with premium summary and factor breakdown
  - Saved quotes section with color-coded, large insurance type badges
  - Modal overlay for detailed saved quote breakdown
  - "Get Another Quote" button to reset the form and results
- **FAQ Page:**
  - Built with Bootstrap Accordion for a modern, accessible Q&A experience
  - At least 8 detailed, realistic FAQ items
  - Search/filter input for instant FAQ filtering (matches only question text)
  - Fully responsive and styled to match the site
- **CI/CD Pipeline:**
  - GitHub Actions workflow for validating HTML, CSS, and JS file presence
  - HTML structure validation (checks for lang attribute and DOCTYPE)
  - Automatic deployment to GitHub Pages on push to main

## Pages

- **Home (index.html):** Main landing page with hero, benefits, insurance types, and navigation
- **Get a Quote (quote.html):** Form for users to request an insurance quote
- **About Us (about.html):** Company information
- **FAQ (faq.html):** Frequently asked questions with accordion and search/filter


## Technologies Used

- HTML5 & Semantic Elements
- CSS3 & Custom Styles (with responsive media queries)
- [Bootstrap 5](https://getbootstrap.com/) (CDN)
- [Bootstrap Icons](https://icons.getbootstrap.com/) (CDN)
- JavaScript (main.js for navigation, js/quote.js for quote logic, inline FAQ search)
- GitHub Actions (CI/CD for validation and deployment)

## Project Structure

```
pinnacle-shield-insurance/
├── about.html
├── faq.html
├── index.html
├── quote.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   └── quote.js
├── .github/
│   └── workflows/
│       └── deploy.yml
```


## How to Use

1. Clone or download this repository.
2. Open `index.html`, `faq.html`, or any page in your web browser.
3. All pages are static and require no backend.
4. For the quote form, select an insurance type, fill out the fields, and click "Get Quote" to see your mock premium and a breakdown of factors.
5. Use the FAQ page to quickly find answers using the search/filter feature.


## Customization

- Update content in the HTML files as needed.
- Modify `css/styles.css` for custom styles and responsive tweaks.
- Add or adjust interactivity in `js/main.js` (navigation, smooth scroll), `js/quote.js` (form logic, validation, quote calculation), or inline scripts (FAQ search).
- Update `.github/workflows/deploy.yml` to adjust CI/CD validation or deployment settings.

## Recent Improvements

- FAQ page: Bootstrap accordion, search/filter (now matches only question text), and detailed answers
- Responsive design: Enhanced with custom media queries for tablet and mobile
- CI/CD: GitHub Actions workflow for validation and deployment to GitHub Pages
- Quote form: Stepper/progress indicator, insurance type selector, and context-sensitive fields
- Saved quotes: Color-coded, large insurance type badges and modal details
- Accessibility: Improved validation and navigation for all form types
- JavaScript: Ensures only visible fields are required, preventing browser validation errors
- Results section: Clear summary and breakdown of quote factors


## Author

Donavan Francis

## Credits

- Bootstrap 5 and Bootstrap Icons via CDN
- Developed for Capstone Project 2026

---
© 2026 Pinnacle Shield Insurance. All rights reserved.