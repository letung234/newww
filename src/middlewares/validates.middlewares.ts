import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
import { salaryType } from '~/constants/enums'
import databaseService from '~/services/database.service'
import { SALARY_MESSAGES } from '~/constants/messages'
import { ObjectId } from 'mongodb'
// Validator cho cập nhật phân lương
export const UpdateSalaryValidator = validate(
  checkSchema(
    {
      ten: {
        isString: true,
        trim: true,
        notEmpty: {
          errorMessage: SALARY_MESSAGES.SALARY_NAME_REQUIRED // 'Tên phân lương là bắt buộc'
        },
        isLength: {
          options: { max: 255 },
          errorMessage: SALARY_MESSAGES.SALARY_NAME_MAX_LENGTH // 'Tên phân lương không được vượt quá 255 ký tự'
        },
        custom: {
          options: async (value, { req }) => {
            // Kiểm tra nếu tên đã tồn tại cho phân lương khác
            const salaryId = req.params?.id as string // Lấy ID từ request params
            const existingSalary = await databaseService.SalaryPortion.findOne({
              ten: value,
              _id: { $ne: new ObjectId(salaryId) }
            })
            if (existingSalary) {
              throw new Error(SALARY_MESSAGES.SALARY_NAME_EXISTS) // 'Tên phân lương đã tồn tại!!!'
            }
            return true
          }
        }
      },
      loai: {
        isInt: {
          errorMessage: SALARY_MESSAGES.SALARY_TYPE_MUST_BE_INTEGER // 'Loại phân lương phải là số nguyên'
        },
        toInt: true,
        custom: {
          options: (value) => {
            return Object.values(salaryType).includes(value)
          },
          errorMessage: SALARY_MESSAGES.SALARY_TYPE_INVALID // 'Loại phân lương chỉ được là khấu trừ hoặc thu nhập'
        }
      },
      mo_ta: {
        isString: true,
        optional: true, // Trường này không bắt buộc
        isLength: {
          options: { max: 5000 },
          errorMessage: SALARY_MESSAGES.SALARY_DESCRIPTION_MAX_LENGTH // 'Mô tả không được vượt quá 500 ký tự'
        }
      },
      is_active: {
        isBoolean: {
          errorMessage: SALARY_MESSAGES.SALARY_STATUS_MUST_BE_BOOLEAN // 'Trạng thái phải là kiểu boolean'
        },
        toBoolean: true
      },
      'tai_khoan_ke_toan.*.id_congty': {
        isMongoId: {
          errorMessage: SALARY_MESSAGES.COMPANY_ID_INVALID // 'ID công ty phải là một ObjectId hợp lệ'
        }
      },
      'tai_khoan_ke_toan.*.id_ke_toan': {
        isMongoId: {
          errorMessage: SALARY_MESSAGES.ACCOUNTANT_ID_INVALID // 'ID kế toán phải là một ObjectId hợp lệ'
        }
      },
      tai_khoan_ke_toan: {
        custom: {
          options: (value) => {
            const seen = new Set()
            for (const account of value) {
              const key = `${account.id_congty}-${account.id_ke_toan}`
              if (seen.has(key)) {
                throw new Error(SALARY_MESSAGES.DUPLICATE_ACCOUNT_COMPANY_PAIR) // 'Có cặp ID công ty và ID kế toán bị trùng'
              }
              seen.add(key)
            }
            return true
          }
        }
      }
    },
    ['body'] // Kiểm tra trong body của request
  )
)
export const createSalaryValidator = validate(
  checkSchema(
    {
      ten: {
        isString: true,
        trim: true,
        notEmpty: {
          errorMessage: SALARY_MESSAGES.SALARY_NAME_REQUIRED // 'Tên phân lương là bắt buộc.'
        },
        isLength: {
          options: { max: 255 },
          errorMessage: SALARY_MESSAGES.SALARY_NAME_MAX_LENGTH // 'Tên phân lương không được vượt quá 255 ký tự.'
        },
        custom: {
          options: async (value) => {
            const result = await databaseService.SalaryPortion.findOne({ ten: value })
            if (result) {
              throw new Error(SALARY_MESSAGES.SALARY_NAME_EXISTS) // 'Tên phân lương đã tồn tại!!!'
            }
            return true
          }
        }
      },
      loai: {
        isInt: {
          errorMessage: SALARY_MESSAGES.SALARY_TYPE_MUST_BE_INTEGER // 'Loại phân lương phải là số nguyên.'
        },
        toInt: true,
        custom: {
          options: (value) => {
            return Object.values(salaryType).includes(value)
          },
          errorMessage: SALARY_MESSAGES.SALARY_TYPE_INVALID // 'Loại phân lương chỉ được là khấu trừ hoặc thu nhập.'
        }
      },
      mo_ta: {
        isString: true,
        optional: true, // Trường này không bắt buộc
        isLength: {
          options: { max: 500 },
          errorMessage: SALARY_MESSAGES.SALARY_DESCRIPTION_MAX_LENGTH // 'Mô tả không được vượt quá 500 ký tự.'
        }
      },
      is_active: {
        isBoolean: {
          errorMessage: SALARY_MESSAGES.SALARY_STATUS_MUST_BE_BOOLEAN // 'Trạng thái phải là kiểu boolean.'
        },
        toBoolean: true
      },
      'tai_khoan_ke_toan.*.id_congty': {
        isMongoId: {
          errorMessage: SALARY_MESSAGES.COMPANY_ID_INVALID // 'ID công ty phải là một ObjectId hợp lệ.'
        }
      },
      'tai_khoan_ke_toan.*.id_ke_toan': {
        isMongoId: {
          errorMessage: SALARY_MESSAGES.ACCOUNTANT_ID_INVALID // 'ID kế toán phải là một ObjectId hợp lệ.'
        }
      },
      tai_khoan_ke_toan: {
        custom: {
          options: (value) => {
            const seen = new Set()
            for (const account of value) {
              const key = `${account.id_congty}-${account.id_ke_toan}`
              if (seen.has(key)) {
                throw new Error(SALARY_MESSAGES.DUPLICATE_ACCOUNT_COMPANY_PAIR) // 'Có cặp ID công ty và ID kế toán bị trùng.'
              }
              seen.add(key)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
