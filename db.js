require("dotenv").config();
const { Pool } = require("pg");

const connectionString = `postgresql://${"postgres"}:${process.env.PG_PASSWORD}@${"localhost"}:${5432}/${process.env.PG_DATABASE}`;

const proConfig = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : {connectionString}
);

module.exports = pool;
