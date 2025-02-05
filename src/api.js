// import 'dotenv/config'
// import fetch from 'node-fetch';

//API_KEY
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

// 추천 영상 가져오는 함수
export async function getRecommendedVideos() {
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

        // data.items.forEach(item => {
        //     console.log(`▶ ${item.snippet.title} (https://www.youtube.com/watch?v=${item.id})`);
        // });

        return data;

    } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        throw error;
    }
}

// 호출 및 처리
// getRecommendedVideos()
//   .then(data => {
//     console.log("비디오 데이터:", data);
//   })
//   .catch(error => {
//     console.error("오류가 발생했습니다:", error);
//   });

// 채널 정보 가져오기 (프로필 이미지 포함)
export async function getChannelData(channelId) {
    const url = "https://www.googleapis.com/youtube/v3/channels";
    const params = new URLSearchParams({
        part: "snippet",
        id: channelId,
        key: YOUTUBE_API_KEY
    });

    try {
        const response = await fetch(`${url}?${params}`);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            return data.items[0].snippet.thumbnails.default.url;
        }
    } catch (error) {
        console.error("채널 정보 가져오기 중 오류 발생:", error);
    }
}