function getClosestDomParent (elem, selector) {
  if (!window.Element.prototype.matches) {
    window.Element.prototype.matches =
      window.Element.prototype.matchesSelector ||
      window.Element.prototype.mozMatchesSelector ||
      window.Element.prototype.msMatchesSelector ||
      window.Element.prototype.oMatchesSelector ||
      window.Element.prototype.webkitMatchesSelector ||
      function (s) {
        const matches = (
          this.document ||
          this.ownerDocument
        ).querySelectorAll(s)
        let i = matches.length
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1
      }
  }
  // Get closest match
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem
  }
  return null
}

export default getClosestDomParent
