export const SALARY_MESSAGES = {
  SALARY_NAME_EXISTS: 'Tên phân lương đã tồn tại!!!',
  SALARY_NOT_FOUND: 'Không tìm thấy bản ghi để cập nhật.',
  SALARY_DELETE_SUCCESS: 'Xóa thành công',
  SALARY_DELETE_NO_ID: 'Không có ID nào được gửi để xóa.',
  SALARY_DELETE_ERROR: 'Đã xảy ra lỗi khi xóa phân lương.',
  SALARY_ADD_SUCCESS: 'Thêm dữ liệu thành công.',
  SALARY_ADD_ERROR: 'Đã xảy ra lỗi khi thêm phân lương.',
  SALARY_UPDATE_SUCCESS: 'Cập nhật dữ liệu thành công.',
  SALARY_UPDATE_ERROR: 'Đã xảy ra lỗi khi cập nhật phân lương.',
  SALARY_NAME_REQUIRED: 'Tên phân lương là bắt buộc.',
  SALARY_NAME_MAX_LENGTH: 'Tên phân lương không được vượt quá 255 ký tự.',
  SALARY_TYPE_MUST_BE_INTEGER: 'Loại phân lương phải là số nguyên.',
  SALARY_TYPE_INVALID: 'Loại phân lương chỉ được là khấu trừ hoặc thu nhập.',
  SALARY_DESCRIPTION_MAX_LENGTH: 'Mô tả không được vượt quá 500 ký tự.',
  SALARY_STATUS_MUST_BE_BOOLEAN: 'Trạng thái phải là kiểu boolean.',
  COMPANY_ID_INVALID: 'ID công ty phải là một ObjectId hợp lệ.',
  ACCOUNTANT_ID_INVALID: 'ID kế toán phải là một ObjectId hợp lệ.',
  DUPLICATE_ACCOUNT_COMPANY_PAIR: 'Có cặp ID công ty và ID kế toán bị trùng.'
} as const
export const MESSAGES = {
  VALIDATION_ERROR: 'Validation error'
}
