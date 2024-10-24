import { pagination } from '~/models/Others'
export const paginationUtils = (objectPagination: pagination, page: number, countDocuments: number) => {
  if (page) {
    objectPagination.currentPage = page
  }
  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
  const totalPages = Math.ceil(countDocuments / objectPagination.limitItems)
  objectPagination.totalPage = totalPages
  return objectPagination
}
