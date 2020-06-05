
const migrationsDir = 'dist/migrations';
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
    migrations: [migrationsDir + "/*.js"],
    cli: { 
        "migrationsDir": migrationsDir,
        "entitiesDir": "dist/"
     }
}

module.exports = config;