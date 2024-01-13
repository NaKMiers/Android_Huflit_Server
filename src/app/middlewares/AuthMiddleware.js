import jwt from 'jsonwebtoken'

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Access token not found' })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' })
    req.user = user

    next()
  })
}

export async function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Access token not found' })

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' })

    if (user.role !== 'admin') return res.status(403).json({ message: 'Require admin' })
    req.user = user

    next()
  })
}
