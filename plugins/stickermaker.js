const { createSticker } = require('../lib/sticker');

cmd({
  pattern: 'str',
  desc: 'Create sticker from image',
  fromMe: false
}, async (bot, mek, m, { reply }) => {
  try {
    const buffer = await downloadMediaMessage(mek); // bot/lib/msg.js එකේ function use කරන්න
    const sticker = await createSticker(buffer);
    await bot.sendMessage(mek.key.remoteJid, { sticker }, { quoted: mek });
  } catch (e) {
    reply('Sticker creation failed ❌');
  }
});
