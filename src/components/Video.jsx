import React, {useRef, useEffect} from 'react'
import findImageUrl from '@/components/utils/findImageUrl'

const Video = (props) => {

  const {video, poster} = props

  return (
    <div className='video'>
        <video classname='video' loop autoPlay playsInline muted width="100%" height="auto" src="/videos/showreel.mp4" />
    </div>
  )
}

export default Video
