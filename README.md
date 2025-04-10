
### 🎬 Movie App Native

A sleek cross-platform mobile app for browsing, saving, and managing your favorite movies. Built using **React Native** and powered by **Appwrite** for backend services and secure authentication.

---

## 🚀 Features

- 🔐 User authentication with Appwrite
- 🎥 Browse trending movies via API
- 💾 Save favorites to your Appwrite database
- 🧠 Built-in search popularity algorithm
- 🌙 Dark mode UI
- ⚡ Smooth and responsive design

---

## 🧠 Built-In Popularity Algorithm

This app includes a custom algorithm that **tracks how many times a movie has been searched** and uses that data to:

- 📈 Sort movies by real user interest
- 🔥 Dynamically adjust trending and search results
- � Deliver smart suggestions based on actual behavior

---

## 📱 Screenshots

_Coming soon_

---

## 🛠️ Tech Stack

- **Frontend:** React Native (Expo)
- **Backend:** Appwrite (Auth, DB, Storage)
- **API:** TMDb or similar movie API
- **State Management:** Context API or Redux
- **UI:** React Native + custom styling

---

## ⚙️ Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/sukibk/movie-app-native.git
cd movie-app-native
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_MOVIE_BEARER_TOKEN=your_token
EXPO_PUBLIC_MOVIE_API_KEY=your_api_key
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_db_id
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
EXPO_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID=your_favorites_id
```

> ⚠️ Don't forget to add `.env` to your `.gitignore`.

### 4. Run the App
```bash
npx expo start
```

---

## 📦 Dependencies

- `expo`
- `react-native`
- `@appwrite/sdk`
- `dotenv`
- `axios`
- `react-navigation`
- `@react-native-async-storage/async-storage`

---

## 💡 Future Improvements

- 🔎 Full-text search with autocomplete
- 📂 Genre filtering and advanced sorting
- 🔔 Push notifications for new releases
- 🧠 AI-based recommendation engine (beta)

---

## 🙌 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)

---

## 👨‍💻 Developed By

[Marko Sudar](https://github.com/sukibk)
[Luca Accomando]
```
