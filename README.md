# Zubair Alam - Modern Portfolio

A stunning modern portfolio website built with Angular and featuring a beautiful glassmorphism design.

## Features

- **Glassmorphism UI Design** - Modern frosted glass effect with blur and transparency
- **Fully Responsive** - Works perfectly on all devices (mobile, tablet, desktop)
- **Smooth Animations** - Beautiful transitions and scroll animations
- **4 Main Sections:**
  - About Me - Personal introduction with highlights
  - Skills & Technologies - Interactive skill bars with categories
  - Projects - Showcase of featured projects with links
  - Experience - Professional timeline with resume download

## Tech Stack

- **Angular 18** - Latest version of Angular framework
- **TypeScript** - Type-safe JavaScript
- **SCSS** - Advanced styling with variables and mixins
- **Standalone Components** - Modern Angular architecture
- **Google Fonts** - Poppins & Space Grotesk fonts

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200`

The application will automatically reload when you make changes to the source files.

## Build for Production

To build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Customization

### Update Your Information

1. **About Section** (`src/app/components/about/about.component.ts`):
   - Update name, title, and description
   - Modify statistics (years of experience, projects, etc.)

2. **Skills Section** (`src/app/components/skills/skills.component.ts`):
   - Update the skill arrays with your technologies
   - Adjust skill levels (0-100)

3. **Projects Section** (`src/app/components/projects/projects.component.ts`):
   - Replace sample projects with your actual projects
   - Add GitHub links and live demo URLs
   - Update technologies used

4. **Experience Section** (`src/app/components/experience/experience.component.ts`):
   - Update work experience timeline
   - Replace with your actual job history
   - Update resume PDF in `src/assets/`

### Update Colors

Edit the CSS variables in `src/styles.scss`:
```scss
:root {
  --primary-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  // ... more variables
}
```

### Add Your Resume

Replace the PDF file at `src/assets/Md_Zubair_Alam(5yrs).pdf` with your own resume and update the filename in the Experience component if needed.

### Update Social Links

Edit the footer links in `src/app/app.component.ts`:
```typescript
<a href="https://github.com/yourusername" target="_blank">GitHub</a>
<a href="https://linkedin.com/in/yourprofile" target="_blank">LinkedIn</a>
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── about/          # About section
│   │   ├── skills/         # Skills section
│   │   ├── projects/       # Projects section
│   │   └── experience/     # Experience section
│   └── app.component.ts    # Main app component
├── assets/                 # Static assets (images, PDFs)
├── styles.scss            # Global styles
└── index.html             # Main HTML file
```

## Deployment

This portfolio can be deployed to:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use `angular-cli-ghpages`
- **Firebase**: `firebase deploy`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Feel free to use this template for your own portfolio!

## Contact

Zubair Alam - [Your Email]

---

Built with Angular & Glassmorphism
