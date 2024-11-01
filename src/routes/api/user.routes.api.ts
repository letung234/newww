import { Router, Request, Response } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import { loginValidator, createUserValidator, updateUserValidator } from '~/middlewares/validates.middlewares'
import { PostCreateUsers, PatchEditUsers, DeleteUser, PostLoginUser } from '~/controllers/api/user.controllers.api'
const ApiUserRouter = Router()
ApiUserRouter.post('/create', createUserValidator, wrapRequestHandler(PostCreateUsers))
ApiUserRouter.patch('/edit/:id', updateUserValidator, wrapRequestHandler(PatchEditUsers))
ApiUserRouter.delete('/delete/:id', wrapRequestHandler(DeleteUser))
ApiUserRouter.post('/login', loginValidator, wrapRequestHandler(PostLoginUser))
export default ApiUserRouter
