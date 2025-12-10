// plugins/tiktok.js
import fetch from "node-fetch";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES Module වල __filename හා __dirname ලබා ගැනීම
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  name: "tiktok",
  pattern: "tt",
  react: "🎵",
  desc: "Download TikTok video without watermark",
  category: "download",
  filename: __filename,
  async execute(bot, mek, m, { from, quoted, body, q, reply, sendVideo }) {
    try {
      // link එක check කරන්න
      if (!q) return reply("📌 TikTok link ekak denna. Udaharanayak: tt https://www.tiktok.com/xxxx");

      // TikTok downloader API call
      const res = await fetch(`https://tikwm.com/api?url=${q}`);
      if (!res.ok) return reply("❌ TikTok API call ekata error ekak wela.");

      const data = await res.json();

      // video link check කරන්න
      if (!data.video_no_watermark) return reply("❌ Video eka ganna behe 😢");

      // video send කරන්න
      await sendVideo(from, data.video_no_watermark, { caption: "TikTok video 🎬" });

    } catch (err) {
      console.error("TikTok Plugin Error:", err);
      reply("❌ TikTok download karanna bari 😔");
    }
  }
};
