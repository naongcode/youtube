import React, { useEffect, useState } from 'react'
import {getRecommendedVideos, getChannelData} from '../api.js'
import MovieList from '../components/MovieList.js';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [profileImages, setProfileImages] = useState([]);

  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    async function fetchVideos() {
      try {
        const data = await getRecommendedVideos(); // 비동기 API 호출
        setVideos(data.items);  // 데이터가 성공적으로 받아졌을 때 상태 업데이트
        
        const channelImages = await Promise.all(
          data.items.map(async (video) => {
            const profileImage = await getChannelData(video.snippet.channelId);
            return profileImage || "default_image_url_here";  // 기본 이미지를 반환
          })
        );
        setProfileImages(channelImages);

        // console.log(data.items);
        // console.log('프로필',channelImages);

      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        setError("비디오를 불러오는 데 오류가 발생했습니다."); // 에러 메시지 상태 업데이트
      }
    }
    fetchVideos();
  }, []);

  // // 시간 변환 함수
  // function timeAgo(publishedAt) {
  //   const now = new Date();
  //   const publishedDate = new Date(publishedAt);
  //   const diffInSeconds = Math.floor((now - publishedDate) / 1000);
  
  //   const timeUnits = [
  //     { unit: "년", seconds: 60 * 60 * 24 * 365 },
  //     { unit: "개월", seconds: 60 * 60 * 24 * 30 },
  //     { unit: "일", seconds: 60 * 60 * 24 },
  //     { unit: "시간", seconds: 60 * 60 },
  //     { unit: "분", seconds: 60 },
  //   ];
  
  //   for (const { unit, seconds } of timeUnits) {
  //     const amount = Math.floor(diffInSeconds / seconds);
  //     if (amount >= 1) {
  //       return `${amount}${unit} 전`;
  //     }
  //   }
  //   return "방금 전";
  // }
  
  // // 숫자 축약 함수
  // function formatViews(views) {
  //   if (views >= 1_000_000_000) {
  //     return (views / 1_000_000_000).toFixed(1) + "억회";
  //   } else if (views >= 1_000_000) {
  //     return (views / 1_000_000).toFixed(1) + "백만회";
  //   } else if (views >= 10_000) {
  //     return (views / 10_000).toFixed(1) + "만회";
  //   } else if (views >= 1_000) {
  //     return (views / 1_000).toFixed(1) + "천회";
  //   } else {
  //     return views + "회";
  //   }
  // }
  

  return (
    <div>Home</div>
  )
}
