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
    },
    user: {
      prefix: 'user',
      name: 'USER_SERVICE',
      host: process.env.USER_SERVICE_HOST || 'localhost',
      port: process.env.USER_SERVICE_PORT || 3002,
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
    otp: process.env.OTP_SECRET,
  },
});
