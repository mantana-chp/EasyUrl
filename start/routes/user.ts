import UsersController from '#controllers/users_controller'
import User from '#models/user'
import router from '@adonisjs/core/services/router'

router.on('/login').render('login')
router.on('/register').render('register')

router.post('/login', [UsersController, 'login']).as('user.login')
router.post('/register', [UsersController, 'register']).as('user.register')
router.get('/logout', [UsersController, 'logout']).as('user.logout')

router.get('/create_user', async () => {
  const user = await User.create({ email: 'mantana@mail.com', password: '123456' })
  console.log(`${user.email} is created!`)
})
