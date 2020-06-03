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
    synchronize: true
}

module.exports = config;