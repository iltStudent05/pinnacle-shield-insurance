## Design Rationale & Layout Philosophy

The layout and structure of Pinnacle Shield Insurance are intentionally crafted for clarity, accessibility, and user engagement:

- **User-Centered Navigation:** The navbar is always visible and collapses on mobile, ensuring users can easily find key pages (Home, Get a Quote, About Us, FAQ) from any device.
- **Hero Section:** Immediately communicates the brand’s value proposition with a strong headline, tagline, and a prominent call-to-action button, guiding users toward requesting a quote.
- **Why Choose Us:** Uses visually engaging cards to quickly highlight the company’s main benefits, building trust and credibility at a glance.
- **Insurance Types:** Presents core offerings (Auto, Home, Life) in a simple, scannable format, helping users understand available products without overwhelming detail.
- **Consistent Footer:** Provides persistent access to contact information and reinforces brand identity.
- **Responsive & Accessible:** Built with Bootstrap 5 and semantic HTML, the site adapts to all screen sizes and is accessible to assistive technologies.
- **Performance & Simplicity:** The site is fully static, loads quickly, and is easy to maintain or extend for future needs.

This approach ensures a modern, professional appearance while prioritizing usability and conversion for insurance customers.
# Pinnacle Shield Insurance

Pinnacle Shield Insurance is a modern, responsive insurance website built with HTML5, CSS3, Bootstrap 5, and JavaScript. It provides users with information about insurance products and allows them to easily request a quote.


## Features

- Responsive Bootstrap 5 layout for all devices
- Semantic HTML5 structure
- Custom CSS enhancements for a modern look
- Smooth scrolling for in-page navigation
- Dynamic active navigation highlighting
- Accessible navigation bar with hamburger menu on mobile
- Hero section with call-to-action
- "Why Choose Us" section with benefit cards
- Insurance types section (Auto, Home, Life)
- Footer with contact info
- **Dynamic Quote Form:**
	- Insurance type selector (Auto, Home, Life) with icon cards
	- Form fields update based on selected insurance type
	- Only visible fields are required and validated
	- Custom JavaScript validation with user-friendly error messages
	- Mock quote calculation based on user input and insurance type
	- Results section with premium summary and factor breakdown
	- "Get Another Quote" button to reset the form and results

## Pages

- **Home (index.html):** Main landing page with hero, benefits, insurance types, and navigation
- **Get a Quote (quote.html):** Form for users to request an insurance quote
- **About Us (about.html):** Company information
- **FAQ (faq.html):** Frequently asked questions


## Tech Stack

- HTML5 & Semantic Elements
- CSS3 & Custom Styles
- [Bootstrap 5](https://getbootstrap.com/) (CDN)
- [Bootstrap Icons](https://icons.getbootstrap.com/) (CDN)
- JavaScript (main.js for navigation, js/quote.js for quote logic)

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
```


## How to Use

1. Clone or download this repository.
2. Open `index.html` or `quote.html` in your web browser.
3. All pages are static and require no backend.
4. For the quote form, select an insurance type, fill out the fields, and click "Get Quote" to see your mock premium and a breakdown of factors.


## Customization

- Update content in the HTML files as needed.
- Modify `css/styles.css` for custom styles.
- Add or adjust interactivity in `js/main.js` (navigation, smooth scroll) or `js/quote.js` (form logic, validation, quote calculation).

## Recent Improvements

- Added dynamic quote form with insurance type selector and context-sensitive fields
- Improved accessibility and validation for all form types
- JavaScript now ensures only visible fields are required, preventing browser validation errors
- Results section provides a clear summary and breakdown of quote factors

## Credits

- Bootstrap 5 and Bootstrap Icons via CDN
- Developed for Capstone Project 2026

---
© 2026 Pinnacle Shield Insurance. All rights reserved.