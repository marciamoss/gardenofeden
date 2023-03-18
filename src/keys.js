exports.mongo = {
  api: process.env.REACT_APP_BASE_URL,
};

exports.maps = {
  apiKey: process.env.REACT_APP_MAPS_API_KEY,
};

exports.homePage = {
  url: process.env.REACT_APP_HOME_PAGE,
};

exports.firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_Key,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
