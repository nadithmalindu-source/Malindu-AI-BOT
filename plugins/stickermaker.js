 const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { sticker } = require("../lib/sticker");

cmd(
  {
    pattern: "st",
    alias: ["s"],
    desc: "Convert image or video to sticker",
    category: "tools",
    filename: __filename,
  },

  async (
    bot,
    mek,
    m,
    {
      reply,
      quoted,
    }
  ) => {
    try {
      const msg = quoted || m;

      if (!msg.message) {
        return reply("📌 *Send an image/video with caption .s*");
      }

      let type = Object.keys(msg.message)[0];

      if (!["imageMessage", "videoMessage"].includes(type)) {
        return reply("❌ *Please send an image or video!*");
      }

      // ─────────────────────────────────────
      // 📥 DOWNLOAD MEDIA (NEW BAILEYS API)
      // ─────────────────────────────────────
      let mimeType = type.replace("Message", "");
      const stream = await downloadContentFromMessage(
        msg.message[type],
        mimeType
      );

      let buffer = Buffer.from([]);

      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }

      // ─────────────────────────────────────
      // 🎨 CONVERT TO STICKER
      // ─────────────────────────────────────
      let stickerBuffer = await sticker(buffer, {
        packname: "MALIYA-MD",
        author: "Malindu",
      });

      await bot.sendMessage(
        m.chat,
        { sticker: stickerBuffer },
        { quoted: mek }
      );

    } catch (err) {
      console.error(err);
      reply("❌ *Error converting to sticker!*");
    }
  }
);
