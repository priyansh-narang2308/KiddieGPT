import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const postgresql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);
export const db = drizzle(postgresql, { schema });
