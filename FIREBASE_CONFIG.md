# 🔑 OBTENER FIREBASE CONFIG

## 1. Ve a Firebase Console
https://console.firebase.google.com/project/armorum-financiero

## 2. Project Settings (engranaje) > Your apps

## 3. Select web app o "Add app" si no existe

## 4. Copiar config object:
```javascript
const firebaseConfig = {
  apiKey: "AIza...", // Tu API key real
  authDomain: "armorum-financiero.firebaseapp.com",
  projectId: "armorum-financiero", 
  storageBucket: "armorum-financiero.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## 5. Actualizar .env con valores reales
```bash
VITE_FIREBASE_API_KEY=AIza... (tu API key real)
VITE_FIREBASE_AUTH_DOMAIN=armorum-financiero.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=armorum-financiero
VITE_FIREBASE_STORAGE_BUCKET=armorum-financiero.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789 (tu número real)
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef (tu app ID real)
```
