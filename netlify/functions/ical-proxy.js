exports.handler = async function(event) {
  const url = event.queryStringParameters?.url;
  if (!url) return { statusCode: 400, body: 'Missing url parameter' };
 
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SheetShed/1.0)',
        'Accept': 'text/calendar,*/*',
      },
    });
    if (!response.ok) return { statusCode: response.status, body: 'Upstream error: ' + response.status };
    const text = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/calendar',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
      body: text,
    };
  } catch(e) {
    return { statusCode: 500, body: 'Fetch error: ' + e.message };
  }
};
 
