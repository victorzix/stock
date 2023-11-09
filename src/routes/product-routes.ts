import { Request, Response, Router } from 'express'
import ProductController from '../controllers/product-controller'


const productRouter = Router()
productRouter.post('/', ProductController.store)
productRouter.patch('/update/:id', ProductController.update)
productRouter.delete('/delete/:id', ProductController.delete)
productRouter.get('/product/:id', ProductController.show)
productRouter.get('/index', ProductController.index)
productRouter.get('/income', ProductController.getIncomes)


export default productRouter;