import knex from '../database/conn'
import {Request, Response, request} from 'express'

class PointsControllers {
    async create(req:Request, res:Response) {
        const { name, email, wpp, latitude,longitude,city,uf,items } = req.body

        const trx = await knex.transaction()

        const point = {
            image: 'https://images.unsplash.com/photo-1568502212786-1e1eca7c06f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80',
            name, 
            email, 
            wpp, 
            latitude,
            longitude,
            city,
            uf
        }

        const ids = await trx('points').insert(point)

        const pointItems = items.map((item_id:Number) => {
            return {
                item_id,
                point_id: ids[0]
            }
        })

        await trx('point_item').insert(pointItems)

        await trx.commit()

        return res.json({
            id: ids[0], 
            ...point})
    }

    async show(req:Request, res:Response) {
        const { id } = req.params

        const point = await knex('points').where('id', id).first()

        if(!point) {
            return res.status(400).json({ message: 'Point not Found' })
        }

        const items = await knex('items')
                                .join('point_item', 'items.id', '=', 'point_items.item_id')
                                .where('point_items.point_id', id)
                                .select('items.title')

        return res.json(point)
    }

    async index(req:Request, res:Response) {
        const { city,uf,items } = req.query
        const parsedItems = String(items).split(',').map(item => Number(item.trim()))

        const points = await knex('points')
                                .join('point_item', 'points.id', '=', 'point_item.point_id')
                                .whereIn('point_item.item_id', parsedItems)
                                .where('city', String(city))
                                .where('uf', String(uf))
                                .distinct()
                                .select('points.*')

        return res.json(points)
    }
}

export default PointsControllers