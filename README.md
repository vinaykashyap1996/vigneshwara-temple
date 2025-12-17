# 🕉️ Ganesha Temple Website

A modern, responsive website for Ganesha Temple built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Home Page**: Welcome section with temple timings and upcoming festivals
- **About**: Temple history, mission, and services
- **Events**: Detailed festival calendar and weekly schedule
- **Gallery**: Photo gallery for temple events (placeholder ready for your images)
- **Donations**: Multiple donation options and sponsorship opportunities
- **Contact**: Contact information and inquiry form
- **Responsive Design**: Optimized for all devices
- **SEO Optimized**: Proper metadata and structure for search engines

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project folder:

```bash
cd ganesha-temple
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## 📁 Project Structure

```text
ganesha-temple/
├── src/
│   └── app/
│       ├── about/          # About page
│       ├── contact/        # Contact page
│       ├── donations/      # Donations page
│       ├── events/         # Events page
│       ├── gallery/        # Gallery page
│       ├── layout.tsx      # Root layout with metadata
│       ├── page.tsx        # Home page
│       └── globals.css     # Global styles
├── public/                 # Static assets (add your images here)
├── .github/                # GitHub configuration
└── README.md              # This file
```

## 🎨 Customization

### Adding Your Temple Information

1. **Contact Details**: Update contact information in `src/app/contact/page.tsx`
2. **Temple Timings**: Modify timings in `src/app/page.tsx` and `src/app/events/page.tsx`
3. **Bank Details**: Update donation information in `src/app/donations/page.tsx`
4. **Events**: Add your temple's events and festivals in `src/app/events/page.tsx`

### Adding Images

1. Place your temple images in the `public/` folder
2. Reference them in your components using the `/filename.jpg` path
3. Update the gallery page to display your actual photos

### Styling

The website uses Tailwind CSS for styling. Customize colors in `tailwind.config.ts`:

- Primary orange: `orange-600`
- Accent: `orange-900`
- Background: `orange-50`

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📦 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Fonts**: Geist Sans & Geist Mono

## 🚢 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

- **Netlify**: Use the Next.js plugin
- **AWS/GCP/Azure**: Deploy as a Node.js application
- **Docker**: Create a Dockerfile for containerization

## 📝 To-Do / Customization Checklist

- [ ] Replace placeholder content with actual temple information
- [ ] Add real temple photos to the gallery
- [ ] Update contact details (address, phone, email)
- [ ] Configure bank details for donations
- [ ] Add specific festival dates
- [ ] Set up a contact form backend (optional)
- [ ] Add Google Maps integration for location
- [ ] Implement actual payment gateway for donations
- [ ] Add social media links
- [ ] Configure SEO metadata for each page

## 📄 License

This project is created for Ganesha Temple. Customize as needed for your temple's requirements.

## 🙏 Support

For questions or support, please contact the temple administration.

---

Built with ❤️ for spiritual community
