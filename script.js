const morseQA = document.querySelectorAll(".morse-question-answer");
const paragraphs = document.querySelectorAll(".show");
const plusIcon = document.querySelectorAll(".open");
const minusIcon = document.querySelectorAll(".close");

for (let i = 0; i < morseQA.length; i++) {
  morseQA[i].addEventListener("click", () => {
    paragraphs[i].classList.toggle("hide");

    if (!paragraphs[i].classList.contains("hide")) {
      // If visible, show the minus icon and hide the plus icon
      plusIcon[i].classList.add("hidden");
      minusIcon[i].classList.remove("hidden");
    } else {
      // If hidden, show the plus icon and hide the minus icon
      minusIcon[i].classList.add("hidden");
      plusIcon[i].classList.remove("hidden");
    }
  });
}

const morseCodeMapping = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
  " ": "/",
};

const textArea = document.querySelector("#textInput");
const morseArea = document.querySelector("#morseOutput");

textArea.addEventListener("input", function () {
  convertToMorseCode(textArea.value);
});

morseArea.addEventListener("input", () => {
  let morseCode = morseArea.value;

  // Validate input characters
  morseCode = morseCode
    .split("")
    .filter((char) => isValidMorseCharacter(char))
    .join("");

  // Update textarea with validated Morse codeinputs
  morseArea.value = morseCode;

  // Convert validated Morse code to text and update textArea
  const decodedText = convertToTextCode(morseCode);
  textArea.value = decodedText;
});

function convertToMorseCode(text) {
  // Split the text into individual characters in a array
  const characters = text.split("");

  /* Map each character, then attach the character 
to the morseCodeMapping object to get the value. 
ex: morseCodeMapping[a] would be ".-"  cause thats the value 
of a in the morseCodeMapping[a] */
  const morseCode = characters
    .map((char) => morseCodeMapping[char] || "")
    .join(" ");

  // Update the Morse code textarea
  morseArea.value = morseCode;
}

const reverseMorseCodeMapping = {};

for (let char in morseCodeMapping) {
  /*Gets the key from the object, 
then when we do morseCodeMapping[char] we return the value of that key*/
  /** side note: since the input is a string 
it works because when retreiving a value
 in bracket notation it needs to be ['a'] in qoutes*/
  const morse = morseCodeMapping[char];

  // We are setting 'morse' as a key in the 'reverseMorseCodeMapping' object.
  // Then, we assign 'char' as the value for that key. This creates a new key-value pair
  // where the Morse code sequence ('morse') is the key and the corresponding character ('char') is the value.
  reverseMorseCodeMapping[morse] = char;
}

function convertToTextCode(morse) {
  //After 3 continious white spaces that when it split
  const words = morse.trim().split("   "); // Split Morse code into words
  const decodedText = words
    .map((word) => {
      const letters = word.split(" "); // Split each word into letters
      console.log(letters);
      return letters.map((letter) => reverseMorseCodeMapping[letter]).join("");
    })
    .join(" ");

  return decodedText;
}

// Example Morse code characters and valid separators
const validMorseCharacters = new Set([".", "-", " "]); // dot, dash, space

// Function to check if a character is valid Morse code
function isValidMorseCharacter(char) {
  return validMorseCharacters.has(char);
}
