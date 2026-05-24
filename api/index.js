import server from '../dist/server/server.js';

export const config = {
  runtime: 'nodejs',
};

export default async function (req, res) {
  try {
    // Construct absolute URL from Vercel's relative req.url
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url, `${protocol}://${host}`).toString();

    // Create standard Web Request
    const requestInit = {
      method: req.method,
      headers: req.headers,
    };
    
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      requestInit.body = req;
      requestInit.duplex = 'half';
    }

    const request = new Request(url, requestInit);

    // Call the TanStack Start server fetch handler
    const response = await server.fetch(request);

    // Send the Web Response back via Node res
    res.statusCode = response.status;
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }
    
    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
