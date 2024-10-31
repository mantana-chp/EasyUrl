import EasyUrlsController from '#controllers/easy_urls_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
router.get('/', ({ response }) => {
  return response.redirect().toPath('/easy')
})

router
  .group(() => {
    router.get('/easy', [EasyUrlsController, 'index']).as('easy.home')
    router.post('/easy', [EasyUrlsController, 'store']).as('easy.store')
    router.post('/easy/:id', [EasyUrlsController, 'update']).as('easy.update')
    router.get('/easy/:id/delete', [EasyUrlsController, 'destroy']).as('easy.delete')
    router.get('/easy/:easyurl', [EasyUrlsController, 'show']).as('easy.show')
  })
  .use(middleware.auth())

// .use(middleware.auth()
