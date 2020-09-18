function parseCookies () {
  const raw = document.cookie
  const cookies = {}
  raw.split(';').forEach(pair => {
    if (!pair) return
    const trimmed = pair.trim()
    if (!trimmed) return
    const splOnEqual = trimmed.split('=')
    if (splOnEqual.length < 2) return
    const key = splOnEqual[0]
    const val = [...splOnEqual.slice(1)].join('=')
    cookies[key] = val
  })
  return cookies
}

export default parseCookies
