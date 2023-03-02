import { useState } from "react";
import "./App.css";
import { categories } from "./common/data";
import fetchData from "./common/utils";
import ButtonPrimary from "./components/ButtonPrimary";
import Quiz from "./components/Quiz";
import blobYellow from "./assets/blobs.svg";
import blobBlue from "./assets/blobs1.svg";

function App() {
  const [userInput, setUserInput] = useState({
    amount: "",
    category: "",
    difficulty: "",
  });
  const [questionData, setQuestionData] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);

  const options = Object.keys(categories).map((opt) => {
    return (
      <option key={opt} value={opt}>
        {categories[opt]}
      </option>
    );
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUserInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function formSubmitHandler(event) {
    event.preventDefault();
    console.log(userInput);
    const data = await fetchData(
      userInput.amount,
      userInput.category,
      userInput.difficulty
    );
    setQuestionData(data.results);
    setStartQuiz(true);
  }

  return (
    <div className="relative z-10 grid h-screen w-screen place-items-center">
      <img src={blobYellow} alt="" className="fixed top-0 right-0 z-0" />
      <img src={blobBlue} alt="" className="fixed bottom-0 left-0 z-0" />

      {startQuiz ? (
        <Quiz data={questionData} setStartQuiz={setStartQuiz} />
      ) : (
        <section className="text-center">
          <h1 className="text-[31px] font-[700] text-darkBlue">Quizzical</h1>
          <p className="text-[16px] text-darkBlue">Some description</p>
          <form
            className="mt-2 flex flex-col items-center gap-4"
            onSubmit={formSubmitHandler}
          >
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="No. of Questions"
              className="w-full rounded-lg border-[1px] border-darkBlue p-2 indent-1"
              onChange={handleChange}
              required
            />
            <select
              name="category"
              id="category"
              placeholder="Choose category"
              className="w-full rounded-lg border-[1px] border-darkBlue p-2 indent-1"
              onChange={handleChange}
            >
              <option value="any">Any</option>
              {options}
            </select>
            <select
              name="difficulty"
              id="difficulty"
              placeholder="Choose level of difficulty"
              className="w-full rounded-lg border-[1px] border-darkBlue p-2 indent-1"
              onChange={handleChange}
            >
              <option value="any">Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <ButtonPrimary type="submit">Start Quiz</ButtonPrimary>
          </form>
        </section>
      )}
    </div>
  );
}

export default App;

// https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple
// category - 9 to 32
