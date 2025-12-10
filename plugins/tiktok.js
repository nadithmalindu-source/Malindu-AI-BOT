// plugins/tiktok.js
import fetch from "node-fetch";

export default {
  name: "tiktok",
  pattern: "tt",          // command eka - bot eken tt link eken handle karanna
  react: "🎵",
  desc: "Download TikTok video",
  category: "download",
  filename: __filename,
  async execute(bot, mek, m, { from, quoted, body, q, reply, sendVideo }) {
    try {
      if (!q) return reply("📌 TikTok link ekak denna. Udaharanayak: tt https://www.tiktok.com/xxxx");

      // TikTok API call
      const res = await fetch(`https://tikwm.com/api?url=${q}`);
      if (!res.ok) return reply("❌ API call ekata error ekak wela.");

      const data = await res.json();

      if (!data.video_no_watermark) return reply("❌ Video eka ganna behe 😢");

      // Video send karanna
      await sendVideo(from, data.video_no_watermark, { caption: "TikTok video 🎬" });

    } catch (err) {
      console.error("TikTok Plugin Error:", err);
      reply("❌ TikTok download karanna bari 😔");
    }
  }
};
