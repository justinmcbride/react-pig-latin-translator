

function translator(english) {
    const vowel = {a:'a', e:'e', i:'i', o:'o', u:'u'}

    let index= 0
    for (index; index < english.length; index++) {
        if (english[index] in vowel) {
            break;
        }  
    }

    const consonants = english.replace(english.substr(index), 'ay')
    const restOfWord = english.substr(index)
    const pigLatin = restOfWord.concat('', consonants)
    console.log(pigLatin)
}

console.log(translator('cheese'))