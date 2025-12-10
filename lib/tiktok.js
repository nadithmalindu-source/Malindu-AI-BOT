const axios = require('axios');

async function tiktokDownloader(url) {
  try {
    const api = `https://api.akuari.my.id/api/tiktok?url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(api);
    if (data && data.status === 'success') {
      return {
        video: data.result.nowm,    // No watermark
        videoWM: data.result.wm,    // With watermark
        audio: data.result.audio
      };
    } else {
      throw new Error('Failed to fetch TikTok video');
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { tiktokDownloader };
