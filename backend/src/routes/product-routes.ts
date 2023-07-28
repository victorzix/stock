import { Request, Response, Router } from 'express'
import ProductController from '../controllers/product-controller'


const router = Router()

router.get('/', ProductController.store) 


export default router;