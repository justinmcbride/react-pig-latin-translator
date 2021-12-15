const VOWELS = ['a', 'e', 'i', 'o', 'u'];

const isVowel = (letter) => {
  return VOWELS.some(actualVowel => actualVowel === letter);
};

const englishToPigLatin = (word) => {
  if (word.length === 0) return ``;
  let translatedWordStem = ``;
  let suffix = ``;

  if (word.length === 1) {
    translatedWordStem = word;
    if (isVowel(word[0])) {
      suffix = `yay`;
    }
    else {
      suffix = `ay`;
    }
  }
  else if (isVowel(word[0])) {
    translatedWordStem = word;
    suffix = `yay`;
  }
  else {
    let hasAnyVowels = false;
    for (let i in word) {
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

  return `${translatedWordStem}${suffix}`;
}

export default englishToPigLatin;
