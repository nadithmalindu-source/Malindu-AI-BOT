const { cmd } = require("../command");
const axios = require("axios");

cmd(
  {
    pattern: "tiktok",
    alias: ["tt", "ttdl"],
    react: "📥",
    desc: "Download TikTok Videos",
    category: "download",
    filename: __filename
  },

  async (bot, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("❌ කවුරුද TikTok link එක?");

      // 🔥 WORKING API
      const api = `https://hiroshi-api.onrender.com/api/tiktok?url=${q}`;

      const res = await axios.get(api);
      const data = res.data;

      if (!data.status) return reply("❌ Video not found!");

      const info = data.result;

      let cap = `
🎬 *TikTok Video Downloader*
-------------------------
⭐ *Title:* ${info.title}
👀 *Views:* ${info.stats.playCount}
👍 *Likes:* ${info.stats.likeCount}
💬 *Comments:* ${info.stats.commentCount}
🔄 *Shares:* ${info.stats.shareCount}
-------------------------
📥 *Powered by Malindu AI BOT*
      `;

      await bot.sendMessage(
        from,
        { image: { url: info.cover }, caption: cap },
        { quoted: mek }
      );

      await bot.sendMessage(
        from,
        { video: { url: info.noWatermark }, caption: "🎥 *No Watermark Video*" },
        { quoted: mek }
      );

    } catch (e) {
      console.log(e);
      reply("❌ Error: TikTok API failed.");
    }
  }
);
