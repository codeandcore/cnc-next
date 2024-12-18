import React, { useEffect, useState, useRef } from 'react';
import Sound from '../public/images/sound.svg';
import Pause from '../public/images/pause.svg';
import Pause1 from '../public/images/pause1.svg';
import Image from 'next/image';

const Visionvideo = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef(null); 
  const playerRef = useRef(null);

  useEffect(() => {
    const onPlayerReady = (event) => {
      event.target.mute(); 
      event.target.playVideo();
    };

    const onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player(iframeRef.current, {
        videoId: 'mq55jlunseI',
        events: {
          onReady: onPlayerReady,
        },
      });
      playerRef.current = player; 
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }
  }, []);

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute(); 
      } else {
        playerRef.current.mute(); 
      }
      setIsMuted(!isMuted); 
    }
  };

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo(); 
      } else {
        playerRef.current.playVideo(); 
      }
      setIsPlaying(!isPlaying); 
    }
  };

  return (
    <div className='vision_video'>
      <div id="player">
        <iframe
          ref={iframeRef}
          src="https://www.youtube.com/embed/mq55jlunseI?enablejsapi=1&autoplay=1&controls=0&mute=1&loop=1&playlist=mq55jlunseI" 
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Vision Video"
        ></iframe>
      </div>
      <span 
        className={`music ${isMuted ? 'mutevideo' : ''}`} 
        onClick={toggleMute}
      >
        <Image 
                width={85}  
                height={85}  src={Sound} alt="Sound Toggle" />
      </span>
      <span className='play_pause' onClick={togglePlayPause} >
        <Image 
                width={70}  
                height={70}  src={isPlaying ? Pause : Pause1 } alt="Play/Pause" />
      </span>
    </div>
  );
};

export default Visionvideo;
