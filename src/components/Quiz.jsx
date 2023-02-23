import { nanoid } from "nanoid";
import React from "react";
import { useState } from "react";
import { shuffleArray } from "../common/utils";
import ButtonPrimary from "./ButtonPrimary";
import Question from "./Question";

export default function Quiz({ data, setStartQuiz }) {
  const [showAns, setShowAns] = useState(false);
  const [userScore, setUserScore] = useState(0);

  const questions = data.map((datum) => {
    const { question, correct_answer, incorrect_answers } = datum;
    const options = shuffleArray([correct_answer, ...incorrect_answers]);

    const questionOpts = options.map((opt) => ({
      id: nanoid(),
      option: opt,
      isRightAns: opt === correct_answer ? true : false,
      selected: false,
    }));

    return {
      question,
      options: questionOpts,
      correct_answer,
    };
  });
  console.log(userScore);

  return (
    <div className="z-10 w-screen py-12 px-4">
      {questions.map((unit) => {
        return (
          <Question
            key={unit.question}
            question={unit.question}
            options={unit.options}
            showAns={showAns}
            setUserScore={setUserScore}
          />
        );
      })}
      {!showAns ? (
        <div className="mt-8 flex justify-center">
          <ButtonPrimary onClick={() => setShowAns(true)}>
            Check Answers
          </ButtonPrimary>
        </div>
      ) : (
        <div className="mt-8 flex items-center justify-center gap-4">
          <p className="text-xl font-bold">
            You scored {userScore}/{questions.length} correct answers
          </p>
          <ButtonPrimary onClick={() => setStartQuiz(false)}>
            Play Again
          </ButtonPrimary>
        </div>
      )}
    </div>
  );
}
