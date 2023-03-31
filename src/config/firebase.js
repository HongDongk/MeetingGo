import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyA7eNDTovxQKYhYID5qlud6bDISFfZcgRI',
  authDomain: 'meetingnom.firebaseapp.com',
  projectId: 'meetingnom',
  storageBucket: 'meetingnom.appspot.com',
  messagingSenderId: '298264722028',
  appId: '1:298264722028:web:f1c672b8d8f23052ceb649',
  measurementId: 'G-YN5QRDWXL9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line import/prefer-default-export
export const analytics = getAnalytics(app);
