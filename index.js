export default {
  async fetch(request) {
    // 1. SET YOUR PASSWORD
    const MY_SECRET_KEY = "kazi-2026"; // Change this to whatever you want
    
    // 2. CHECK THE PASSWORD
    const userKey = request.headers.get("X-Proxy-Key");
    if (userKey !== MY_SECRET_KEY) {
      return new Response("Unauthorized: Please set X-Proxy-Key header", { status: 401 });
    }

    // 3. WHERE ARE WE GOING?
    const url = new URL(request.url);
    // For now, let's point it to Google US
    const targetUrl = "https://www.google.com" + url.pathname + url.search;

    // 4. CLEAN THE HEADERS (Privacy Mode)
    const newHeaders = new Headers(request.headers);
    newHeaders.delete("cf-connecting-ip");
    newHeaders.delete("x-real-ip");
    newHeaders.delete("x-forwarded-for");

    // 5. GO!
    return fetch(new Request(targetUrl, {
      method: request.method,
      headers: newHeaders,
    }));
  }
};
