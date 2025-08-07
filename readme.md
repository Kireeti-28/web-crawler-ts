# web-crawler-ts

A simple TypeScript web crawler that recursively crawls a website, collects internal and external links, and prints a report of discovered pages.

## Features

- Recursively crawls pages on the same domain
- Extracts and normalizes URLs from HTML
- Prints a summary report of found pages and link counts

## Requirements

- Node.js (see `.nvmrc` for recommended version)
- npm

## Installation

```bash
npm install
```

## Usage

```bash
npm start https://example.com
```

Replace `https://example.com` with the URL you want to crawl.

## Testing

Run unit tests with:

```bash
npm test
```

## Project Structure

- `src/crawl.ts` - Core crawling and HTML parsing logic
- `src/report.ts` - Report generation and sorting
- `src/index.ts` - Entry point for CLI usage
- `src/*.test.ts` - Unit tests
