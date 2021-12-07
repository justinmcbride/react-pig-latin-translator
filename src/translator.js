function translator(english) {
    const vowel = {a:'a', e:'e', i:'i', o:'o', u:'u'}

    let index= 0
    let hasVowel = 0
    for (index; index < english.length; index++) {
        if (english[index] in vowel) {
            hasVowel = 1
            break;
        }
    }
    if (hasVowel == 0) {
      let index2 = 0
      for (index2; index2 < english.length; index2++) {
        if (english[index2] == 'y') {
          index=index2
          break
        }
      }
    }
    const consonants = english.replace(english.substr(index), 'ay')
    const restOfWord = english.substr(index)
    const pigLatin = restOfWord.concat('', consonants)
    return pigLatin
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter an English word or phrase: ', word => {
  console.log("Pig Latin:", translator(word));
  readline.close();
});
