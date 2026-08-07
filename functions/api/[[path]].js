export async function onRequest(context) {
  const { request } = context;
  
  const RAILWAY = 'https://nexora-production-2e62.up.railway.app';
  
  // OPTIONS preflight handle karo
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  const url = new URL(request.url);
  const targetUrl = RAILWAY + url.pathname + url.search;

  try {
    const res = await fetch(targetUrl, {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body
    });

    const data = await res.text();

    return new Response(data, {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      error: 'Backend unavailable',
      message: err.message
    }), {
      status: 503,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
