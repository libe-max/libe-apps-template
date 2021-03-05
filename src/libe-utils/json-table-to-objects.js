function jsonTableToObjects (table) {
  const keys = table[0]
  const lines = table.slice(1)
  return lines.map(line => {
    const object = {}
    line.forEach((cell, i) => { object[keys[i]] = cell })
    return object
  })
}

export default jsonTableToObjects
