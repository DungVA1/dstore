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
});
