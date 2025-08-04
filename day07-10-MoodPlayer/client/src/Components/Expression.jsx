import React, { useRef, useEffect } from 'react';
import * as faceapi from '@vladmandic/face-api';
import axios from 'axios';

const ExpressionDetector = (props) => {
  const [songs,setSongs]=props.songs;
  const [mood,setMood] =props.mood;
  const videoRef = useRef();
  const modelsLoadedRef = useRef(false);
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      modelsLoadedRef.current = true;
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current.srcObject = stream;
      });
    };

    loadModels();
  }, []);

  const handleDetectMood = async () => {
    if (!modelsLoadedRef.current) {
      console.warn('Models not loaded yet');
      return;
    }

    const video = videoRef.current;
    if (!video || video.readyState < 2) {
      console.warn('Video not ready');
      return;
    }

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const moods = Object.entries(expressions).reduce((a, b) =>
        a[1] > b[1] ? a : b
      );

      
      if(moods[0]){
        setMood(moods[0]);
        axios.get(`http://localhost:3000/songs?mood=${moods[0]}`)
        .then(response=>setSongs(response.data.songs));
    }

    } else {
      console.log('No face detected');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center p-10'>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="350"
        height="350"
        style={{ borderRadius: 8 }}
      />
      <br />
      <button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={handleDetectMood}>Get Mood</button>
    </div>
  );
};




export default ExpressionDetector;