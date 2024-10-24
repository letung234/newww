import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

// Hàm xử lý lỗi mặc định
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithStatus) {
    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.status(err.status).json(omit(err, ['status']))
    } else {
      // Đối với SSR, render trang lỗi
      return res.status(err.status).render('pages/error/error', {
        message: err.message,
        errorInfo: omit(err, ['stack'])
      })
    }
  }

  const finalError: any = {}
  Object.getOwnPropertyNames(err).forEach((key) => {
    if (
      !Object.getOwnPropertyDescriptor(err, key)?.configurable ||
      !Object.getOwnPropertyDescriptor(err, key)?.writable
    ) {
      return
    }
    finalError[key] = err[key]
  })

  console.log('finalError', finalError)

  if (req.xhr || req.headers.accept?.includes('application/json')) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: finalError.message,
      errorInfo: omit(finalError, ['stack'])
    })
  } else {
    // Render trang lỗi cho SSR
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).render('pages/error/error', {
      message: finalError.message,
      errorInfo: omit(finalError, ['stack'])
    })
  }
}
