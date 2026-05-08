module.exports = async function handler(req, res) {
  try {
    const rawUrl = req.query.url;

    if (!rawUrl || typeof rawUrl !== 'string') {
      res.status(400).send('Missing url');
      return;
    }

    let target;
    try {
      target = new URL(rawUrl);
    } catch (_) {
      res.status(400).send('Invalid url');
      return;
    }

    // Security: only allow the Livetiming domain this app needs.
    if (target.protocol !== 'https:' || target.hostname !== 'ltmobil.medley.no') {
      res.status(403).send('Blocked host');
      return;
    }

    const upstream = await fetch(target.toString(), {
      method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 VerdalOpenViewer/1.0',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });

    const body = await upstream.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=300');
    res.status(upstream.status).send(body);
  } catch (err) {
    res.status(500).send('Proxy error: ' + (err && err.message ? err.message : String(err)));
  }
};
