const { cmd } = require("../command");
const { Sticker } = require("wa-sticker-formatter");

cmd(
  {
    pattern: "sticker",
    react: "🖼️",
    desc: "Convert image/video to sticker",
    category: "sticker",
    filename: __filename,
  },
  async (
    danuwa,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      let media = quoted ? quoted : mek;
      if (!media || !media.message) return reply("❌ Please send an image/video!");

      let buffer = await danuwa.downloadAndSaveMediaMessage(media, "temp");

      const sticker = new Sticker(buffer, {
        pack: "MALIYA-MD",
        author: pushname || "MALIYA-MD",
        type: "full",
        categories: ["🤖", "💚"],
      });

      const stickerBuffer = await sticker.toBuffer();

      await danuwa.sendMessage(from, { sticker: stickerBuffer }, { quoted: mek });

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
