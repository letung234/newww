export default function parseBoolean(value: any): boolean {
  if (typeof value === 'boolean') {
    return value
  }
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true'
  }
  return false // Hoặc có thể ném lỗi nếu không phải kiểu boolean hợp lệ
}
