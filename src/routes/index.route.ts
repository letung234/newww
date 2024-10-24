import { Express } from 'express'
import SalaryRouter from './salary.routes'
const Routes = (app: Express): void => {
  app.use(`/salary`, SalaryRouter)
}
export default Routes
