import CacheHelper from"./cacheHelper.js";class DicodingRestaurantAPI{constructor(){this.BASE_URL="https://restaurant-api.dicoding.dev",this.imageURL="https://restaurant-api.dicoding.dev/images/medium"}async initializeAppShell(){const t=["/","/styles/main.css","/scripts/main.js","/public/manifest.json"];try{await CacheHelper.cachingAppShell(t),console.log("App shell cached successfully!")}catch(t){console.error("Failed to cache app shell:",t)}}async getRestaurantList(){try{const t=await caches.open("restaurant-api-cache"),a=await t.match(`${this.BASE_URL}/list`);if(a)return a.json();const e=await fetch(`${this.BASE_URL}/list`);return await t.put(`${this.BASE_URL}/list`,e.clone()),e.json()}catch(t){throw console.error("Failed to fetch restaurant list:",t),t}}async getRestaurantDetail(t){const a=`restaurant-api-cache-${t}`,e=await caches.open(a),n=await e.match(`${this.BASE_URL}/detail/${t}`);if(n)return await n.json();try{const a=await fetch(`${this.BASE_URL}/detail/${t}`);return await e.put(`${this.BASE_URL}/detail/${t}`,a.clone()),await a.json()}catch(t){throw console.error("Error fetching restaurant detail:",t),t}}async searchRestaurantByName(t){const a=await caches.open("restaurant-api-cache"),e=await a.match(`${this.BASE_URL}/search?nama=${encodeURIComponent(t)}`);if(e)return await e.json();const n=await fetch(`${this.BASE_URL}/search?nama=${encodeURIComponent(t)}`);return await a.put(`${this.BASE_URL}/search?nama=${encodeURIComponent(t)}`,n.clone()),await n.json()}async searchRestaurantByCategory(t){const a=await caches.open("restaurant-api-cache"),e=await a.match(`${this.BASE_URL}/search?kategori=${encodeURIComponent(t)}`);if(e)return await e.json();const n=await fetch(`${this.BASE_URL}/search?kategori=${encodeURIComponent(t)}`);return await a.put(`${this.BASE_URL}/search?kategori=${encodeURIComponent(t)}`,n.clone()),await n.json()}async searchRestaurantByMenu(t){const a=await caches.open("restaurant-api-cache"),e=await a.match(`${this.BASE_URL}/search?menu=${encodeURIComponent(t)}`);if(e)return await e.json();const n=await fetch(`${this.BASE_URL}/search?menu=${encodeURIComponent(t)}`);return await a.put(`${this.BASE_URL}/search?menu=${encodeURIComponent(t)}`,n.clone()),await n.json()}async postReview(t,a,e){const n=await fetch(`${this.BASE_URL}/review`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t,name:a,review:e})});return await n.json()}async getRestaurantImage(t){const a=await caches.open("restaurant-image-cache"),e=await a.match(`${this.imageURL}/${t}`);if(console.log(`${this.imageURL}/${t}`),e){const t=await e.blob();return URL.createObjectURL(t)}const n=await fetch(`${this.imageURL}/${t}`);await a.put(`${this.imageURL}/${t}`,n.clone());const c=await n.blob();return URL.createObjectURL(c)}}export default DicodingRestaurantAPI;