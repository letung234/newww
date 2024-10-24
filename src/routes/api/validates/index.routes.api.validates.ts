import { Router, Request, Response, Express } from 'express'
import { wrapRequestHandler } from '~/utils/handler'
import ApiSalaryValidatesRouter from './salary.routes.validates'
const validateRouter = (app: Express): void => {
  app.use(`/api/validates/salary/`, ApiSalaryValidatesRouter)
}
export default validateRouter
