// VideoDetail.js
import React, { useEffect, useState } from 'react';
import { getChannelData, getCommentData, getVideoData } from '../api.js';
import './VideoDetail.css';
import { useParams } from 'react-router-dom';
import VideoContent from '../components/VideoContent.js';
import CommentList from '../components/CommentList.js'; // CommentList 컴포넌트 임포트
import Navbar from '../components/Nav.js';
import RelatedVideos from '../components/RelatedVideos.js';

export default function VideoDetail() {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState();

  useEffect(() => {
    async function fetchComments() {
      try {
        const data = await getCommentData(videoId); // 비동기 API 호출
        setCommentList(data.items || []);
      } catch (error) {
        // 에러 처리
      }
    }
    async function fetchVideos() {
      try {
        const data = await getVideoData(videoId); // 비동기 API 호출
        setVideoData(data.items[0]);
        setCategories(data.items[0].snippet?.tags.slice(0, 7));
        setActiveCategory(data.items[0].snippet?.tags[0]);
        fetchChannel(data.items[0].snippet?.channelId);
      } catch (error) {}
    }
    async function fetchChannel(channelId) {
      try {
        const data = await getChannelData(channelId); // 비동기 API 호출
        setChannelData(data.items[0]);
      } catch (error) {}
    }
    fetchVideos();
    fetchVideos();
    fetchComments();
  }, [videoId]);

  return (
    <div className='video_container'>
      {/* 왼쪽 */}
      <div className='video_section'>
        <VideoContent video={videoData} channel={channelData} />
        <CommentList commentList={commentList} />
      </div>
      <div className='related_section'>
        <Navbar
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <RelatedVideos originVideoId={videoId} tag={activeCategory} />
      </div>
    </div>
  );
}
