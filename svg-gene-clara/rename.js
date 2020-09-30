const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const dir = path.join(__dirname, '/output-png')
fs.readdir(dir, async (err, files) => {
  if (err) throw err
  let cnt = 0
  for (const file of files) {
    cnt ++
    if (true) {
      const [name, ext] = file.split('.')
      const [type, color, month, country] = name.split('-')
      const newName = `${type}-${color}-${month}-${country}.${ext}`
      const prevPath = path.join(__dirname, '/output-png', file)
      const newPath = path.join(__dirname, '/output-png', newName)
      await exec(`mv ${prevPath} ${newPath}`)
      console.log(newName)
    }
  }
})
