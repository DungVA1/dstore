export default () => ({
  app: {
    gateway: {
      prefix: 'gateway',
      name: 'API_GATEWAY',
      host: process.env.API_GATEWAY_HOST || 'localhost',
      port: process.env.API_GATEWAY_PORT || 3000,
    },
    auth: {
      prefix: 'auth',
      name: 'AUTH_SERVICE',
      host: process.env.AUTH_SERVICE_HOST || 'localhost',
      port: process.env.AUTH_SERVICE_PORT || 3001,
      msPort: process.env.AUTH_SERVICE_MS_PORT || 4001,
    },
    user: {
      prefix: 'user',
      name: 'USER_SERVICE',
      host: process.env.USER_SERVICE_HOST || 'localhost',
      port: process.env.USER_SERVICE_PORT || 3002,
      msPort: process.env.USER_SERVICE_MS_PORT || 4002,
    },
  },
  database: {
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    userName: process.env.POSTGRESQL_USERNAME,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
  },
  secret: {
    jwt: process.env.JWT_SECRET,
    access_token_expires_in: 15 * 60, //15m in second
    refresh_token_expires_in: 30 * 24 * 60 * 60, // 30d in second
    otp: process.env.OTP_SECRET,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
});
