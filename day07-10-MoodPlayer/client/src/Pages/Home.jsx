import Song from '../Components/Song';
import {RiProjectorFill} from "@remixicon/react";
import ExpressionDetector from '../Components/Expression';
import { useState } from 'react';
import SongsList from '../Components/SongsList';

const Home = () => {
  const [songs,setSongs]=useState([]);
  const [mood,setMood]=useState();
  return (
    <>
      <div className='h-20 bg-gray-800 text-3xl box-border p-5 font-bold'><span className='flex items-center gap-4  '>
        <RiProjectorFill /> Mood Player</span>
      </div>
      <div className='flex flex-col items-center justify-center p-10 gap-0'>
        <div className='flex items-center justify-center '>
          <ExpressionDetector songs={[songs,setSongs]} mood={[mood,setMood]}/>
          <div className='flex items-center justify-start flex-col h-[350px] py-5'>
            {mood && <p className='w-full text-start'>Current Mood: {mood.toUpperCase()} </p>}
            <Song songs={[songs,setSongs]}/>
          </div>
        </div>
        <SongsList songs={[songs]}/>
      </div>
    </>
  )
}

export default Home;