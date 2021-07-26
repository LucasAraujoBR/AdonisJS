
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'



export default class ProductsController {
  public async index ({}: HttpContextContract) {
    return Product.query().preload('category')
  }

  public async store ({request}: HttpContextContract) {
    const {name, price } = request.body()
    const product = await Product.create({ name, price})
    return product
  }

  public async show ({request}: HttpContextContract) {
    const {id} = request.params()
    const view = await Product.findBy('id',id)
    return view
  }


  public async update ({request,response}: HttpContextContract) {
    const {id} = request.params()
    const {name} = request.body()
    const {price} = request.body()
    const find = await Product.findBy('id',id)
    if (!find) {
      return response.notFound()
    }
    find.name = name;
    find.price = price;
    await find.save()
    return find
  }

  public async destroy ({request, response}: HttpContextContract) {
    const {id} = request.params()
    const produto = await Product.findBy('id',id)
    if(!produto) {
      return response.notFound()
    }
    await produto.delete()
    return produto
  }
}
