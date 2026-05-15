# Architecture Overview

## Application Structure and File/Folder Organization

The project follows a simple, clear structure suitable for a static website:

```
pinnacle-shield-insurance/
├── about.html           # About Us page
├── faq.html             # FAQ page
├── index.html           # Home page
├── quote.html           # Insurance quote form page
├── README.md            # Project overview and instructions
├── ARCHITECTURE.md      # Architecture and technical documentation
├── css/
│   └── styles.css       # Custom styles and responsive tweaks
├── img/                 # Images and icons used throughout the site
├── js/
│   ├── main.js          # Navigation, smooth scroll, and general JS
│   └── quote.js         # Quote form logic, validation, and calculation
```

## Component or Page Organization and Relationships

- **index.html**: The main landing page. Contains the hero section, benefits, insurance types, and navigation. Links to all other pages.
- **about.html**: Company information and background.
- **faq.html**: Frequently asked questions, implemented with a Bootstrap accordion and search/filter functionality.
- **quote.html**: Interactive quote form with stepper, insurance type selector, dynamic fields, and results section. Handles user input and displays calculated mock quotes.
- **css/styles.css**: Custom styles for layout, responsiveness, and branding. Complements Bootstrap 5.
- **js/main.js**: Handles navigation, smooth scrolling, and dynamic navigation highlighting.
- **js/quote.js**: Manages the quote form logic, including stepper navigation, field validation, quote calculation, and saved quotes.

All pages share a consistent header, navigation, and footer for a unified user experience.

## Data Flow Explanation

- The site is fully static; there is no backend or persistent data storage.
- User input in the quote form (quote.html) is handled client-side by JavaScript (js/quote.js):
  - Form fields update based on the selected insurance type.
  - Only visible fields are required and validated.
  - On submission, a mock quote is calculated and displayed.
  - Saved quotes are managed in-memory (not persisted after page reload).
- FAQ search/filter is handled client-side with JavaScript for instant results.

## Deployment Approach

- The site is deployed using **GitHub Pages** for static hosting.
- CI/CD is managed via a GitHub Actions workflow:
  - Validates the presence and structure of HTML, CSS, and JS files.
  - Checks for correct HTML structure (DOCTYPE, lang attribute).
  - Automatically deploys to GitHub Pages on push to the main branch.

## Key Technical Decisions and Trade-offs

- **Static Site**: Chose a static site approach for simplicity, speed, and ease of deployment. No backend means no persistent user data, but this fits the project requirements.
- **Bootstrap 5**: Used for rapid, responsive layout and accessibility. Custom CSS is layered on top for branding and unique UI elements.
- **JavaScript Only for Interactivity**: All dynamic features (quote form, FAQ search) are implemented with vanilla JS for maximum compatibility and performance.
- **No Frameworks**: Avoided React/Vue/Angular to keep the project lightweight and easy to maintain.
- **In-Memory Data**: Saved quotes are not persisted between sessions, trading off persistence for simplicity.

## Improvements with More Time

- **Extra Features**: Add user authentication and a profile page to allow users to save and manage quotes across sessions.
- **Styling Enhancements**: Further polish the home page and planned profile page for a more visually engaging experience.
- **Accessibility**: Conduct a full accessibility audit and implement ARIA roles and keyboard navigation improvements.
- **Backend Integration**: Add a backend for real quote calculations, persistent saved quotes, and user accounts.
- **Testing**: Add automated UI and unit tests for JavaScript logic.
- **Performance**: Optimize images and assets for even faster load times.
