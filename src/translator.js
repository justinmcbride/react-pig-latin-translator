export default function translator(word) {
    const vowel = {a:'a', e:'e', i:'i', o:'o', u:'u'}

    let index= 0
    let hasVowel = 0

    for (index; index < word.length; index++) {
        if (word[index] in vowel) {
            hasVowel = 1
            break;
        }
    }
    if (hasVowel === 0) {
      let index2 = 0
      for (index2; index2 < word.length; index2++) {
        if (word[index2] === 'y') {
          index=index2
          break
        }
      }
    }

    if (word) {
        const consonants = word.replace(word.substr(index), 'ay')
        const restOfWord = word.substr(index)
        const pigLatin = restOfWord.concat('', consonants)
        console.log(pigLatin)
        return pigLatin
    }
    console.log("index", index)
    
}

// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// readline.question('Enter an English word or phrase: ', word => {
//   console.log("Pig Latin:", translator(word));
//   readline.close();
// });

