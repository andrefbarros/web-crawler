const { test, expect } = require('@jest/globals')
const { sortPages } = require('./report')

test('sortPages sorts pages by page number', () => {
  const input = {
    'www.example.com': 1,
    'www.example.com/path': 2,
    'www.example.com/path2': 3,
    'www.example.com/path3': 4,
  }

  const actual = sortPages(input)
  const expected = [
    ['www.example.com', 1],
    ['www.example.com/path', 2],
    ['www.example.com/path2', 3],
    ['www.example.com/path3', 4],
  ]

  expect(actual).toEqual(expected)
})

test('sortPages with empty object', () => {
  const input = {}

  const actual = sortPages(input)
  const expected = []

  expect(actual).toEqual(expected)
})