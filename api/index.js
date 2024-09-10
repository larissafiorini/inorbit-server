import Fastify from 'fastify'
import { createGoal } from '../functions/create-goal'

const app = Fastify({
  logger: true,
})

app.get('/', async (req, reply) => {
  return reply.status(200).type('text/html').send(html)
})

app.post('/goals', async (req) => {
  const body = req.body
  await createGoal({
    title: body.title,
    desiredWeeklyFrequency: body.desiredWeeklyFrequency,
  })
})

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css"
    />
    <title>Vercel + Fastify</title>
    <meta
      name="description"
      content="This is a starter template for Vercel + Fastify."
    />
  </head>
  <body>
    <h1>Vercel + Fastify Hello World</h1>
    <p>
      Requests are rewritten from <code>/*</code> to <code>/api/*</code>, which runs
      as a Vercel Function.
    </p>
  </body>
</html>
`
