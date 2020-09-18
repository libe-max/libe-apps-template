import React, { Component } from 'react'
import logoGlyph from './assets/logo-glyph.svg'

/*
 *   Logo glyph component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays a Libération logo glyph inside of a paragraph
 *   and adjust it's size according from it's parent
 *
 *   PROPS
 *   - none -
 *
 */

export default class LogoGlyph extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-logo-glyph'
    this.state = {
      fontSize: 18,
      lineHeight: 24
    }
    this.adjustSizeFromParent = this.adjustSizeFromParent.bind(this)
    window.setInterval(this.adjustSizeFromParent, 2000)
  }

  /* * * * * * * * * * * * * * * *
   *
   * MOUNT, UPDATE, UNMOUNT
   *
   * * * * * * * * * * * * * * * */
  componentWillUnmount () { window.clearInterval(this.adjustSizeFromParent) }
  componentDidMount () { this.adjustSizeFromParent() }
  componentDidUpdate () { this.adjustSizeFromParent() }

  /* * * * * * * * * * * * * * * *
   *
   * ADJUST SIZE FROM PARENT
   *
   * * * * * * * * * * * * * * * */
  adjustSizeFromParent () {
    const { $node, state } = this
    if ($node) {
      const $parent = $node.parentNode
      const parentStyle = window.getComputedStyle($parent)
      const fontSize = parseFloat(parentStyle.fontSize.replace('px', '')) || 0
      const lineHeight = parseFloat(parentStyle.lineHeight.replace('px', '')) || 0
      if (fontSize !== state.fontSize ||
        lineHeight !== state.lineHeight) {
        this.setState({ fontSize, lineHeight })
      }
      return { fontSize, lineHeight }
    }
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { state, c } = this
    const style = {
      height: `${state.fontSize * 0.7}px`,
      lineHeight: `${state.lineHeight}px`
    }

    /* Assign classes */
    const classes = [c]

    return <img alt=''
      style={style}
      src={logoGlyph}
      className={classes.join(' ')}
      ref={n => { this.$node = n }} />
  }
}
