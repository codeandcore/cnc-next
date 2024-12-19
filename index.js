const express = require("express");
const path = require("path");
const { kv } = require("@vercel/kv");
const cache = require("./cache");

const app = express();

// Middleware to parse JSON
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

console.log("testasdasd");
app.get("/data/:type?/:fileName", async (req, res) => {
  const { type, fileName } = req.params;
  let fileNameForKv;
  try {
    if (type === "options") {
      fileNameForKv = "options";
    } else {
      fileNameForKv = `${type}-${fileName}`;
    }
    console.log("fileNameForKv",fileNameForKv);

    const datajson = await kv.get(fileNameForKv);
    console.log("datajson",datajson);
    if (!datajson) {
      return res.status(404).json({ message: "Data not found." });
    }

    cache.set(fileNameForKv, datajson);

    res.send(datajson);
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
