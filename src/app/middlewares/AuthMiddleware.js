class AuthMiddleware {
  async requireAuth(req, res, next) {
    if (!req.session.user) {
      return res.redirect('/login')
    }

    next()
  }

  async requireAdmin(req, res, next) {
    if (req.session.user.role === 'admin') {
      return res.redirect('/')
    }

    next()
  }
}

export default new AuthMiddleware()
