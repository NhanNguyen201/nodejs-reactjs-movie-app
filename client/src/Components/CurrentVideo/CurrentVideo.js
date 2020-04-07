import React from 'react';
import ReactPlayer from 'react-player';

const CurrentVideo = ({refer, video, volume, isPause, getVideoState}) => {
    const src = `https://www.youtube.com/embed/${video.id.videoId}`;
    return (
        <ReactPlayer 
            ref={refer}
            url={src}
            config={{ youtube: { playerVars: { disablekb: 1 } } }}
            playing={isPause}
            volume={volume}
            frameBorder="0"
            width='95%'
            height='95%'
            onProgress={getVideoState}
        />
    )
}
export default CurrentVideo; 