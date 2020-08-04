import express from 'express'
import ClassesController from './controllers/classes_controller'
import ConnectionsController from './controllers/connections_controller'

const Router = express.Router()

const classController = new ClassesController
const connectionsController = new ConnectionsController

Router.post('/classes', classController.create)
Router.get('/classes', classController.index)

Router.post('/connections', connectionsController.create)
Router.get('/connections', connectionsController.index)

Router.get('/teste', classController.teste)

export default Router
