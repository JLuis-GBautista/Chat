import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config({ path: '.env.development' });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
});

// const typeOrmConfig = async (
//   configService: ConfigService,
// ): Promise<DataSource> => ({
//   type: 'postgres',
//   host: configService.get('DB_HOST'),
//   port: configService.get('DB_PORT'),
//   username: configService.get('DB_USER'),
//   password: configService.get('DB_PASSWORD'),
//   database: configService.get('DB_NAME'),
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
// });

// export default typeOrmConfig;
