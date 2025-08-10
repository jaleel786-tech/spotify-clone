import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

// Create the context
export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(null);
  const SeekBg = useRef();
  const SeekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlaystatus] = useState(false);

  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0
    },
    totalTime: {
      second: 0,
      minute: 0
    }
  });

  const play = () => {
    audioRef.current?.play();
    setPlaystatus(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlaystatus(false);
  };

  const playWithId = async(id) =>{
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlaystatus(true);

  }

  const previous = async ()=>{
    if(track.id>0){
        await setTrack(songsData[track.id-1]);
        await audioRef.current.play();
        setPlaystatus(true);
    }
  }
  const next = async ()=>{
    if(track.id< songsData.length-1){
        await setTrack(songsData[track.id+1]);
        await audioRef.current.play();
        setPlaystatus(true);
    }
  }

  const seekSong = async(e) =>{
    audioRef.current.currentTime =((e.nativeEvent.offsetX / SeekBg.current.offsetWidth)*audioRef.current.duration)


  }


  useEffect(() => {
    if (!audioRef.current) return;

    // Update time whenever audio plays
    audioRef.current.ontimeupdate = () => {
      setTime({
        currentTime: {
          second: Math.floor(audioRef.current.currentTime % 60),
          minute: Math.floor(audioRef.current.currentTime / 60)
        },
        totalTime: {
          second: Math.floor(audioRef.current.duration % 60) || 0,
          minute: Math.floor(audioRef.current.duration / 60) || 0
        }
      });

      // Update seek bar width
      if (SeekBar.current && SeekBg.current && audioRef.current.duration) {
        const progress =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        SeekBar.current.style.width = `${progress}%`;
      }
    };
  }, []);

  const contextValue = {
    audioRef,
    SeekBar,
    SeekBg,
    track,
    setTrack,
    playStatus,
    setPlaystatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
