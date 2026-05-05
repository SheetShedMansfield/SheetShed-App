exports.handler = async function(event) {
  const url = event.queryStringParameters?.url;
  if (!url) return { statusCode: 400, body: 'Missing url' };
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SheetShed/1.0)',
        'Accept': 'text/calendar, */*',
      },
    });
    const text = await res.text();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/calendar', 'Access-Control-Allow-Origin': '*' },
      body: text,
    };
  } catch(e) {
    return { statusCode: 500, body: e.message };
  }
};
