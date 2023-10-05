const { normalizeURL } = require('./crawl.js');
const {test, expect} = require('@jest/globals');

test('normalizeURL strip protocol', () => {
  const input = 'https://www.example.com'
  const actual = normalizeURL(input)
  const expected = 'www.example.com'

  expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash ', () => {
  const input = 'https://www.example.com/path/'
  const actual = normalizeURL(input)
  const expected = 'www.example.com/path'

  expect(actual).toEqual(expected)
})

test('normalizeURL capitals in url', () => {
  const input = 'https://www.ExamPLE.com/path'
  const actual = normalizeURL(input)
  const expected = 'www.example.com/path'

  expect(actual).toEqual(expected)
})
