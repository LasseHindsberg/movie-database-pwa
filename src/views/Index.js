import AppBarNav from "../components/AppBarNav";
import SearchCard from "../components/SearchCard";

import '../styles/card.css'

export default function Index() {
    function displayNotification() {
        if (Notification.permission === 'granted') {
          navigator.serviceWorker.getRegistration().then(function(reg) {
            reg.showNotification('Hello world!', {
              vibrate: [50, 50, 50, 50, 50, 50, 50, 50]
            });
            console.log(reg)
          });
        }
      }
    return (
        <>
            <AppBarNav/>
            <SearchCard />
            <button onClick={()=>displayNotification()}>Notify me</button>
        </>
    )
}