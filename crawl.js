const { JSDOM } = require('jsdom')

async function crawlPage(currentURL) {
  console.log(`Crawling ${currentURL}`)

  try {
    const response = await fetch(currentURL)

    if (response.status > 399) {
      console.log(`Error in fetch with status code: ${response.status} on page ${currentURL}`)
      return
    }

    const contentType = response.headers.get('content-type')
    if (!contentType.includes("text/html")) {
      console.log(`Skipping ${currentURL} because it is not HTML`)
      return
    }
  } catch (error) {
    console.log(`Error in fetch: ${error.message}`)
    return
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = []
  const dom = new JSDOM(htmlBody)
  const links = dom.window.document.querySelectorAll('a')

  links.forEach(link => {
    if (link.href.slice(0, 1) === '/') {
      urls.push(baseURL + link.href)
    } else {
      urls.push(link.href)
    }
  })

  return urls
}

function normalizeURL(url) {
  // create a URL object from the url string
  const urlObj = new URL(url)
  
  // remove the protocol from the url
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`

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