import { JSDOM } from "jsdom";

export function normalizeURL(url: string) {
  const urlObj = new URL(url);
  let fullPath = `${urlObj.host}${urlObj.pathname}`;
  if (fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
}

export function getURLsFromHTML(html: string, baseURL: string) {
  const urls: string[] = [];
  const dom = new JSDOM(html);
  const anchors = dom.window.document.querySelectorAll("a");

  for (const anchor of anchors) {
    let href = anchor.getAttribute("href");
    if (href) {
      try {
        // convert any relative URLs to absolute URLs
        href = new URL(href, baseURL).href;
        urls.push(href);
      } catch (err) {
        console.log(`${(err as Error).message}: ${href}`);
      }
    }
  }

  return urls;
}

export async function getHTML(url: string) {

  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw new Error(`Got Network error: ${(err as Error).message}`);
  }

  if (res.status > 399) {
    throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`)
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    throw new Error(`Got non-HTML response: ${contentType}`)
  }

  const respBody = await res.text();
  return respBody;
}

function hasSameDomain(baseURL: string, currentURL: string) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  return baseURLObj.hostname === currentURLObj.hostname;
}

export async function crawlPage(baseURL: string, currentURL: string = baseURL, pages: Record<string, number> = {}) {
  if (!hasSameDomain(baseURL, currentURL)) return pages;

  const normalizedURL = normalizeURL(currentURL);
  if (normalizedURL in pages) {
    pages[normalizedURL]++;
    return pages;
  }

  pages[normalizedURL] = 1;

  console.log(`crawling ${currentURL}`);
  let html = ""
  try {
    html = await getHTML(currentURL);
  } catch (err) {
    console.log(`${(err as Error).message}`);
    return pages;
  }

  const nxtUrls = getURLsFromHTML(html, baseURL);
  for (let nxtUrl of nxtUrls) {
    if (nxtUrl in pages) {
      continue;
    }

    crawlPage(baseURL, nxtUrl, pages);
  }

  return pages;
}