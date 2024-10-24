import { Express } from 'express'
import ApiSalaryRouter from './salary.route.api'
import validateRouter from '~/routes/api/validates/index.routes.api.validates'
import UploadRoutes from './upload.routes.api'
const ApiRoutes = (app: Express): void => {
  app.use(`/api/salary`, ApiSalaryRouter)
  app.use(`/api/upload`, UploadRoutes)
  validateRouter(app)
}
export default ApiRoutes
