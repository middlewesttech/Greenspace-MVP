# Strain Tracker

A Next.js application for tracking marijuana strains with authentication and favorites management.

## Features

- **Authentication**: GitHub OAuth integration with NextAuth.js
- **Strain Database**: Browse strains from the Cannlytics API
- **Personal Greenspace**: Save and manage your favorite strains
- **Enhanced Strain Details**: 
  - Preferred consumption type (Flower, Cartridge, Edible, Wax, Oil, Other)
  - Preferred dispensary search using Google Places API
- **Dark Mode**: Toggle between light and dark themes
- **MongoDB Backend**: Persistent storage for user data

## New Features

### Enhanced Strain Management
When adding or editing strains in your Greenspace, you can now specify:

1. **Preferred Consumption Type**: Choose from Flower, Cartridge, Edible, Wax, Oil, or Other
2. **Preferred Dispensary**: Search for dispensaries using Google Places API integration

### Google Places Integration
The app uses Google Places API to search for dispensaries and cannabis-related businesses. Results include:
- Business name
- Address
- Rating (if available)

## Environment Variables

Create a `.env.local` file with the following variables:

```env
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_PLACES_API_KEY=your_google_places_api_key
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env.local`

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Routes

- `/api/auth/[...nextauth]` - NextAuth.js authentication
- `/api/favorites` - CRUD operations for user favorites
- `/api/places` - Google Places API integration for dispensary search
