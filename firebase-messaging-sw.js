// Canelo Wind — service worker de los avisos push (Firebase Cloud Messaging).
// Recibe los avisos cuando el móvil tiene la app cerrada o en segundo plano.

importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
importScripts('config.js');

firebase.initializeApp(CONFIG.push.firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const n = payload.notification || {};
  const url = (payload.fcmOptions && payload.fcmOptions.link) || 'https://canelowind.com/';
  self.registration.showNotification(n.title || 'Canelo Wind', {
    body: n.body || '',
    icon: 'icono-512.png',
    badge: 'icono-512.png',
    data: { url: url },
  });
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || 'https://canelowind.com/';
  event.waitUntil(clients.openWindow(url));
});
