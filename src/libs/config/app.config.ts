export default () => ({
  app: {
    gateway: {
      name: 'API Gateway',
      port: process.env.API_GATEWAY_PORT || 3000,
    },
    auth: {
      name: 'Auth Service',
      port: process.env.AUTH_SERVICE_PORT || 3001,
    },
    user: {
      name: 'User Service',
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
});
