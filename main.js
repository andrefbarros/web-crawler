const { crawlPage } = require('./crawl')
const { printReport } = require('./report')

async function main() {
  if (process.argv.length < 3) {
    console.log('No website specified :(')
    process.exit(1)
  } else if (process.argv.length > 3) {
    console.log('Too many arguments. Please specify only one website.')
    process.exit(1)
  }

  const website = process.argv[2]

  console.log('====================================================================')
  console.log(`STARTING CRAWL OF:\n${website}`)
  console.log('====================================================================')

  const pages = await crawlPage(website, website, {})

  printReport(pages)
}

main()