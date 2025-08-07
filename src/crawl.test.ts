import { expect, test } from 'vitest';
import { getURLsFromHTML, normalizeURL } from './crawl';

test('normalizeURL test https', () => {
    const input = "https://myfriends.com";
    const actual = normalizeURL(input);
    const expected = "myfriends.com";
    expect(actual).toBe(expected);
});

test('normalizeURL test http', () => {
    const input = "http://myfriends.com";
    const actual = normalizeURL(input);
    const expected = "myfriends.com";
    expect(actual).toBe(expected);
});

test('normalizeURL test path', () => {
    const input = "https://myfriends.com/friends";
    const actual = normalizeURL(input);
    const expected = "myfriends.com/friends";
    expect(actual).toBe(expected);
});

test('normalizeURL test path slash', () => {
    const input = "https://myfriends.com/friends/";
    const actual = normalizeURL(input);
    const expected = "myfriends.com/friends";
    expect(actual).toBe(expected);
});

test('normalizeURL test fragment', () => {
    const input = "https://myfriends.com/friends#profile";
    const actual = normalizeURL(input);
    const expected = "myfriends.com/friends";
    expect(actual).toBe(expected);
});

test('normalizeURL test query', () => {
    const input = "https://myfriends.com/friends?sort=true";
    const actual = normalizeURL(input);
    const expected = "myfriends.com/friends";
    expect(actual).toBe(expected);
});

test('normalizeURL test caps', () => {
    const input = "https://MYFRIENDS.com";
    const actual = normalizeURL(input);
    const expected = "myfriends.com";
    expect(actual).toBe(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/path/one"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [
    "https://blog.boot.dev/path/one",
    "https://other.com/path/one",
  ];
  expect(actual).toEqual(expected);
});