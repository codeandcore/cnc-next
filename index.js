const express = require("express");
const path = require("path");
const generateJson = require("./api/generateJson");
const { kv } = require("@vercel/kv");
const cache = require("./cache");

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes for generating JSON
app.use("/api/generateJson", generateJson);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Route to read JSON files from the /tmp directory
app.get("/data/:type?/:fileName", async (req, res) => {
  const type = req.params.type;
  const fileName = req.params.fileName;

  // Validate the type
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

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
