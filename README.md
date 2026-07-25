# Anime Series Tracker 🎌

A beautifully designed, feature-rich Anime tracking application built with React Native and Expo. Discover new anime, manage your watchlist, and keep track of your progress with an elegant, premium user interface.

## ✨ Features

- **Premium UI/UX:** A stunning, glassmorphism-inspired design with smooth animations and edge-to-edge layouts.
- **Dynamic Theme:** Built-in Light and Dark modes with a global toggle that instantly updates the entire app's aesthetic.
- **Anime Discovery:** Explore anime by Trending, Popular This Season, Upcoming Next Season, Top Rated, and personalized Genre Recommendations (Action, Romance, etc.).
- **Smart Watchlist:** Add anime to your watchlist, track your episodes watched, and update your status (Watching, Completed, Plan to Watch, etc.).
- **Offline Support:** Your Watchlists and Favorites are fully cached on your device for instant, offline access.
- **Smart Push Notifications:** Never miss an episode! Get notified 15 minutes before an episode of your "Watching" anime drops.
- **YouTube Trailers:** Watch official trailers embedded directly in the app inside a custom edge-to-edge modal.
- **Characters & Voice Actors:** Explore the main cast and their Japanese Voice Actors (Seiyuu) for any anime.
- **Global Community Feed:** Rate anime out of 10 and write reviews that sync in real-time to a global community feed!
- **Continue Watching:** A dedicated section on the Home screen to easily pick up where you left off and increment episodes with a single tap.
- **Favorites:** Save your favorite anime to a dedicated list for quick access.
- **Search:** Quickly search the massive AniList database for any anime.
- **Secure Authentication:** User accounts and data synchronization powered by Firebase Authentication.
- **Cloud Sync:** Your watchlist, favorites, and reviews are securely backed up in real-time using Firebase Firestore.

## 🛠️ Tech Stack

### Frontend (Mobile App)
- **Framework:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
- **Language:** TypeScript & JavaScript
- **Navigation:** React Navigation (Bottom Tabs & Native Stack)
- **Styling:** Custom dynamic ThemeContext engine using React Native StyleSheet (no external heavy UI libraries).
- **Icons:** Expo Vector Icons (`Ionicons`)

### Backend & Data
- **Anime Database API:** [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/)
- **Data Fetching:** [React Query (TanStack Query)](https://tanstack.com/query/latest) & `graphql-request`
- **Authentication:** Firebase Auth (Email/Password)
- **Database:** Firebase Cloud Firestore (NoSQL) for user Watchlists and Favorites
- **Storage:** Firebase Cloud Storage (User Avatars)

## 🏗️ Architecture

The project follows a modular, feature-based directory structure for maximum scalability and maintainability:

```text
src/
├── components/       # Reusable UI components (e.g., AnimeCard)
├── config/           # Configuration files (Firebase init)
├── context/          # Global State (AuthContext, ThemeContext)
├── hooks/            # Custom React hooks (useWatchlist, useFavorites)
├── navigation/       # React Navigation setup (AppNavigator)
├── screens/          # Screen components grouped by flow
│   ├── Auth/         # Login, Signup, Forgot Password
│   ├── Detail/       # AnimeDetailScreen
│   ├── Main/         # Home, Search, Watchlist, Profile, Favorites
│   └── Onboarding/   # App intro sliders
├── services/         # External API and Backend services
│   ├── api/          # AniList GraphQL queries and React Query hooks
│   └── firebase/     # Firestore CRUD operations and Storage uploads
└── theme/            # Theme definitions (Light/Dark color palettes)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo CLI
- Expo Go app on your physical device (iOS/Android) or an Emulator/Simulator

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Zaid-Faridi/Anime-series-Tracker.git
   cd Anime-series-Tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com/).
   - Enable Authentication (Email/Password), Firestore, and Storage.
   - Replace the `firebaseConfig` in `src/config/firebase.js` with your own credentials.

4. **Start the Expo server:**
   ```bash
   npx expo start -c
   ```

5. **Run the app:**
   - Scan the QR code with the Expo Go app on your phone.
   - Or press `i` to open in iOS Simulator, `a` to open in Android Emulator.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License
This project is open-source and available under the MIT License.
