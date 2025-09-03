import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";


// server-side environment variable
const postgresql = neon(process.env.DATABASE_URL!);

const postgresql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);

export const db = drizzle(postgresql, { schema });
