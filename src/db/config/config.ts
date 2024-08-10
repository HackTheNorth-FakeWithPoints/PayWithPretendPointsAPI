import type { Options } from 'sequelize'

const SEQUELIZE_CONFIG: Options = {
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

export { SEQUELIZE_CONFIG }
