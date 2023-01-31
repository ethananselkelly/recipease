const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      production: "postgres://postgresql_defined_69291_user:fYxU5HSaxkQCfi6kaszc82kLQbt7OZIW@dpg-ce52ndg2i3mjq96t7n6g-a/postgresql_defined_69291",
      development: "postgres://postgres:postgres@localhost:5432/recipease_development",
      test: "postgres://postgres:postgres@localhost:5432/recipease_test",
      e2e: "postgres://postgres:postgres@localhost:5432/recipease_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
