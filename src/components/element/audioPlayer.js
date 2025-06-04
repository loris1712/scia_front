"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioPlayer = ({ audioSrc, username, dateTime }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("0:00");

  useEffect(() => {
    if (!audioSrc) return;

    // Creazione del player
    const abortController = new AbortController(); // Per gestire l'abort del caricamento
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ffffff",
      progressColor: "#789fd6",
      barWidth: 3,
      barHeight: 1.5,
      cursorWidth: 0,
      height: 40,
      normalize: true,
    });

    wavesurfer.current.load(audioSrc);

    wavesurfer.current.on("ready", () => {
      if (abortController.signal.aborted) return; // Evita operazioni se l'istanza è stata smontata
      setDuration(formatTime(wavesurfer.current.getDuration()));
    });

    wavesurfer.current.on("finish", () => setIsPlaying(false));

    wavesurfer.current.on("error", (err) => {
      console.error("Errore in WaveSurfer:", err);
    });

    return () => {
      abortController.abort(); // Annulla eventuali operazioni in corso
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }
      setIsPlaying(false);
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (!wavesurfer.current || !wavesurfer.current.isReady) return;
    wavesurfer.current.playPause();
    setIsPlaying((prev) => !prev);
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
          <svg width="24" height="24" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24" fill="white">
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </svg>
        )}
      </button>

      <div className="flex-1 mx-4">
        <div ref={waveformRef} className="w-full"></div>
        <div className="flex items-center text-white text-sm gap-4">
          <p className="opacity-60">{duration}</p>
          <p className="ml-auto opacity-60">{new Date(dateTime).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;