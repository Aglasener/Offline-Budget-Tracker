

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/chart.html",
    "/dist/bundle.js"
  ];
  
  
  const CACHE_NAME = "static-cache-v2";
  const DATA_CACHE_NAME = "data-cache-v1";
  
  // install
  self.addEventListener("install", function(evt) {
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log("Your files were pre-cached successfully!");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  
    self.skipWaiting();
  });
  
  // activate
  self.addEventListener("activate", function(evt) {
    evt.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log("Removing old cache data", key);
              return caches.delete(key);
            }
          })
        );
      })
    );
  
    self.clients.claim();
  });
  
  // fetch
  self.addEventListener("fetch", function(evt) {
    if (evt.request.url.includes("/api/")) {
      console.log("[Service Worker] Fetch (data)", evt.request.url);
        console.log("This was request" + JSON.stringify(evt.request))
      evt.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
          return fetch(evt.request)
            .then(response => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                console.log("This was the response!"+ JSON.stringify(response))
                cache.put(evt.request.url, response.clone());
              }
  
              return response;
            })
            .catch(err => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
        })
      );
  
      return;
    }
  
    evt.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(evt.request).then(response => {
          return response || fetch(evt.request);
        });
      })
    );
  
  });
  
  //sync

  self.addEventListener("sync", evt => {
      console.log("now online");
      if (evt.tag === "formData"){
          evt.waitUntil(
            useIndexedDb("expense", "expenseStore", "get")
            // .then(
            //     function(res){console.log(res)})
            )
            // .catch(err => {return err;})
      }
  })

function useIndexedDb (databaseName, storeName, method, object){
    var getObjectStore
    const request = indexedDB.open(databaseName, 1).objectStore(storeName);


request.onupgradeneeded = function(e) {
    var db = request.result;
    

    db.createObjectStore(storeName, { keyPath: "_id" });
  };

  request.onerror = function(e) {
    console.log("There was an error");
  };

  request.onsuccess = function(e) {
   
    var db = request.result;
    var tx = db.transaction(storeName, "readwrite");
    var store = tx.objectStore(storeName);
    db.onerror = function(e) {
      console.log("error");
    };
    if (method === "put") {
      store.put(object);
    }
    if (method === "clear") {
      store.clear();
    }
    if (method === "get") {
      const all = store.getAll();
      all.onsuccess = function() {
        return (all.result);
      };
    }
    tx.oncomplete = function() {
        
      db.close();
    };
  };
}



function loadExpenses() {
    return fetch("/api/expenses")
      .then(function(res) {
          console.log(res);
          res.json();
        })
      .catch(err => reject(err));
}

function saveExpense(data) {
    console.log("This data is being saved: "+JSON.stringify(data))
    return fetch ("/api/submit", {
        method: "POST",
        dataType: "json",
        data: JSON.stringify(data)
    })
      .then (function(results) {
        console.log(results);
      })
}

function resetExpense() {
  return fetch ("/api/reset", {
      method: "DELETE"
  })
}
