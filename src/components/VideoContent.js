import React, { useEffect, useState } from 'react'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { RxDividerVertical } from 'react-icons/rx';
import { PiScissorsLight, PiShareFatLight } from 'react-icons/pi';
import { IoIosMore } from 'react-icons/io';
import { GiSaveArrow } from 'react-icons/gi';
import { CiBookmark } from 'react-icons/ci';
import { formatViews, timeAgo } from '../utils/VideoFunctions.js';

export default function VideoContent({video,channel}) {
    const [descriptionIsHidden,setDesciptionHidden] = useState(true);
  return (
    <div><div className='video_player'>
    <iframe id="ytplayer" type="text/html" width="1500" height="1000" title='test'
src={`https://www.youtube.com/embed/${video.id}?autoplay=1&origin=http://example.com`}
frameborder="0"/>
    </div>

  {/* 타이틀 */}
  <div className='video_title'>
  <h3>{video.snippet?.localized?.title}</h3>
  </div>
  <div className='video_detail'>
      {/* 채널명 > 구독, 좋아요, 공유, 더보기 */}
      <div className='channel_detail'>
        <div className='channel_info'>
          <div className='channel_logo'>
                <img src={channel.snippet?.thumbnails?.default?.url} alt='channel_image'/>
            </div>
            <div className='channel_description'>
                <span className='channel_title'>{channel.snippet?.title}</span>
                <span className='channel_subscription_count'>구독자 {channel.statistics?.subscriberCount}</span>
            </div>
        </div>
          <div className='channel_subscription'>
            <button>구독</button>
          </div>
      </div>
      <div className='video_function'>
        <div className='video_likes'>
            <AiOutlineLike/>
            {formatViews(video.statistics?.likeCount)}
            <RxDividerVertical/>
            <AiOutlineDislike/>
        </div>
        <div><PiShareFatLight/>공유</div>
        {/* 화면에 따라 숨겨야 할것 */}
        <div className='hide_first'><GiSaveArrow/>오프라인 저장</div>
        <div className='hide_first'><PiScissorsLight/>클립</div>
        <div className='hide_last'><CiBookmark/>저장</div>
        <div className="hide_last"><IoIosMore/></div>
      </div>

  </div>
  {/* 설명 */}
  <div className='video_description'>
  <div className='video_description_header'>
  <span>조회수 {(formatViews(video.statistics?.viewCount))}</span>
  <span>{timeAgo(video.snippet?.publishedAt)}</span>
  </div>
    <div className={`video_description_content ${descriptionIsHidden && "hidden"}`}>
    {video.snippet?.description.split('\n').map((line, index) => (
<React.Fragment key={index}>
  {line}
  <br />
</React.Fragment>
))}
    </div>

  <button className="video_description_toggle"onClick={()=>{setDesciptionHidden((prev)=>!prev)}}>{descriptionIsHidden ? "더보기" : "간략히"}</button>
  </div></div>
  )
}
