const express = require("express");
const path = require("path");
const { kv } = require("@vercel/kv");
const cache = require("./cache");
const generateJson = require("./api/generateJson");

const app = express();

// Middleware to parse JSON
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use("/api/generateJson", generateJson);
app.get("/data/:type?/:fileName", async (req, res) => {
  const type = req.params.type;
  const fileName = req.params.fileName;
  const validTypes = ["posts", "case_study", "job_listing", "pages", "instagram", "youtube", "linkedin"];
  if (type && !validTypes.includes(type)) {
    return res.status(400).json({ message: "Invalid type" });
  }
  const cachedData = cache.get(fileName);
  if (cachedData) {
    return res.send(cachedData);
  }
  try {
    const datajson = await kv.get(fileName);
    cache.set(fileName, datajson);
    res.send(datajson);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
