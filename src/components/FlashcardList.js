import React from "react";
import Flashcard from "./Flashcard";

function FlashcardList({ flashcards }) {
  console.log(flashcards);
  return (
    <div className="card-grid">
      {flashcards.map((f, idx) => (
        <Flashcard flashcard={f} key={idx} />
      ))}
    </div>
  );
}

export default FlashcardList;
