import { Collection, Db, MongoClient } from 'mongodb'
import SalaryPortion from '~/models/schemas/salary.model'
import Account from '~/models/schemas/account.model'
import Company from '~/models/schemas/company.model'
import { envConfig } from '~/constants/config'
const uri = `mongodb+srv://${envConfig.dbUsername}:${envConfig.dbPassword}@cluster0.ycjjawi.mongodb.net`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(envConfig.dbName)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log(`Connect successful`)

      // Tạo index khi kết nối thành công
      await this.createIndexes()
    } catch (error) {
      console.log('Database Error :', error)
      throw error
    }
  }

  get SalaryPortion(): Collection<SalaryPortion> {
    return this.db.collection('SalaryPortion')
  }

  get Company(): Collection<Company> {
    return this.db.collection('Company')
  }

  get Account(): Collection<Account> {
    return this.db.collection('Account')
  }

  // Kiểm tra xem index đã tồn tại chưa trước khi tạo index
  async createIndexes() {
    const existingIndexes = await this.SalaryPortion.indexes()
    const existingIndexNames = existingIndexes.map((index) => index.name)

    // Tạo index nếu chưa tồn tại
    if (!existingIndexNames.includes('index_ten')) {
      await this.SalaryPortion.createIndex({ ten: 1 }, { name: 'index_ten' })
    }

    if (!existingIndexNames.includes('index_is_active')) {
      await this.SalaryPortion.createIndex({ is_active: 1 }, { name: 'index_is_active' })
    }

    if (!existingIndexNames.includes('index_loai')) {
      await this.SalaryPortion.createIndex({ loai: 1 }, { name: 'index_loai' })
    }

    if (!existingIndexNames.includes('index_ngay_tao')) {
      await this.SalaryPortion.createIndex({ ngay_tao: 1 }, { name: 'index_ngay_tao' })
    }

    if (!existingIndexNames.includes('index_deleted')) {
      await this.SalaryPortion.createIndex({ deleted: 1 }, { name: 'index_deleted' })
    }

    if (!existingIndexNames.includes('index_id_ten')) {
      await this.SalaryPortion.createIndex({ _id: 1, ten: 1 }, { name: 'index_id_ten' })
    }

    console.log('Indexes created successfully')
  }
}

const databaseService = new DatabaseService()
export default databaseService
