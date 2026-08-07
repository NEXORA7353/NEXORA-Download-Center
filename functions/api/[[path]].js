export async function onRequest(context) {
  const { request } = context;
  
  // Railway ka actual URL yahan dalo (jo Railway dashboard me dikhe)
  const RAILWAY_URL = 'https://nexora7.up.railway.app';
  
  const url = new URL(request.url);
  const targetUrl = RAILWAY_URL + url.pathname + url.search;
  
  // Request Railway pe forward karo
  const modifiedRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' 
      ? request.body 
      : undefined
  });
  
  try {
    const response = await fetch(modifiedRequest);
    
    // Response wapas bhejo with CORS headers
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(response.headers),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
    
    return newResponse;
  } catch (err) {
    return new Response(JSON.stringify({ 
      error: 'Backend unavailable', 
      message: err.message 
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
