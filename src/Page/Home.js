import React, { useEffect, useState } from 'react'
import {getRecommendedVideos, getChannelData} from '../api.js'
import MovieList from '../components/MovieList.js';
import './Home.css'

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

  return (
    <div classname="video-list">
      {error && <p>{error}</p>} {/* 에러 메시지가 있을 때 출력 */}

      {/* 컨테이너 안에 컴포넌트 출력 */}
      {videos.length > 0 ? (
        <div className="video-container">
          {videos.map((video, index) => (

            <MovieList
              key={video.id}
              video={video}
              profileImage={profileImages[index]}
              />

          ))}
        </div>
      ) : (
        <p>비디오 로딩 중...</p>  // 비디오가 로딩 중일 때 표시할 문구
      )}
    </div>
  )
}
