import { Router, Request, Response } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import { SalaryNameExists, EditSalaryNameExists } from '~/controllers/api/validates/salary.controllers.api.validates'
const ApiSalaryValidatesRouter = Router()
ApiSalaryValidatesRouter.post('/salarynameisexists', wrapRequestHandler(SalaryNameExists))
ApiSalaryValidatesRouter.post('/salaryeditnameisexists/:id', wrapRequestHandler(EditSalaryNameExists))
export default ApiSalaryValidatesRouter
