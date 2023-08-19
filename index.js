import edge from 'edge.js'
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'

edge.mount(new URL('./views', import.meta.url))

createServer(async (req, res) => {
  if (req.url === '/app.js') {
    res.setHeader('content-type', 'application/javascript')
    return createReadStream(new URL('./public/app.js', import.meta.url)).pipe(res)
  }

  if (req.url === '/style.css') {
    res.setHeader('content-type', 'text/css')
    return createReadStream(new URL('./public/style.css', import.meta.url)).pipe(res)
  }

  const html = await edge.render('index')
  res.setHeader('content-type', 'text/html')
  res.end(html)
}).listen(3000, () => {
  console.log('Running on http://localhost:3000')
})
