import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

import * as Recognition from "react-speech-recognition";
import { useClickAway } from "react-use";

export const Dictophone = ({setText}:{setText:(value:string)=> void}) => {
  const ref = useRef<HTMLImageElement>(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript
  } = Recognition.useSpeechRecognition();
  useEffect(() => {
      setText(transcript)
  }, [transcript])
  useClickAway(ref, () => Recognition.default.stopListening());

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }

  const start = () => {
    Recognition.default.startListening({
      continuous: true,
      language: "pt-BR"
    });
  };  



  return (
<div>
      <div className="w-8 h-full relative hidden sm:flex ">
        <Image
          src="/voice.svg"
          height={16}
          width={16}
          ref={ref}
          className="cursor-pointer"
          style={listening ? { opacity:0.5 } : {}}
          onClick={!listening ? start : Recognition.default.stopListening}
          alt=""
        />
      </div>
    </div>
  );
};