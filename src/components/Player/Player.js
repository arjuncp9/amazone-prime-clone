import React, {useContext, useEffect} from 'react'
import YouTube from 'react-youtube';
import MovieIdContext from '../../Context';
import '../Player/Player.css'


function Player() {
    const {movieId} = useContext(MovieIdContext)
    useEffect(()=>{
        console.log(movieId)
    },[])
   

    const opts = {
        height: '950',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      };
    return (
        <div className="player">
        <YouTube videoId={movieId.key} opts={opts} />
        </div>
  )
}

export default Player
