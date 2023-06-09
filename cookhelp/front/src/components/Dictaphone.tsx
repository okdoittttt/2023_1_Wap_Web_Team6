import React, { useEffect } from "react";
import styled from "styled-components";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

const StyledTooltipGroup = styled.div`
  display: flex;
  position: relative;
  > button {
    position: absolute;
    top: -0.5rem;
    left: 6.3rem;
    color: gray;
  }
`;

interface DictaphoneProps {
  goForward: () => void;
  goBack: () => void;
}

const Dictaphone: React.FC<DictaphoneProps> = ({ goForward, goBack }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    findString();
  }, [transcript, listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  let valueFor = transcript.indexOf("다음");
  let valueNext = transcript.indexOf("앞으로");
  let valueBack = transcript.indexOf("이전");
  let valueBk = transcript.indexOf("뒤로");

  const findString = () => {
    if (valueFor != -1 || valueNext != -1) {
      goForward();
      resetTranscript();
    } else if (valueBack != -1 || valueBk != -1) {
      goBack();
      resetTranscript();
    }
  };

  // console.log(transcript);
  // console.log("valueFor : ", valueFor);
  // console.log("valueBack : ", valueBack);

  const tooltipContent = (
    <>
      <div>넘기고 싶다면: "앞으로" 혹은 "다음"</div>
      <div>돌아가고 싶다면: "뒤로" 혹은 "이전"</div>
    </>
  );

  return (
    <div>
      <StyledTooltipGroup>
        <div>Microphone: {listening ? "on" : "off"}</div>
        <Tooltip title={tooltipContent} placement="top-start" arrow>
          <Button>
            <AiOutlineExclamationCircle size="24" />
          </Button>
        </Tooltip>
      </StyledTooltipGroup>
      <button
        onClick={() =>
          SpeechRecognition.startListening({
            continuous: true,
            language: "ko",
          })
        }
      >
        Start
      </button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      {/* <button onClick={resetTranscript}>Reset</button> */}
      <p>{transcript}</p>
    </div>
  );
};
export default Dictaphone;
