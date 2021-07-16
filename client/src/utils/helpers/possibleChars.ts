export default function getAllPossibleChars() {
  const chars = [] as string[];
  for (let i = 33; i < 127; i++) {
    chars.push(String.fromCharCode(i));
  }
  return chars;
}
