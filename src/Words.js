export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const staticWords = ["apple", "grape", "mango", "peach", "berry"]; // Static words

export const generateWordSet = () => {
  let wordSet = new Set(staticWords); // Use only static words

  // Function to safely get last index from localStorage
  const getLastIndex = () => {
    if (typeof window !== "undefined" && localStorage.getItem("lastWordIndex")) {
      const index = parseInt(localStorage.getItem("lastWordIndex"), 10);
      return isNaN(index) ? 0 : index; // Ensure it's always a valid number
    }
    return 0;
  };

  // Cycle through words in round-robin fashion
  const lastIndex = getLastIndex();
  const newIndex = (lastIndex + 1) % staticWords.length; // Cycle 0-4
  const todaysWord = staticWords[newIndex]; // Pick word from static array

  // Store the new index in localStorage (only if window exists)
  if (typeof window !== "undefined") {
    localStorage.setItem("lastWordIndex", newIndex.toString()); // Store as string
  }

  return { wordSet, todaysWord };
};
  