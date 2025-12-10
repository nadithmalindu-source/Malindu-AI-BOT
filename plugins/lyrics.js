const { cmd } = require("../command");
const genius = require("genius-lyrics");

const Client = new genius.Client(); // Add Genius API token if required

cmd(
  {
    pattern: "lyr",
    react: "🎶",
    desc: "Get lyrics for a song",
    category: "music",
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
      if (!q) return reply("❌ Please provide a song name!");
      const searches = await Client.songs.search(q);
      if (!searches || searches.length === 0) return reply("❌ Song not found!");
      const song = searches[0];

      const desc = `
🎵 Title: ${song.title}
👤 Artist: ${song.artist.name}
📄 Lyrics: ${song.lyrics_url}
`;
      reply(desc);

    } catch (e) {
      console.error(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
