"use client";

import { useEffect, useRef, useState } from "react";

const AudioPlayer = ({ audioSrc, username, dateTime }) => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [progress, setProgress] = useState(0); // da 0 a 1

  // Carica e decodifica audio per dati onda
  useEffect(() => {
    if (!audioSrc) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    fetch(audioSrc)
      .then(res => res.arrayBuffer())
      .then(buffer => audioContext.decodeAudioData(buffer))
      .then(decoded => {
        setAudioBuffer(decoded);
        setDuration(formatTime(decoded.duration));
      })
      .catch(console.error);

    return () => {
      audioContext.close();
    };
  }, [audioSrc]);

  // Disegna waveform con progress
  useEffect(() => {
    if (!audioBuffer) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;

    const channelData = audioBuffer.getChannelData(0);
    const step = Math.ceil(channelData.length / width);

    // Funzione per disegnare parte wave
    const drawWave = (color, startX, endX) => {
      ctx.fillStyle = color;
      ctx.beginPath();

      for (let x = startX; x < endX; x++) {
        let min = 1.0;
        let max = -1.0;

        for (let j = 0; j < step; j++) {
          const sample = channelData[x * step + j];
          if (sample < min) min = sample;
          if (sample > max) max = sample;
        }

        const yMax = (1 + max) * 0.5 * height;
        const yMin = (1 + min) * 0.5 * height;

        ctx.moveTo(x, yMax);
        ctx.lineTo(x, yMin);
      }

      ctx.stroke();
    };

    ctx.clearRect(0, 0, width, height);

    // Disegna onda già riprodotta
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#789fd6"; // colore progress
    drawWave(ctx.strokeStyle, 0, Math.floor(progress * width));

    // Disegna onda rimanente
    ctx.strokeStyle = "#ffffff";
    drawWave(ctx.strokeStyle, Math.floor(progress * width), width);
  }, [audioBuffer, progress]);

  // Aggiorna progresso su timeupdate
  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const onTimeUpdate = () => {
      setProgress(audioEl.currentTime / audioEl.duration);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audioEl.addEventListener("timeupdate", onTimeUpdate);
    audioEl.addEventListener("ended", onEnded);

    return () => {
      if (audioEl) {
        audioEl.removeEventListener("timeupdate", onTimeUpdate);
        audioEl.removeEventListener("ended", onEnded);
      }
    };
  }, []);

  // Clic sul canvas per saltare nella wave
  const onWaveformClick = (e) => {
    if (!audioRef.current || !audioBuffer) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = clickX / rect.width;

    const newTime = audioBuffer.duration * clickRatio;
    audioRef.current.currentTime = newTime;
    setProgress(clickRatio);

    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === Infinity) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex items-center w-full">
      <div className="w-12 h-12 flex items-center justify-center bg-[#789fd6] rounded-full text-white text-lg font-bold">
        {username}
      </div>

      <button onClick={togglePlay} className="p-2 bg-transparent border-none cursor-pointer ml-2">
        {isPlaying ? (
          <svg width="24" height="24" fill="white" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"/>
          </svg>
        ) : (
          <svg width="24" height="24" fill="white" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </svg>
        )}
      </button>

      <div className="flex-1 mx-4">
        <canvas
          ref={canvasRef}
          width={600}
          height={40}
          style={{ width: "100%", height: 40, backgroundColor: "transparent", cursor: "pointer" }}
          onClick={onWaveformClick}
        />
        <div className="flex items-center justify-between text-white text-sm mt-1">
          <p className="opacity-60">{duration}</p>
          <p className="opacity-60">{new Date(dateTime).toLocaleString()}</p>
        </div>
      </div>

      <audio ref={audioRef} src={audioSrc} style={{ display: "none" }} />
    </div>
  );
};

export default AudioPlayer;
