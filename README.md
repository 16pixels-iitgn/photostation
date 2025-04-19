# 16 Pixels PhotoStation

A beautiful, responsive photo gallery built with Next.js that displays photos with photographer information and is deployed on GitHub Pages.


## Features

- **Responsive photo gallery** - Optimized for all screen sizes
- **Hover details** - View photographer information by hovering over photos
- **Full-screen preview** - Click on any photo to open a full-screen preview
- **Keyboard navigation** - Use arrow keys to navigate between photos in preview mode
- **Pagination** - Browse through large collections of photos with ease
- **Dynamic content** - Automatically updates when new photos are added
- **Search functionality** - Find photos by photographer or description
- **Automatic deployment** - Deployed to GitHub Pages via GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/16pixels-iitgn/photostation.git
   cd photostation
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding Photos

1. Add your photos to the `public/photos` directory
2. Update the `public/photos/metadata.csv` file with the photo information

The metadata.csv file should have the following format:
```
id,filename,photographer,title,description
1,photo1.jpg,John Doe,Sunset at the Beach,A beautiful sunset captured at the beach,date
```

The gallery will automatically update when you refresh the page in development mode.  Upon push to github, the GitHub Actions workflow will build the site and deploy it to GitHub Pages.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The GitHub Actions workflow handles the build and deployment process.

To manually deploy:

```bash
npm run build
# or
yarn build
```

## Project Structure

```
├── public/
│   ├── photos/           # Photo files
│   │   └── metadata.csv  # Photo metadata
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── Header.tsx    # Site header
│   │   ├── PhotoCard.tsx # Individual photo card
│   │   ├── PhotoGrid.tsx # Grid of photos
│   │   └── PhotoModal.tsx # Full-screen preview modal
│   └── utils/            # Utility functions
│       └── photos.ts     # Photo loading and processing
├── .github/workflows/    # GitHub Actions workflows
│   └── deploy.yml        # Deployment workflow
├── next.config.js        # Next.js configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## Usage Instructions

### Viewing Photos
- **Browse**: Scroll through the gallery to view all photos
- **Hover**: Hover over a photo to see photographer information
- **Click**: Click on a photo to open it in full-screen preview mode
- **Navigate**: Use the arrow buttons or keyboard arrow keys to navigate between photos in preview mode
- **Close**: Click the X button, press Escape, or click outside the photo to close the preview

### Searching
- Use the search bar to find photos by photographer name, title, or description

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



Curated by [Chandrabhan Patel](https://in.linkedin.com/in/cpatel321), Secretary 2024-25, 16 Pixels, IIT Gandhinagar