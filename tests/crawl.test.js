const { normalizeURL, getURLsFromHTML } = require('../src/crawl.js');
const {test, expect} = require('@jest/globals');


/* normalize URL tests */
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

/* getURLsFromHTML tests */
test('getURLsFromHTML returns URL in html body', () => {
  const inputHTMLBody = '<html><body><a href="https://www.example.com">Example</a></body></html>'
  const inputBaseURL = 'https://www.example.com'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ["https://www.example.com/"]

  expect(actual).toEqual(expected)
})

test('getURLsFromHTML returns empty array if no urls in html body', () => {
  const inputHTMLBody = '<html><body><a>Example</a></body></html>'
  const inputBaseURL = 'https://www.example.com'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = [ ]

  expect(actual).toEqual(expected)
})

test('getURLsFromHTML returns URL from relative path', () => {
  const inputHTMLBody = '<html><body><a href="/path">Example</a></body></html>'
  const inputBaseURL = 'https://www.example.com'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ["https://www.example.com/path"]

  expect(actual).toEqual(expected)
})

test('getURLsFromHTML returns URLs', () => {
  const inputHTMLBody = '<html><body><a href="/path">Example</a><a href="https://www.example.dev">Example</a></body></html>'
  const inputBaseURL = 'https://www.example.dev'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ["https://www.example.dev/path", "https://www.example.dev/"]

  expect(actual).toEqual(expected)
})

test('getURLsFromHTML returns empty from invalid url', () => {
  const inputHTMLBody = '<html><body><a href="invalid">Example</a></body></html>'
  const inputBaseURL = 'https://www.example.com'
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = [ ]

  expect(actual).toEqual(expected)
})


