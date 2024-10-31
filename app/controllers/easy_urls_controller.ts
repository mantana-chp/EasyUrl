import EasyUrl from '#models/easy_url'
import type { HttpContext } from '@adonisjs/core/http'
import { nanoid } from 'nanoid'

export default class EasyUrlsController {
  async index({ view, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const urls = await EasyUrl.query().where('userId', user.id).orderBy('id', 'desc')

    return view.render('easy_url', { urls: urls })
  }

  async store({ request, auth, response, session }: HttpContext) {
    const url = request.input('url')
    const id = nanoid() // Use nanoid to generate the ID
    const user = auth.getUserOrFail()

    await EasyUrl.create({
      easyUrl: id,
      url: url,
      userId: user?.id,
    })

    session.flash('message', {
      type: 'positive',
      message: 'Easy URL created successfully!',
    })

    return response.redirect().toRoute('easy.home')
  }

  async show({ params, response, view }: HttpContext) {
    const easyUrl = params.easyurl
    console.log(easyUrl)

    const data = await EasyUrl.query().where('easy_url', easyUrl).first()

    if (easyUrl) {
      return response.redirect(data?.url)
    } else {
      return view.render('errors/not-found')
    }
  }

  async update({ params, request, response, session }: HttpContext) {
    const id = params.id
    const url = request.input('url')

    const easyUrl = await EasyUrl.find(id)

    if (easyUrl) {
      easyUrl.url = url
      await easyUrl.save()

      session.flash('message', {
        type: 'positive',
        message: 'Easy URL updated successfully!',
      })

      return response.redirect().toRoute('easy.home')
    } else {
      return response.redirect().toRoute('easy.home')
    }
  }

  async destroy({ params, response, view }: HttpContext) {
    const id = params.id
    const easyUrl = await EasyUrl.find(id)

    if (easyUrl) {
      await easyUrl.delete()
      return response.redirect().toRoute('easy.home')
    } else {
      return view.render('errors/not-found')
    }
  }
}
