const { cmd } = require("../command");
const { tiktokDownloader } = require("@mrnima/tiktok-downloader");

cmd(
  {
    pattern: "tt",
    react: "🎵",
    desc: "Download TikTok Video",
    category: "download",
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
      if (!q) return reply("❌ Please provide TikTok video URL!");

      reply("⏳ Downloading your TikTok video...");

      const videoData = await tiktokDownloader(q);

      await danuwa.sendMessage(from, {
        video: { url: videoData.downloadUrl },
        caption: `✅ TikTok video downloaded successfully!`,
      }, { quoted: mek });

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
