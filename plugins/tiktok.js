const axios = require('axios');
const { cmd } = require('../command'); // Make sure path is correct

cmd({
    pattern: 'tiktok',
    desc: 'Download TikTok video without watermark',
    category: "download",
    filename: __filename,
    fromMe: false
}, async (bot, mek, m, { from, quoted, body, q, reply }) => {
    try {
        const url = q || (quoted && quoted.text);
        if (!url || !url.includes('tiktok.com')) return reply('❌ Please provide a valid TikTok video URL.');

        // Example API for TikTok download (replace with your working API)
        const res = await axios.get(`https://api.tiktokdownloader.xyz/api/download?url=${encodeURIComponent(url)}`);
        const data = res.data;

        if (!data || !data.video_no_watermark) return reply('❌ Failed to fetch TikTok video.');

        await bot.sendMessage(from, { video: { url: data.video_no_watermark }, caption: '✅ Here is your TikTok video!' });
    } catch (err) {
        console.error('TikTok Plugin Error:', err);
        reply('❌ Failed to download TikTok video.');
    }
});
