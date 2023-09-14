import {SqliteConnectionOptions} from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
    type: 'sqlite',
    database: 'ssh.db',
    synchronize: true,
    logging: false,
    entities: [
        'src/models/**/*.ts'
    ],
    migrations: [
        'src/migration/**/*.ts'
    ],
    subscribers: [
        'src/subscriber/**/*.ts'
    ],
    cli: {
        entitiesDir: 'src/models',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
    }
};

export default config;
