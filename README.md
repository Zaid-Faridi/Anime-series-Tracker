# Anime & TV Series Tracker 📺

A modern, high-performance mobile application for tracking anime and TV shows, built with Expo and React Native. This app provides a seamless experience for managing your watchlist, discovering trending shows, and engaging with the community.

## 🚀 Key Features

### 📺 Watchlist Management
- **Menu Categories**: Organize your shows under custom categories: *All*, *Watching*, *Completed*, *On Hold*, *Dropped*, and *Plan to Watch*.
- **Sync Progress**: Log watched episodes and track remaining episodes for every show in your list.
- **Offline Mode**: Access your watchlist and notes even without an internet connection.

### 🔍 Discovery & Intelligence
- **Jikan API Integration**: Real-time access to the Jikan API for the latest anime and manga data.
- **Trending & Top Rated**: Stay updated with horizontal scrolling sections for what's popular and highest-rated.
- **Instant Search**: Powerful search functionality to find any show within seconds.
- **AI Recommendations**: Logic-based recommendations based on your viewing history (Coming soon!).

### 👥 Community & Engagement
- **Discussion Clubs**: Create or join clubs, invite members, and participate in anime-specific forums.
- **Spoiler Protection**: Unique "tap-to-reveal" spoiler protection for all reviews and comments.
- **Polls & Ratings**: Vote on characters, episodes, and storylines within your community.

### 📊 User Experience
- **Analytics Dashboard**: Visual charts and graphs displaying your viewing history and total time spent.
- **Reminders**: Local push notifications for upcoming episodes and scheduled viewing.
- **Dark/Light Mode**: Full theme customization to suit your preference and environment.

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **Data Fetching** | [Axios](https://axios-http.com/) |
| **API** | [Jikan API](https://jikan.moe/) |
| **Icons** | [Lucide React Native](https://lucide.dev/) |

## 📸 Demo

![Anime Tracker Demo](/Users/zaidfaridi/.gemini/antigravity/brain/6c16ab31-7e52-463c-ad79-41d5d1f30ac7/anime_tracker_launch_1770537269347.webp)

## 🏁 Getting Started

### Prerequisites

- **Node.js**: v18 or later (LTS recommended)
- **npm**: v9 or later
- **Expo Go**: To test on physical devices (available on App Store / Play Store)

### Installation

1. **Clone the project**:
   ```bash
   git clone https://github.com/yourusername/anime-tracker.git
   cd anime-tracker
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Start the Expo server**:
   ```bash
   npm run start
   ```

### 📱 Launch Options

- **Open Web Version**: Press `w` in the terminal after starting.
- **Open iOS Simulator**: Press `i` (Requires macOS and Xcode).
- **Open Android Emulator**: Press `a` (Requires Android Studio).
- **Scan QR Code**: Use the Expo Go app to scan the code in your terminal to view on a real phone.

## 📁 Project Structure

```text
src/
├── components/     # Reusable UI elements (Cards, Buttons, Modals)
├── screens/        # Main application screens (Home, Watchlist, Profile)
├── navigation/     # Navigation configuration (Root Stack, Tab Navigator)
├── services/       # API integration and external data services
├── store/          # Zustand store for global state management
├── styles/         # Theme constants and global styling tokens
└── utils/          # Helper functions and formatting utilities
```

## 🗺️ Future Roadmap

- [ ] **AI Recommendation Engine**: Advanced ML/logic integration for tailored suggestions.
- [ ] **Streaming Platform Links**: Direct integration with CR, Netflix, etc.
- [ ] **Shared Watchlists**: Ability to share and follow friends' viewing progress.
- [ ] **Season Reminders**: More granular notification controls for specific air times.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Created with ❤️ for the Anime & TV Series Community.*

