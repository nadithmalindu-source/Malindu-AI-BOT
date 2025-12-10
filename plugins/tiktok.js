import fetch from "node-fetch";

export default {
  name: "tiktok",
  pattern: "tt",
  react: "🎵",
  desc: "Download TikTok video without watermark",
  category: "download",
  async execute(bot, mek, m, { from, body, q, reply, sendVideo }) {
    try {
      // User TikTok link validation
      if (!q) return reply("📌 TikTok link ekak denna. Udaharanayak: tt https://www.tiktok.com/...");

      // RapidAPI TikTok downloader endpoint
      const url = `https://tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com/?url=${encodeURIComponent(q)}`;

      // API call
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "tiktok-downloader-download-tiktok-videos-without-watermark.p.rapidapi.com",
          "X-RapidAPI-Key": "bfb99d7c60msh60d1bf0d14339c1p1c6d34jsn8cffebfe8f5e"
        }
      });

      const data = await res.json();

      // Check if video link is available
      if (!data.video || data.video === "") return reply("❌ Video eka ganna behe 😢");

      // Send TikTok video to chat
      await sendVideo(from, data.video, { caption: "TikTok video 🎬" });

    } catch (err) {
      console.error("TikTok Plugin Error:", err);
      reply("❌ TikTok download karanna bari 😔");
    }
  }
};
