export default async function fetchData(amount, category, difficulty) {
  let url;
  if (category && difficulty) {
    url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  } else {
    url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export function shuffleArray(array) {
  // create a copy of the array so that the original array is not mutated
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
