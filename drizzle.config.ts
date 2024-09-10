import './drizzle/envConfig';
import {defineConfig} from 'drizzle-kit'

export default defineConfig({
    schema: "./drizzle/schema.ts",
    //out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL || '',
    }
})
