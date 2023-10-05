const { crawlPage } = require('./crawl')

function main() {
  if (process.argv.length < 3) {
    console.log('No website specified :(')
    process.exit(1)
  } else if (process.argv.length > 3) {
    console.log('Too many arguments. Please specify only one website.')
    process.exit(1)
  }

  const website = process.argv[2]

  crawlPage(website)

  console.log(`Starting crawl of ${website}`)
}

main()