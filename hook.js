const http = require('http')
const createHandler = require('github-webhook-handler')

const handler = createHandler({path: '/', secret: config.secret})

http.createServer((req, res) => {
	handler(req, res, (err) => {
		res.statusCode = 404
		res.end('no such location')
	})
}).listen(8080)

handler.on('error', err => {
	console.error('Error', err.message)
})
handler.on('push', event => {
  console.log(event)
	console.log(`Push event for ${event.payload.repository.name} to ${event.payload.ref}`)

})