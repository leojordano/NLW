import express from 'express'

import PointsControllers from './controller/pointsControllers'
const PointsController = new PointsControllers()

import ItemsControllers from './controller/itemsControllers'
const ItemsController = new ItemsControllers()

const routes = express.Router()

routes.get('/items', ItemsController.index)
routes.get('/points/:id', PointsController.show)
routes.get('/points', PointsController.index)

routes.post('/points', PointsController.create)

routes.delete('/items/:name', ItemsController.delete)

export default routes