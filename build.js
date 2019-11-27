const { promisify } = require('util')
const { exec } = require('child_process')
const { readFile, writeFile } = require('fs')
const execPromise = promisify(exec)
const cheerio = require('cheerio')
const config = require('./src/config')

async function readFilePromise (path, encoding = 'utf8') {
  const result = await new Promise((resolve, reject) => {
    readFile(path, encoding, (err, data) => {
      if (err) resolve({ success: null, error: err })
      else resolve({ success: data, error: null })
    })
  })
  return result
}

async function writeFilePromise (path, data, encoding = 'utf8') {
  const result = await new Promise((resolve, reject) => {
    writeFile(path, data, encoding, err => {
      if (err) resolve({ success: null, error: err })
      else resolve({ success: true, error: null })
    })
  })
  return result
}

async function build () {
  // Build app
  const { stdout, stderr } = await execPromise('react-scripts build')
  if (stderr) throw Error(stderr)
  console.log(stdout)

  // Read build index.html
  console.log('Reading file at ./build/index.html')
  const { success: fileData, error: readError } = await readFilePromise('./build/index.html')
  if (readError) throw readError

  // Add meta tags
  console.log('\nAdding meta tags')
  const { title, url, description, author, image } = config.meta
  const $ = cheerio.load(fileData)
  $('head').append(`
    <title>Libération.fr – ${title}</title>
    <link rel="canonical" href="${url}" />
    <meta name="author" content="${author}" />
    <meta name="description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:url" content="${url}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
  `)

  // Save index.html
  console.log('\nSaving file at ./build/index.html')
  const { success, error: writeError } = await writeFilePromise('./build/index.html', $.html())
  if (writeError) throw writeError

  // Return
  console.log('\nDone.')
}

build()
  .then(res => process.exit(0))
  .catch(err => process.exit(1))
