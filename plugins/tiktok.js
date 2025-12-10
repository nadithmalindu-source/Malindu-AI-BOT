const { tiktokDownloader } = require('../lib/tiktok');

cmd({
  pattern: 'tt',
  desc: 'Download TikTok video',
  fromMe: false
}, async (bot, mek, m, { args, reply }) => {
  try {
    if (!args[0]) return reply('Send TikTok link');
    const data = await tiktokDownloader(args[0]);
    await bot.sendMessage(mek.key.remoteJid, { video: { url: data.video }, caption: 'TikTok Video' }, { quoted: mek });
  } catch (e) {
    reply('TikTok download failed ❌');
  }
});
