// src/lib/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCM_i_wPtOrxfSjWpkmZTpU5WaAZyFC328",
  authDomain: "gratitude journaling",
  projectId: "gratitude-journaling",
  appId: "401338066886"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
