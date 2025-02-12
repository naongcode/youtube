import React from 'react'
import './MovieList.css'
import { formatViews, timeAgo } from '../utils/VideoFunctions.js'

export default function MovieList({ video, profileImage }) {
  // 시간 변환 함수


  return (
    <div key={video.id} className="video-item">

      {/* 썸네일 */}
      <div className='video-thumbnail'>
        <img src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}></img>
      </div>

      <div className='video-information'>
        {/* 프로필 이미지 */}
        <div className='video-channelImage'>
          <img src={profileImage}
            alt="Profile"></img>
        </div>

        <div className='video-channelInfo'>
          {/* 제목 */}
          <div className='video-title'>{video.snippet.title}</div>

          {/* 채널명 */}
          <div className='video-channel'>{video.snippet.channelTitle}</div>

          {/* 조회수, 시간 */}
          <div className='video-count'>
            {formatViews(video.statistics.viewCount)}
            ·{timeAgo(video.snippet.publishedAt)}
          </div>

        </div>

      </div>

    </div>

  )
}
