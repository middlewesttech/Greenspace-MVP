# 🌿 GreenSpace - Cannabis Strain Tracker

A full-stack Next.js application for tracking and managing your favorite cannabis strains with a beautiful, modern UI.

## ✨ Features

- **🔐 Authentication**: GitHub OAuth integration with NextAuth.js
- **🌱 Strain Management**: Add, edit, and delete your favorite strains
- **🔍 Strain Search**: Search through thousands of strains from the Cannlytics API
- **📍 Dispensary Integration**: Google Places API integration for finding dispensaries
- **🎨 Modern UI**: Beautiful green-themed interface with responsive design
- **🌙 Dark Mode**: Toggle between light and dark themes
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with NextAuth adapter
- **Authentication**: NextAuth.js with GitHub OAuth
- **APIs**: Cannlytics API (strains), Google Places API (dispensaries)
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- GitHub OAuth app
- Google Places API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/greenspace.git
   cd greenspace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   GITHUB_ID=your_github_oauth_app_id
   GITHUB_SECRET=your_github_oauth_app_secret
   GOOGLE_PLACES_API_KEY=your_google_places_api_key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
strain-tracker-next/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── greenspace/      # My Greenspace page
│   │   ├── settings/        # Account settings page
│   │   ├── layout.tsx       # Root layout with navigation
│   │   └── page.tsx         # Homepage
│   ├── components/          # React components
│   │   ├── StrainForm.tsx   # Add new strain form
│   │   ├── EditStrainForm.tsx # Edit strain form
│   │   └── Providers.tsx    # Context providers
│   ├── lib/                 # Utility functions
│   │   └── mongodb.ts       # MongoDB connection
│   └── pages/api/           # API routes
│       ├── auth/            # NextAuth configuration
│       ├── favorites.ts     # Favorites CRUD operations
│       └── places.ts        # Google Places API
├── public/                  # Static assets
│   ├── greenspacelogo.png   # App logo
│   └── favicon.ico          # Favicon
└── package.json
```

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `GITHUB_ID`
- `GITHUB_SECRET`
- `GOOGLE_PLACES_API_KEY`
- `NEXTAUTH_URL` (your production URL)

## 🎨 Features in Detail

### Strain Management
- Search through thousands of strains
- View detailed strain information with images
- Add personal notes and preferences
- Set preferred consumption type (Flower, Cartridge, Edible, etc.)

### Dispensary Integration
- Search for dispensaries using Google Places API
- Auto-complete suggestions after 3 characters
- Store preferred dispensary with each strain

### User Experience
- Clean, modern green-themed design
- Responsive layout for all devices
- Smooth animations and transitions
- Intuitive navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Cannlytics API](https://cannlytics.com/) for strain data
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service) for dispensary search
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**Built with ❤️ and 🌿 by the GreenSpace team**
