// // // console.warn("This is the public folder!")

// let cacheData = "appV1";
// this.addEventListener("install", (event) => {
//     event.waitUntil(
//         caches.open(cacheData).then((cache) => {
//             cache.addAll([
//                 '/static/js/main.chunk.js',
//                 '/static/js/0.chunk.js',
//                 '/static/js/bundle.js',
//                 '/static/css/main.chunk.css',
//                 '/index.html',
//                 '/',
//                 "/chats"
//             ])
//         })
//     )
// })
// this.addEventListener("fetch", (event) => {


//     // console.warn("url",event.request.url)


//     if (!navigator.onLine) {
//         if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
//             event.waitUntil(
//                 this.registration.showNotification("Internet", {
//                     body: "internet not working",
//                 })
//             )
//         }
//         event.respondWith(
//             caches.match(event.request).then((resp) => {
//                 if (resp) {
//                     return resp
//                 }
//                 let requestUrl = event.request.clone();
//                 fetch(requestUrl)
//             })
//         )
//     }
// }) 

// // console.warn("Service Worker Loaded!")

// // window.self.addEventListener("push", e => {
// //     const data = e.data.json()
// //     console.log("Push Received...", data)

// //     window.self.registration.showNotification({
// //         title: "Notified by David",
// //         options: {
// //             icon: "https://raw.githubusercontent.com/dha-stix/image/main/father-day.jpg"
// //         }
// //     })
// // })

let cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/static/css/main.chunk.css',
                '/index.html',
                '/',
                "/chat"
            ])
        })
    )
})
this.addEventListener("fetch", (event) => {


    // console.warn("url",event.request.url)


    if (!navigator.onLine) {
        if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
            event.waitUntil(
                this.registration.showNotification("Internet", {
                    title: "internet not working",
                })
            )
        }
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
}) 