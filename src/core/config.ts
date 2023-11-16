export const CONFIG = {
  DB_URL: process.env.DB_URL!,
  PORT: parseInt(process.env.PORT!),
  SECRET: process.env.SECRET!,
  HASH_ROUNDS: parseInt(process.env.HASH_ROUNDS!),
};
