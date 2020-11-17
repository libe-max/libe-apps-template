function cssTextAlignToTextAnchor (align) {
  switch (align) {
    case 'left': return 'start'
    case 'right': return 'end'
    case 'center': return 'middle'
    case 'start': return 'start'
    case 'end': return 'end'
    case 'justify': return 'middle'
    case 'justify-all': return 'middle'
    case 'middle': return 'middle'
    default: return 'start'
  }
}

export default cssTextAlignToTextAnchor
