import dotenv from 'dotenv'
dotenv.config()

const getDatabaseUrl = (nodeEnv) => {
  const productionDB = process.env.DATABASE_URL
  return (
    {
      production: productionDB,
      development: "postgres://postgres:postgres@localhost:5432/recipease_development",
      test: "postgres://postgres:postgres@localhost:5432/recipease_test",
      e2e: "postgres://postgres:postgres@localhost:5432/recipease_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
