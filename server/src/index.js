process.on('unhandledRejection', (err) => {
  console.error('[Unhandled Rejection]', err?.stack || err?.message || err)
})

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { config } from './config.js'
import { requireAuth } from './middleware/auth.js'
import { startTelegramBot } from './services/telegram.js'
import authRoutes from './routes/auth.js'
import chatRoutes from './routes/chat.js'
import transactionsRoutes from './routes/transactions.js'
import walletsRoutes from './routes/wallets.js'
import profileRoutes from './routes/profile.js'
import telegramRoutes from './routes/telegram.js'
import depositRoutes from './routes/deposits.js'

const app = express()

app.use(helmet())
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'https://new-projects-three.vercel.app',
    /\.vercel\.app$/,
  ],
  credentials: true,
}))
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'paypulse-api', version: '0.2.0' })
})

app.use('/api/auth', authRoutes)
app.use('/api/chat', requireAuth, chatRoutes)
app.use('/api/transactions', requireAuth, transactionsRoutes)
app.use('/api/wallets', requireAuth, walletsRoutes)
app.use('/api/profile', requireAuth, profileRoutes)
app.use('/api/telegram', requireAuth, telegramRoutes)
app.use('/api/deposits', requireAuth, depositRoutes)

app.get('/api/debug/paystack-test', async (req, res) => {
  try {
    const r = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'test@test.com', amount: 10000, reference: 'DEBUG-' + Date.now() }),
    })
    const data = await r.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/debug', requireAuth, (req, res) => {
  res.json({
    hasPaystackKey: !!config.paystackSecretKey,
    paystackKeyPrefix: config.paystackSecretKey ? config.paystackSecretKey.slice(0, 10) + '...' : null,
    hasSupabaseUrl: !!config.supabaseUrl,
    hasSupabaseKey: !!config.supabaseServiceKey,
    port: config.port,
  })
})

app.use((err, req, res, next) => {
  console.error('[Error]', err.stack || err)
  const status = err.status || err.statusCode || 500
  res.status(status).json({ error: err.message || 'Internal server error' })
})

app.listen(config.port, '0.0.0.0', () => {
  console.log(`[PayPulse API] running on http://localhost:${config.port}`)
  startTelegramBot()
})
