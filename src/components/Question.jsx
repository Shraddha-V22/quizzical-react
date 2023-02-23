import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { decode } from "html-entities";

export default function Question({
  question,
  options,
  handleChange,
  showAns,
  setUserScore,
}) {
  const [quizUnit, setQuizUnit] = useState(options);

  function handleChange(id) {
    setQuizUnit((opts) =>
      opts.map((opt) => {
        return opt.id === id
          ? { ...opt, selected: !opt.selected }
          : { ...opt, selected: false };
      })
    );
  }

  return (
    <div className="m-4 mx-auto flex max-w-[600px] flex-col gap-4 border-b-[1px] border-lightestBlue pb-4">
      <h1 className="text-2xl font-bold text-darkBlue">{decode(question)}</h1>
      <ul className="flex flex-wrap items-center gap-4">
        {quizUnit.map((ans) => (
          <QuestionOpt
            key={ans.id}
            question={question}
            opts={ans}
            handleChange={handleChange}
            showAns={showAns}
            setUserScore={setUserScore}
          />
        ))}
      </ul>
    </div>
  );
}

function QuestionOpt({ opts, question, handleChange, showAns, setUserScore }) {
  const { id, option, selected, isRightAns } = opts;

  useEffect(() => {
    if (isRightAns && selected) {
      setUserScore((prev) => prev + 1);
    }
  }, [showAns]);

  const classNames = () => {
    if (showAns) {
      if (isRightAns) {
        return "border-none bg-successGreen opacity";
      } else if (!isRightAns && selected) {
        return "border-none bg-errorRed opacity-70";
      } else {
        return "transparent border-[1px] border-darkBlue opacity-70";
      }
    } else {
      return selected
        ? "border-none bg-lightestBlue"
        : "transparent border-[1px] border-darkBlue";
    }
  };

  return (
    <li className={`${classNames()} rounded-xl px-4 pb-1`}>
      <label htmlFor={id} className="hover:cursor-pointer">
        {decode(option)}
      </label>
      <input
        type="radio"
        name={question}
        id={id}
        className={`hidden`}
        onChange={() => handleChange(id)}
        checked={selected}
        disabled={showAns}
      />
    </li>
  );
}
