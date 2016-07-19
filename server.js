import express from 'express'
import cors from 'cors'
// import logger from 'express-bunyan-logger'
import compression from 'compression'
import responseTime from 'response-time'

import api from './api'

const app = express()

// app.use(logger({
//   name: 'request',
//   streams: [{
//     level: 'debug',
//     stream: process.stdout,
//   }],
//   format: ':remote-address :incoming :method :url :status-code - :user-agent[family] :user-agent[major].:user-agent[minor] :user-agent[os] - :response-time ms',
//   excludes: ['*'],
// }))
app.use(cors())
app.use(compression())
app.use(responseTime())

app.use('/', api)

const server = app.listen(8000, () => {
  const host = server.address().address
  const port = server.address().port

  console.log(`app running at http://${host}:${port}`)
})
