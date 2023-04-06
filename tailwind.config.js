/** @type {import('tailwindcss').Config} */
// tailwind.config.js

module.exports = {
  content: [
    "./App.js",
    "./components/screens/CategoryInfo.js",
    "./components/screens/HomeScreen.js",
    "./components/screens/CategoryNotes.js",
    "./components/screens/SingleNoteView.js",
    "./components/screens/ChooseCategory.js",
    "./components/screens/CreateNote.js",
    "./components/screens/LogInScreen.js",
    "./components/screens/SplashScreen.js",
    "./components/screens/LogIn.js",
    "./components/screens/RegisterScreen.js",
  ],
  theme: {
    colors: {
      white: "#fff",
      red: {
        500: "#ef4444",
      },
      blue: {
        babyBlue: "#BDE0FE",
        button: "#0077B6",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        950: "#082f49",
        1100: "#001d3d",
      },
      sky: {
        900: "#0c4a6e",
      },
    },
    extend: {},
  },
  plugins: [],
};