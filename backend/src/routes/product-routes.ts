import { Request, Response, Router } from 'express'
import ProductController from '../controllers/product-controller'


const router = Router()

router.post('/store', ProductController.store)
router.get('/show/:id', ProductController.show)
router.put('/update/:id', ProductController.update)


export default router;