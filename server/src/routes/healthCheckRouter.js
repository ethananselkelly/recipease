import express from 'express'

const healthCheckRouter = new express.Router()

healthCheckRouter.get('/', async (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now()
  }
  try {
    return res.status(200).json({ healthCheck })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default healthCheckRouter