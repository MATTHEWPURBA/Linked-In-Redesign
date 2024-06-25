const Redis = require("ioredis");

// Create a Redis instance.
// By default, it will connect to localhost:6379.
// We are going to cover how to specify connection options soon.
const redis = new Redis({
  port: 16716, // Redis port
  host: "redis-16716.c252.ap-southeast-1-1.ec2.redns.redis-cloud.com", // Redis host
  password: "EJr3U3NBuo0HsFSUfu3TYsC4HqJQoKtv",
});

module.exports = redis;
