import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'


export default class CategoriesController {
  public async index ({}: HttpContextContract) {
    return Category.all()
  }
  public async store ({request}: HttpContextContract) {
    const { product_id} = request.params()
    const { name } = request.body()
    const product = await Category.create({ name, productId: product_id})
    return product
  }
  public async show ({request}: HttpContextContract) {
    const {product_id,id} = request.params()
    const Categories = await Category.query().where('id',id).andWhere('product_id', product_id).first()
    return Categories
  }
  public async update ({request,response}: HttpContextContract) {
    const { product_id, id} = request.params()
    const {name} = request.body()
    const aux = await Category.query().where('id',id).andWhere('product_id',product_id).first()
    if(!aux){
      return response.notFound()
    }
    aux.name = name
    await aux.save()
    return aux
  }
  public async destroy ({request,response}: HttpContextContract) {
    const { product_id, id} = request.params()
    const aux = await Category.query().where('id',id).andWhere('product_id',product_id).first()
    if(!aux){
      return response.notFound()
    }
    await aux.delete()
    return aux
  }
}
