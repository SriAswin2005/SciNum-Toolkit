# Numerical Methods Explorer - Split File Structure

This project has been reorganized to split the original single HTML and CSS files into multiple modular files for better organization and maintainability.

## File Structure

```
numerical-methods-explorer/
├── index.html                 # Main HTML file (with dynamic loading)
├── index-inline.html          # Alternative HTML file (all sections inline)
├── app.js                     # JavaScript functionality (unchanged)
├── css/
│   ├── variables.css          # CSS custom properties and variables
│   ├── base.css               # Base styles and typography
│   ├── components.css         # UI components (buttons, forms, cards)
│   ├── layout.css             # Layout styles and sections
│   └── responsive.css         # Responsive design and media queries
└── sections/
    ├── root-finding.html      # Root finding methods section
    ├── linear-systems.html    # Linear systems section
    ├── eigenvalue.html        # Eigenvalue problems section
    └── convergence.html       # Convergence analysis section
```

## CSS File Organization

### 1. variables.css
- CSS custom properties for colors, typography, spacing, shadows, etc.
- Dark mode color schemes
- Font definitions

### 2. base.css  
- HTML and body base styles
- Typography (headings, paragraphs, links)
- Code and preformatted text styles
- Container and utility classes
- Accessibility styles

### 3. components.css
- Button styles and variations
- Form controls and inputs
- Card components
- Status indicators
- Tables
- Error/success messages
- Loading states

### 4. layout.css
- Navigation styles
- Section layouts
- Dashboard and method layouts
- Matrix input styles
- Results and chart containers
- Method-specific layouts

### 5. responsive.css
- Mobile and tablet responsive styles
- Large screen optimizations
- Print styles
- Accessibility features (reduced motion, high contrast)

## HTML File Organization

### Main Files

#### index.html
- Uses dynamic loading to fetch section content
- Smaller initial file size
- Requires a web server to run due to fetch() API
- Modular and maintainable

#### index-inline.html
- All sections included inline
- Larger file size but works without a server
- Can be opened directly in a browser
- Better for simple deployment

### Section Files

#### sections/root-finding.html
- Fixed Point Iteration
- Newton-Raphson Method
- Bisection Method
- Secant Method

#### sections/linear-systems.html
- Gaussian Elimination
- LU Factorization
- Jacobi Method
- Gauss-Seidel Method

#### sections/eigenvalue.html
- Power Method implementation

#### sections/convergence.html
- Convergence analysis and comparison

## Usage

### Option 1: Dynamic Loading (Recommended)
1. Use `index.html` as the main file
2. Serve the files through a web server (required for fetch() API)
3. All sections will be loaded dynamically

### Option 2: Static Version
1. Use `index-inline.html` as the main file
2. Can be opened directly in a browser
3. All content is included inline

### CSS Loading
Both HTML files load the CSS files in the correct order:
1. variables.css (must be first)
2. base.css
3. components.css
4. layout.css
5. responsive.css (last)

## Benefits of This Structure

1. **Modularity**: Each file has a specific purpose
2. **Maintainability**: Easy to locate and update specific styles or sections
3. **Performance**: CSS files can be cached separately
4. **Scalability**: Easy to add new sections or modify existing ones
5. **Team Development**: Different developers can work on different files
6. **Debugging**: Easier to identify where specific styles are defined

## JavaScript Functionality

The `app.js` file remains unchanged and contains all the numerical methods implementations and chart generation logic.

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- The dynamic loading version requires ES6 fetch() API support
- The inline version works with older browsers

## Deployment

For production deployment:
1. Use the dynamic loading version (`index.html`) for better performance
2. Ensure all CSS and section files are served with proper caching headers
3. Consider CSS and JS minification for production
4. Test that all file paths are correct for your server setup

## Notes

- All functionality remains identical to the original single-file version
- The split maintains the same CSS cascade and specificity
- JavaScript functions work with both HTML versions
- The file structure is designed to be easily extensible
