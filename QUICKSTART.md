# Quick Start Guide

## Get Your Portfolio Running in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

### Step 3: Open in Browser
Navigate to: `http://localhost:4200`

## What You'll See

Your portfolio includes:
- **Navigation Bar** - Smooth scroll links to all sections
- **About Section** - Your introduction with animated profile
- **Skills Section** - Interactive skill bars organized by category
- **Projects Section** - Beautiful project cards with glassmorphism effect
- **Experience Section** - Professional timeline with resume download
- **Footer** - Social links and copyright

## Next Steps: Customize Your Portfolio

### 1. Update Personal Information

**About Component** (`src/app/components/about/about.component.ts`):
- Line 27: Change your name
- Line 28: Update your title
- Lines 29-35: Write your bio
- Lines 37-55: Update statistics

### 2. Update Skills

**Skills Component** (`src/app/components/skills/skills.component.ts`):
- Lines 196-246: Replace with your actual skills and levels

### 3. Update Projects

**Projects Component** (`src/app/components/projects/projects.component.ts`):
- Lines 179-235: Replace with your real projects
- Add your GitHub links and live demo URLs

### 4. Update Experience

**Experience Component** (`src/app/components/experience/experience.component.ts`):
- Lines 338-375: Update with your actual work history

### 5. Replace Resume

- Add your resume PDF to `src/assets/`
- Update the link in the Experience component if you use a different filename

### 6. Update Social Links

**App Component** (`src/app/app.component.ts`):
- Lines 40-42: Update GitHub, LinkedIn, and Email links

## Customize Colors

Edit `src/styles.scss` (lines 10-19) to change the color scheme:
```scss
--primary-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
```

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder - ready to deploy!

## Deploy

Quick deployment options:
- **Vercel**: `npx vercel`
- **Netlify**: Drag `dist/` folder to netlify.com
- **GitHub Pages**: Use `angular-cli-ghpages` package

## Need Help?

Check the main README.md for detailed documentation.

---

Built with Angular 18 & Glassmorphism Design
