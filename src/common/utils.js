export default async function fetchData(amount, category, difficulty) {
  if (amount && category && difficulty) {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    const data = await response.json();
    return data;
  }
  return [];
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