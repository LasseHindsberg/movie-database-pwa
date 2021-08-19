
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/sw.js")
      .then(function(registration) {
        console.log("Service Worker registered");
      }, function(err) {
        console.log("Service Worker could not be registered. Pl0x fix.", err);
      });
  });
}
