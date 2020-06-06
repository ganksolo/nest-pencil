
const config = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "nestjs_api",
    entities: [
        "dist/**/*.entity{.ts,.js}"
    ],
    synchronize: false,
    migrations: ["dist/migrations/*.js"],     // 加载迁移所指定的目录
    cli: {
        "migrationsDir": "src/migrations",     // 创建新的迁移目录
    }

}

module.exports = config;