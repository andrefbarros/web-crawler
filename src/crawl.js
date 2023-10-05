const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
  console.log(`Currently crawling ${currentURL}`)

  const baseURLObj = new URL(baseURL)
  const currentURLObj = new URL(currentURL)

  if (currentURLObj.hostname !== baseURLObj.hostname) 
    return pages

  const normalizedCurrentURL = normalizeURL(currentURL)

  // check if we have already crawled this page, if so increment the count to get the total
  // number of this page has been crawled
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL] += 1

    return pages
  }

  pages[normalizedCurrentURL] = 1

  let htmlBody = ''

  try {
    const response = await fetch(currentURL)

    if (response.status > 399) {
      console.log(`Error in fetch with status code: ${response.status} on page ${currentURL}`)
      return pages
    }

    // check if the response is HTML, if not skip this page
    const contentType = response.headers.get('content-type')
    if (!contentType.includes("text/html")) {
      console.log(`Skipping ${currentURL} because it is not HTML`)
      return pages
    }

    htmlBody = await response.text()

  } catch (error) {
    console.log(`Error in fetch: ${error.message}`)
    return pages
  }

  const nextUrls = getURLsFromHTML(htmlBody, baseURL)
    
    for (const nextURL of nextUrls) {
      pages = await crawlPage(baseURL, nextURL, pages)
    }

  return pages
}


function getURLsFromHTML(htmlBody, baseURL){
  const urls = []
  const dom = new JSDOM(htmlBody)
  const aElements = dom.window.document.querySelectorAll('a')

  for (const aElement of aElements){
    if (aElement.href.slice(0,1) === '/'){
      try {
        urls.push(new URL(aElement.href, baseURL).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    }
  }
  return urls
}


function normalizeURL(url) {
  // create a URL object from the url string
  const urlObj = new URL(url)
  
  // remove the protocol from the url
  let hostPath = `${urlObj.host}${urlObj.pathname}`

  // remove trailing slash if present otherwise return the hostPath
  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1)
  }

  return hostPath
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}