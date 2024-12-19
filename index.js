import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const { type, fileName } = req.query;
  let fileNameForKv;

  try {
    fileNameForKv = type === "options" ? "options" : `${type}-${fileName}`;
    const datajson = await kv.get(fileNameForKv);

    if (!datajson) {
      return res.status(404).json({ message: "Data not found." });
    }

    res.json(datajson);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
