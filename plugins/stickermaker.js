const fs = require('fs');
const path = require('path');
const { cmd } = require('../command'); // Make sure this path is correct
const { downloadMediaMessage } = require('../lib/msg');

cmd({
    pattern: 'sticker',
    desc: 'Convert image/video to sticker',
    category: "creative",
    filename: __filename,
    fromMe: false
}, async (bot, mek, m, { from, quoted, reply }) => {
    try {
        let mediaMessage = mek.message?.imageMessage || mek.message?.videoMessage;
        if (!mediaMessage && quoted) {
            mediaMessage = quoted.message?.imageMessage || quoted.message?.videoMessage;
        }

        if (!mediaMessage) return reply('❌ Please send or reply to an image/video to convert into sticker.');

        const buffer = await downloadMediaMessage(bot, mediaMessage);
        if (!buffer) return reply('❌ Failed to download media.');

        const tmpFile = path.join(__dirname, `../tmp/${Date.now()}.webp`);
        fs.writeFileSync(tmpFile, buffer);

        await bot.sendMessage(from, { sticker: { url: tmpFile } });
        fs.unlinkSync(tmpFile);
    } catch (err) {
        console.error('Sticker Plugin Error:', err);
        reply('❌ Failed to create sticker.');
    }
});
