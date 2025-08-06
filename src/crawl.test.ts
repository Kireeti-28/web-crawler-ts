import { expect, test } from 'vitest';
import { normalizeURL } from './crawl';

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
