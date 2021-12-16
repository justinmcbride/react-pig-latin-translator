const VOWELS = [`a`, `e`, `i`, `o`, `u`, `y`];

const isVowel = (letter) => {
  return VOWELS.some(actualVowel => actualVowel === letter.toLowerCase());
};

const isUpperCase = (letter) => {
  return letter === letter.toUpperCase();
};

const isLowerCase = (letter) => {
  return letter === letter.toLowerCase();
};

const englishToPigLatin = (word) => {
  word = word.trim();
  if (word.length === 0) return ``;

  let translatedWordStem = ``;
  let suffix = ``;

  if (word[0] !== `y` && isVowel(word[0])) {
    translatedWordStem = word;
    suffix = `yay`;
  }
  else {
    let hasAnyVowels = false;
    for (let i = 0; i < word.length; i++) {
      if (i === 0) continue;
      const currentLetter = word[i];
      if (isVowel(currentLetter)) {
        const consonants = word.substr(0, i);
        const remainderOfWord = word.substr(i);
        translatedWordStem = `${remainderOfWord}${consonants}`;
        suffix = `ay`;
        hasAnyVowels = true;
        break;
      }
      else {
        continue;
      }
    }
    if (!hasAnyVowels) {
      translatedWordStem = word;
      suffix = `ay`;
    }
  }

  if (isUpperCase(word)) {
    translatedWordStem = translatedWordStem.toUpperCase();
    suffix = suffix.toUpperCase();
  }
  else {
    const isFirstLetterCapital = isUpperCase(word[0]);
    const remainderOfWord = word.substr(1);
    const remainderLowerCase = (remainderOfWord.length > 0 && isLowerCase(remainderOfWord));
    if (isFirstLetterCapital && remainderLowerCase) {
      translatedWordStem = translatedWordStem[0].toUpperCase() + translatedWordStem.substring(1).toLowerCase();
    }
  }

  return `${translatedWordStem}${suffix}`;
}

export default englishToPigLatin;
