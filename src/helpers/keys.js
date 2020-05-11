const keys = {
    PORT: process.env.PORT,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    DB_CONNECTION_STRING: process.env.MONGODB_CONNECTIONSTRING,
    JWT_SECRET: process.env.JWT_SECRET,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
}

module.exports = keys;