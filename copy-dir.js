import { copy, ensureDir } from 'fs-extra'

const listFolderCopy = [
  {
    sourceDirectory: 'src/views',
    targetDirectory: 'dist/views'
  },
  {
    sourceDirectory: 'src/public',
    targetDirectory: 'dist/public'
  },
  {
    sourceDirectory: 'src/uploads', // Đảm bảo thư mục src/uploads tồn tại
    targetDirectory: 'dist/uploads'
  }
]

// Kiểm tra và tạo thư mục nếu không tồn tại
listFolderCopy.forEach((item) => {
  ensureDir(item.sourceDirectory)
    .then(() => {
      copy(item.sourceDirectory, item.targetDirectory, (err) => {
        if (err) {
          console.error(`Lỗi sao chép thư mục ${item.sourceDirectory}:`, err)
        } else {
          console.log(`Sao chép thành công thư mục ${item.sourceDirectory}`)
        }
      })
    })
    .catch((err) => {
      console.error(`Lỗi khi kiểm tra thư mục ${item.sourceDirectory}:`, err)
    })
})
