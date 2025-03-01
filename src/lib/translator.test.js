import englishToPigLatin from './translator';

const translate = (inputWord) => {
  const response = englishToPigLatin(inputWord);
  return response.translatedWord;
}

test(`translate handles numbers`, () => {

});

// expect(translate(``)).toBe(``);

test(`translate handles vowels at beginning`, () => {
  expect(translate(`a`)).toBe(`ayay`);
  expect(translate(`e`)).toBe(`eyay`);
  expect(translate(`i`)).toBe(`iyay`);
  expect(translate(`o`)).toBe(`oyay`);
  expect(translate(`u`)).toBe(`uyay`);

  expect(translate(`apple`)).toBe(`appleyay`);
  expect(translate(`aeiou`)).toBe(`aeiouyay`);
  expect(translate(`octopus`)).toBe(`octopusyay`);
});

test(`translate handles y-words`, () => {
  expect(translate(`y`)).toBe(`yay`);
  expect(translate(`yellow`)).toBe(`ellowyay`);
  expect(translate(`yes`)).toBe(`esyay`);
});

test('translate handles non-vowels', () => {
  expect(translate(`first`)).toBe(`irstfay`);
  expect(translate(`flying`)).toBe(`yingflay`);
  expect(translate(`test`)).toBe(`esttay`);
  expect(translate(`tree`)).toBe(`eetray`);
  expect(translate(`way`)).toBe(`ayway`);
});

test(`translate handles beginning uppercase`, () => {
  expect(translate(`Test`)).toBe(`Esttay`);
  expect(translate(`Able`)).toBe(`Ableyay`);
});

test(`translate handles all uppercase`, () => {
  expect(translate(`TEST`)).toBe(`ESTTAY`);
  expect(translate(`ABLE`)).toBe(`ABLEYAY`);
});

