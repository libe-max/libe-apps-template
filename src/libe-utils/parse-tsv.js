function parseTsv (data, widths, splitter = '\t') {
  const table = data.split('\n').map(line => line.split(splitter).map(e => e.trim()))
  const pages = widths.map((val, pageNb) => {
    const lowBound = widths.slice(0, pageNb).reduce((a, b) => a + b, 0)
    const hiBound = lowBound + val
    const page = table.map(line => line.slice(lowBound, hiBound))
    const noWhiteLinesPage = page.filter(line => line.join('').trim() !== '')
    const pageOfObjects = noWhiteLinesPage.slice(1).map(line => {
      const obj = {}
      noWhiteLinesPage[0].forEach((label, i) => { obj[label] = line[i] })
      return obj
    })
    return pageOfObjects
  })
  return pages
}

export default parseTsv
