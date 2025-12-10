// plugins/tiktok.js
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

export default {
  name: "tiktok",
  pattern: "tt",
  react: "🎬",
  desc: "Download TikTok Video via RapidAPI",
  category: "download",
  filename: path.basename(import.meta.url),

  async execute(bot, mek, m, { from, body, q, reply }) {
    try {
      const videoUrl = q || (m.quoted && m.quoted.text);
      if (!videoUrl) return reply("❌ TikTok link not found.");

      // RapidAPI request
      const apiRes = await fetch(
        `https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/vid/index?url=${encodeURIComponent(videoUrl)}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com",
            "x-rapidapi-key": "bfb99d7c60msh60d1bf0d14339c1p1c6d34jsn8cffebfe8f5e",
          },
        }
      );

      const data = await apiRes.json();

      if (!data || !data.video_no_watermark) return reply("❌ Video download karanna ba.");

      // Download video
      const videoBuffer = Buffer.from(await (await fetch(data.video_no_watermark)).arrayBuffer());

      // Save temporarily
      const tempPath = path.join("/tmp", `tt_${Date.now()}.mp4`);
      fs.writeFileSync(tempPath, videoBuffer);

      // Send video
      await bot.sendMessage(from, { video: fs.readFileSync(tempPath), caption: "✅ TikTok Video!" });

      // Remove temp file
      fs.unlinkSync(tempPath);
    } catch (err) {
      console.error(err);
      reply("❌ TikTok video download karanna awulak thibuna.");
    }
  },
};
