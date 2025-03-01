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

const englishToPigLatin = (originalWord) => {
  // assumptions: 
  // - input is a string
  // - input is a single word
  // - input is trimmed of whitespace
  // - input is not empty

  let suffix = ``;
  let leadingConsonants = ``;
  let trailingEnd = ``;

  // check to see if the first letter is a vowel.
  // note that we `y` is not considered a vowel when it's the first letter.
  // when the word starts with a vowel, we simply add `yay` to the end.
  if (isVowel(originalWord[0]) && originalWord[0] !== `y`) {
    leadingConsonants = ``;
    trailingEnd = originalWord;
    suffix = `yay`;
  }
  else {
    let hasAnyVowels = false;
    // iterate over all the letters, but skip the first, because we checked it already above.
    // we're looking for the first vowel, and then we'll move the consonants (which appear before the vowel) to the end of the word.
    for (let i = 1; i < originalWord.length; i++) {
      const currentLetter = originalWord[i];
      if (!isVowel(currentLetter)) {
        continue;
      }

      leadingConsonants = originalWord.substr(0, i);
      trailingEnd = originalWord.substr(i);
      suffix = `ay`;

      hasAnyVowels = true;
      break;
    }

    // edge case: if we didn't find any vowels, then we'll just add `ay` to the end of the word.
    // it's pretty rare that this would happen, but it's possible: https://en.wikipedia.org/wiki/English_words_without_vowels
    if (!hasAnyVowels) {
      leadingConsonants = ``;
      trailingEnd = originalWord;
      suffix = `ay`;
    }
  }

  let translatedWord = `${trailingEnd}${leadingConsonants}${suffix}`;

  // let's add some special handling for capitalization.
  // if the original word is all uppercase, then we'll make the translated word all uppercase.
  if (isUpperCase(originalWord)) {
    translatedWord = translatedWord.toUpperCase();
    suffix = suffix.toUpperCase();
  }
  // then we'll check for the first letter being capitalized. otherwise we don't really care.
  else {
    const isFirstLetterCapital = isUpperCase(originalWord[0]);
    const remainderOfWord = originalWord.substr(1);
    const remainderLowerCase = (remainderOfWord.length > 0 && isLowerCase(remainderOfWord));
    if (isFirstLetterCapital && remainderLowerCase) {
      translatedWord = translatedWord[0].toUpperCase() + translatedWord.substring(1).toLowerCase();
    }
  }

  return {
    leadingConsonants,
    trailingEnd,
    suffix,
    translatedWord,
  }
}

export default englishToPigLatin;
