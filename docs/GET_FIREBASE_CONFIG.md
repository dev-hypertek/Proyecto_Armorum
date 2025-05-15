# 🔑 PASOS PARA OBTENER FIREBASE CONFIG

## 1. Ve a Firebase Console:
https://console.firebase.google.com/project/armorum-financiero/overview

## 2. En el lado izquierdo, click en "Project Settings" (ícono de engranaje)

## 3. Scroll down hasta "Your apps" o "Tus aplicaciones"

## 4. Si no hay app web, click "Add app" (+ Web icon)
   - Nombre: "Armorum Frontend" 
   - No habilitar Firebase Hosting (ya está configurado)

## 5. Copiar el objeto firebaseConfig completo:

```javascript
const firebaseConfig = {
  apiKey: "AIzaXxxXxxXxxXxxXxxXxxXxxXxxXxx",
  authDomain: "armorum-financiero.firebaseapp.com",
  projectId: "armorum-financiero",
  storageBucket: "armorum-financiero.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:0123456789abcdef012345"
};
```

## 6. Actualizar .env con estos valores reales:

```bash
VITE_FIREBASE_API_KEY=AIzaXxxXxxXxxXxxXxxXxxXxxXxxXxx
VITE_FIREBASE_AUTH_DOMAIN=armorum-financiero.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=armorum-financiero
VITE_FIREBASE_STORAGE_BUCKET=armorum-financiero.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:0123456789abcdef012345
VITE_API_URL=http://localhost:8080/api
```

¡Después del deploy del backend actualizaremos VITE_API_URL con la URL real!
