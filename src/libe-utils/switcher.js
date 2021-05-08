function switcher (value, tests = []) {
  if (!Array.isArray(tests)) return
  const passed = tests.filter((test) => {
    if (test.case === value) return true
    if (typeof test.case === 'function'
      && test.case(value)) return true
    return false
  })
  if (!passed.length) return
  return passed[0].return
}

export default switcher
