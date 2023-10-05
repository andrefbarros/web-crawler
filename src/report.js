function sortPages(pages) {
  const pagesArray = Object.entries(pages)

  return pagesArray.sort((a, b) => a.pageNumber - b.pageNumber)
}

function printReport(pages) {
  console.log('\n\n====================================================================')
  console.log('REPORT')
  console.log('====================================================================')

  const sortedPages = sortPages(pages)

  for (const page of sortedPages) {
    console.log(`Found ${page[1]} links to page: ${page[0]}`)
  }

}

module.exports = {
  sortPages,
  printReport
}