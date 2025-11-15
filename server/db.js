import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PGUSER, // your postgres user
  host: "localhost",
  database: process.env.PGDATABASE, // your DB name
  password: "", // empty if no password
  port: 5432,
});
console.log({ PGUSER: process.env.PGUSER });

export default pool;
