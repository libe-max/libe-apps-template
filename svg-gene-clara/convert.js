const fs = require('fs')
const path = require('path')
const { convertFile } = require('convert-svg-to-png')

const dir = path.join(__dirname, '/output')
fs.readdir(dir, async (err, files) => {
  if (err) throw err
  for (const file of files) {
    if (file.match(/.svg$/)) {
      const [width, height] = file.replace('.svg', '').split('-').slice(-2).map(e => parseFloat(e))
      const input = path.join(__dirname, '/output', file)
      const outputFilePath = path.join(__dirname, '/output-png', file.replace('.svg', '.png'))
      const png = await convertFile(input, { outputFilePath, width: width || 1, height: height || 1 })
      console.log(png)
    }
  }
})
