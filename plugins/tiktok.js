// plugins/tiktok.js

export default {
    name: 'tiktok',
    description: 'Download TikTok videos',
    async execute(bot, mek, m, { from, quoted, body, q, reply, sendVideo }) {
        try {
            if (!q) return reply('TikTok link ekak denna');

            // TikTok API call
            const res = await fetch(`https://tikwm.com/api?url=${q}`);
            const data = await res.json();

            if (!data.video_no_watermark) return reply('Video eka ganna behe 😢');

            // Video send karanna
            await sendVideo(from, data.video_no_watermark, { caption: 'TikTok video 🎬' });
        } catch (err) {
            console.error(err);
            reply('TikTok download karanna bari 😔');
        }
    }
};
