import type { RedisClientOptions } from 'redis';

/**
 * Configures the Redis client options.
 *
 * @param {string} [options.socket.host] - The hostname or IP address of the Redis server. Defaults to 'localhost'.
 * @param {number} [options.socket.port] - The port number of the Redis server. Defaults to 6379.
 * @param {string} [options.password] - The password for the Redis server. Defaults to an empty string.
 *
 * @returns {RedisClientOptions} - The configured Redis client options.
 */
export const redisConfig: RedisClientOptions = {
  socket: {
    host: process.env.REDIS_HOST || 'localhost', // default value
    port: parseInt(process.env.REDIS_PORT) || 6379, // default value
  },
  password: process.env.REDIS_PASSWORD || '',
};
