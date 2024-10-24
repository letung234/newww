import express, { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { SALARY_MESSAGES } from '~/constants/messages'
import salaryService from '~/services/salary.services'
import { SalaryNameExistsRequestBody, EditSalaryNameExistsParams } from '~/models/requests/salary.request'
export const SalaryNameExists = async (req: Request<any, any, SalaryNameExistsRequestBody, any>, res: Response) => {
  const salaryName: string = req.body?.ten
  const result = await salaryService.SalaryCreate(salaryName)

  if (result) {
    return res.status(HTTP_STATUS.CONFLICT).json({
      message: SALARY_MESSAGES.SALARY_NAME_EXISTS
    })
  }

  return res.status(200)
}

export const EditSalaryNameExists = async (
  req: Request<EditSalaryNameExistsParams, any, SalaryNameExistsRequestBody, any>,
  res: Response
) => {
  const { id } = req.params
  const { ten } = req.body
  const result = await salaryService.SalaryEdit(ten, id)
  if (result) {
    return res.status(HTTP_STATUS.CONFLICT).json({
      message: SALARY_MESSAGES.SALARY_NAME_EXISTS
    })
  }
  return res.status(200)
}
