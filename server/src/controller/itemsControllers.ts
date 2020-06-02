import knex from '../database/conn'
import {Request, Response} from 'express'

class ItemsControllers {
   async index(req:Request, res:Response) {
    const items = await knex('items').select('*')

    const serializeItems = items.map(item => {
        return { 
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}.svg`
         }
    })

    return res.json(serializeItems)
    }

    async delete(req:Request, res:Response) {
        const {name} = req.params

    await knex('items').where('title', name).delete()

    return res.json({ sucess: true })
    }
}

export default ItemsControllers