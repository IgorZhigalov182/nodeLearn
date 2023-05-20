const server = http.createServer(async (request, response) => {
  if (request.method === 'GET') {
    const content = await fs.readFile(path.join(basePath, 'index.html'));
    // response.setHeader('Content-Type', 'text/html');
    response.writeHead(200, {
      'Content-Type': 'text/html',
    });
    response.end(content);
  } else if (request.method === 'POST') {
    const body = [];

    response.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
    });

    request.on('data', (data) => {
      body.push(Buffer.from(data));
    });

    request.on('end', () => {
      const title = body.toString().split('=')[1].replaceAll('+', ' ');
      addNote(title);

      response.end(`Title = ${title}`);
    });
  }
});
