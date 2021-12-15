import englishToPigLatin from './translator';

test(`translate handles empty`, () => {
  expect(englishToPigLatin(``)).toBe(``);
  expect(englishToPigLatin(` `)).toBe(` `);
});

test(`translate handles empty`, () => {
  expect(englishToPigLatin(``)).toBe(``);
});

// expect(englishToPigLatin(``)).toBe(``);

test(`translate handles vowels at beginning`, () => {
  expect(englishToPigLatin(`a`)).toBe(`ayay`);
  expect(englishToPigLatin(`e`)).toBe(`eyay`);
  expect(englishToPigLatin(`i`)).toBe(`iyay`);
  expect(englishToPigLatin(`o`)).toBe(`oyay`);
  expect(englishToPigLatin(`u`)).toBe(`uyay`);

  expect(englishToPigLatin(`apple`)).toBe(`appleyay`);
  expect(englishToPigLatin(`aeiou`)).toBe(`aeiouyay`);
});


test('translate handles non-vowels', () => {
  // ['yes','esyay'],
  //   ['yellow','ellowyay'],
  //   ['apple','appleay'],
  //   ['tree','eetray'],
  //   ['LLL','LLLAY'],
  //   ['6789','6789'],
  //   ["it's","it'say"],
  //   ['test-word','test-worday'],
  //   ['Test','EstTay'],
  //   ['T3st','T3st'],
  //   ['TESt','EStTay'],
  //   ['T3ST','TEST'],
  //   ['test!!!','esttay!!!'],
  //   ["it's!!?","it'say!!?"],
  // print( translator("Yes") )
  // print( translator("yellow") )
  // print( translator("first") )
  // print( translator("octopus") )
  // print( translator("LLALLLL") )
  // print( translator("6789") )
  // print( translator("it's") )
  // print( translator("test-word") )
  // print( translator("CORN") )
  // print( translator("Corn") )
  // print( translator("PETER") )
  // print( translator("PETER Chay") )
  // print( translator("RaDish") )
  // print( translator("A") )
  // print( translator("doggo's!!!@@@") )
  // print( translator("dogs are tight") )
  // print( translator("12345") )
  // print( translator("1234$$###!!!") )
  // print( translator("Yield") )
  // print( translator("yield") )
  // print( translator("Flying") )
  // print( translator("Easter") )
  // print( translator("Apple") )
  expect(englishToPigLatin(`first`)).toBe(`irstfay`);
  expect(englishToPigLatin(`flying`)).toBe(`yingflay`);
  expect(englishToPigLatin(`test`)).toBe(`esttay`);
  expect(englishToPigLatin(`tree`)).toBe(`eetray`);
  expect(englishToPigLatin(`way`)).toBe(`ayway`);
});
