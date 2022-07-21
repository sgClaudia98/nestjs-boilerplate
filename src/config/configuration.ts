const SnakeNamingStrategy = require('typeorm-naming-strategies')
  .SnakeNamingStrategy;

export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  database: {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: parseInt(process.env.TYPEORM_PORT),
    logging: process.env.TYPEORM_LOGGING === 'true',
    entities: process.env.TYPEORM_ENTITIES.split(','),
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    autoLoadEntities: process.env.TYPEORM_AUTOLOADENTITIES === 'true',
    migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
    namingStrategy: new SnakeNamingStrategy()
  },
  passportAuth: {
    defaultStrategy: 'jwt',
    property: 'usuario',
    session: false,
  },
  swaggerEndpoint: process.env.SWAGGER_ENDPOINT,
  jwtKey: process.env.JWT_KEY,
  appPrefix: process.env.GLOBAL_PREFIX,
});
