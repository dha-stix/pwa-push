// const vapidPublicKey =
//     'BBFZf6hiTdz5SEsuI8_WZfxRY4UHNWv9tt01cgQyCWF8XKKQ5vc0nN3JdDztVka4VLgkktLZLO18gOR7leGKbzg';

// export default function swDev()
// {
//   if ("serviceWorker" in navigator) {
//     send().catch(err => console.error(err))
//   }

//   async function send() {
//     console.log("Registering service worker!")
//     //Register Service Worker
//     let swUrl=  `${process.env.PUBLIC_URL}/serviceworker.js`
//     const register = await navigator.serviceWorker.register(swUrl, {
//       scope: "/chat"
//     })

//     console.log("Service worker Registered!!")

//     //Register Push Notification
//     const subscription = await register.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: vapidPublicKey,
//     })
//     console.log("Push Registered!", subscription)

//     //Sending Push Notifications
//     await fetch("/notify", {
//       method: "POST",
//       body: JSON.stringify(subscription),
//       headers: { 'Content-Type': 'application/json' }
//     })
//     .then(response => response.json())
//     .then(data => console.log("Delivered"))
//     .catch(err => console.error(err))
//   }
// }


export default function swDev()
{
  function determineAppServerKey() {
    const vapidPublicKey =
    "BBFZf6hiTdz5SEsuI8_WZfxRY4UHNWv9tt01cgQyCWF8XKKQ5vc0nN3JdDztVka4VLgkktLZLO18gOR7leGKbzg";
      return urlBase64ToUint8Array(vapidPublicKey);
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
    let swUrl=  `${process.env.PUBLIC_URL}/serviceworker.js`
    navigator.serviceWorker.register(swUrl).then((response)=>{
        console.warn("response",response)

        return response.pushManager.getSubscription()
        .then(function (subscription) {
           response.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: determineAppServerKey()
          })
          

        })

    }) 
}