const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient(6379, "redis-server"); // <— use service name

// simple retry on error so the app doesn't exit if Redis isn't ready yet
client.on("error", (err) => {
  console.log("Redis error:", err.message);
});

client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    if (err) return res.status(500).send("Redis error: " + err.message);
    res.send("Number of visits is " + visits);
    client.set("visits", parseInt(visits || "0", 10) + 1);
  });
});

app.listen(8081, () => console.log("Listening on port 8081"));
