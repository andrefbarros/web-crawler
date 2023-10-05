const { crawlPage } = require('./crawl')

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
  console.log(`Starting crawl of:\n${website}`)
  console.log('====================================================================')

  const pages = await crawlPage(website, website, {})

  for (const page in pages) {
    console.log(`${page}: ${pages[page]}`)
  }
}

main()