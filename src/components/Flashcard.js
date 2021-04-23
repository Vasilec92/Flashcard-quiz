import React, { useState, useEffect, useRef } from "react";

function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [answers] = useState(
    [...flashcard.incorrect_answers, flashcard.correct_answer].sort(
      () => Math.random() - 0.5
    )
  );

  const frontEl = useRef();
  const backEl = useRef();

  //js for calculate auto height of cards
  /*  
    const [height, setHeight] = useState();
    const setMaxHeight = () => {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight));
  };
  useEffect(() => setMaxHeight, [
    answers,
    flashcard.question,
    flashcard.correct_answer,
  ]);
  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []); */
  const handleClick = () => {
    setFlip(!flip);
  };

  //convert html to normal string
  const decodeString = (str) => {
    const textAria = document.createElement("textarea");
    textAria.innerHTML = str;
    return textAria.value;
  };

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      onClick={handleClick}
      style={{ height: "250px" }}
    >
      <div className="front" ref={frontEl}>
        {decodeString(flashcard.question)}
        <div className="flashcard-options">
          {answers.map((option, idx) => (
            <p className="flashcard-option" key={idx}>
              {option}
            </p>
          ))}
        </div>
      </div>
      <div className="back" ref={backEl}>
        {flashcard.correct_answer}
      </div>
    </div>
  );
}

export default Flashcard;
