import React, { useEffect, useState } from 'react'
import {getRecommendedVideos, getChannelData} from '../api.js'
import MovieList from '../components/MovieList.js';
import './Home.css'
import { Link } from 'react-router-dom';

export default function Home() {
  const [videos, setVideos] = useState([]); 
  const [profileImages, setProfileImages] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);


  // 비디오 데이터 가져오기
  const fetchVideos = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    console.log(`현재 페이지: ${page}`);

    try {
      const data = await getRecommendedVideos(page);
      console.log("새로 받아온 데이터:", data.items);

      if (!data || !data.items || data.items.length === 0) {
        setHasMore(false);
        return;


  useEffect(() => {
  
    //충돌시작
//     async function fetchVideos() {
//       try {
//         const data = await getRecommendedVideos(); // 비동기 API 호출
//         setVideos(data.items);  // 데이터가 성공적으로 받아졌을 때 상태 업데이트
        
//         const channelImages = await Promise.all(
//           data.items.map(async (video) => {
//             const channelData = await getChannelData(video.snippet.channelId);
//             console.log(channelData);
//             const profileImage = channelData.items[0]?.snippet?.thumbnails?.default?.url;
            
//             console.log(profileImage);
//             return profileImage || "default_image_url_here";  // 기본 이미지를 반환
//           })
//         );
//         setProfileImages(channelImages);

//         // console.log(data.items);
//         // console.log('프로필',channelImages);

//       } catch (error) {
//         console.error("API 요청 중 오류 발생:", error);
//         setError("비디오를 불러오는 데 오류가 발생했습니다."); // 에러 메시지 상태 업데이트
//      }
   // 충돌종료

      // 새롭게 불러온 데이터를 기존 데이터에 추가 (중복 제거)
      setVideos((prevVideos) => [
        ...prevVideos,
        ...data.items.filter((video) => !prevVideos.some((prev) => prev.id === video.id))
      ]);

      const channelImages = await Promise.all(
        data.items.map(async (video) => {
          const profileImage = await getChannelData(video.snippet.channelId);
          return profileImage || "default_image_url_here";
        })
      );

      setProfileImages((prevImages) => [...prevImages, ...channelImages]);
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  // 페이지가 변경될 때마다 데이터 불러오기
  useEffect(() => {
    fetchVideos();
  }, [page]);

  // IntersectionObserver 설정 (무한 스크롤)
  useEffect(() => {
    if (!hasMore || loading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("바닥 감지됨! 페이지 증가!");
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    const target = document.querySelector("#scroll-anchor");
    if (target) {
      observerRef.current.observe(target);
    }

    return () => observerRef.current && observerRef.current.disconnect();
  }, [hasMore, loading]);

  return (
    <div className="video-list">
      {videos.length > 0 ? (
        <div className="video-container">
          {videos.map((video, index) => (

            <MovieList 
              key={`${video.id}-${index}`} 
              video={video} 
              profileImage={profileImages[index]} 
              />

          ))}
        </div>
      ) : (
        <p>비디오 로딩 중...</p>
      )}

      {loading && <p>⏳ 로딩 중...</p>}
      {!hasMore && <p>더 이상 불러올 비디오가 없습니다.</p>}

      {/* 바닥 감지용 div */}
      <div id="scroll-anchor" style={{ height: "10px" }}></div>
    </div>
  );
}
