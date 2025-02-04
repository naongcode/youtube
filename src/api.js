import 'dotenv/config'
import fetch from 'node-fetch';

//API_KEY
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// 추천 영상 가져오는 함수
async function getRecommendedVideos() {
    const url = "https://www.googleapis.com/youtube/v3/videos";
    const params = new URLSearchParams({
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "KR",
        maxResults: 10,
        key: YOUTUBE_API_KEY
    });

    try {
        const response = await fetch(`${url}?${params}`);
        const data = await response.json();

        data.items.forEach(item => {
            console.log(`▶ ${item.snippet.title} (https://www.youtube.com/watch?v=${item.id})`);
        });
    } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
    }
}

// 실행
getRecommendedVideos();