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
  normalizeURL
}