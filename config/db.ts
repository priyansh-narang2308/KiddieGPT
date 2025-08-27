import "dotenv/config"; 
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"

const postgresql = neon(process.env.DATABASE_URL!);
console.log("DATABASE_URL:", postgresql);
export const db = drizzle(postgresql, { schema });

