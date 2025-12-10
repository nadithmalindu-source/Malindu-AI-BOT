const { cmd } = require('../command');
const { downloadMediaMessage } = require('../lib/msg');
const fs = require('fs');
const path = require('path');

cmd({
    pattern: 'str',
    desc: 'Convert image/video to sticker',
    fromMe: false
}, async (bot, mek, m, { 
    from, quoted, body, isCmd, command, args, q, isGroup, 
    sender, senderNumber, botNumber2, botNumber, pushname, 
    isMe, isOwner, groupMetadata, groupName, participants, 
    groupAdmins, isBotAdmins, isAdmins, reply 
}) => {
    try {
        let mediaMessage = mek.message.imageMessage || mek.message.videoMessage || (quoted ? quoted.message.imageMessage || quoted.message.videoMessage : null);
        if (!mediaMessage) return reply('❌ Please send an image/video to convert into sticker.');

        const buffer = await downloadMediaMessage(bot, mediaMessage);
        const tmpFile = path.join(__dirname, `../tmp/${Date.now()}.webp`);

        fs.writeFileSync(tmpFile, buffer);
        await bot.sendMessage(from, { sticker: { url: tmpFile } });
        fs.unlinkSync(tmpFile);
    } catch (err) {
        console.error('Sticker Plugin Error:', err);
        reply('❌ Failed to create sticker.');
    }
});
