import Fastify from 'fastify'
import { createGoal } from '../functions/create-goal'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'
import { createGoalCompletion } from '../functions/create-goal-completion'
import { getWeekSummary } from '../functions/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = Fastify({
  logger: true,
})

app.register(fastifyCors, {
  origin: '*',
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

app.get('/pending-goals', async () => {
  const { pendingGoals } = await getWeekPendingGoals()

  return { pendingGoals }
})

app.post('/completions', 
  async request => {
    const { goalId } = request.body

    await createGoalCompletion({ goalId })
  }
)

app.get('/summary', async () => {
  const { summary } = await getWeekSummary()
  
  return { summary }
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
