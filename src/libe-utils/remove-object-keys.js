function removeObjectKeys (object, keysList) {
  const returned = {}
  Object.keys(object).forEach(key => {
    if (keysList.indexOf(key) !== -1) return
    returned[key] = object[key]
  })
  return returned
}

export default removeObjectKeys
