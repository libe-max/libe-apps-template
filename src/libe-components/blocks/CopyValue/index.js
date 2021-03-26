import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paragraph from '../../text-levels/Paragraph'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Copy value component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Block copying the given value to clipboard
 *
 *   PROPS
 *   value, label, successLabel, hideField
 *
 */

export default class CopyValue extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-copy-value'
    this.usedProps = ['value', 'label', 'successLabel', 'hideField', 'className']
    this.state = { copied: false }
    this.timeout = () => this.setState({ copied: false })
    this.copyToClipboard = this.copyToClipboard.bind(this)
  }

  /* * * * * * * * * * * * * * * *
   *
   * COPY TO CLIPBOARD
   *
   * * * * * * * * * * * * * * * */
  copyToClipboard () {
    window.clearTimeout(this.timeout)
    const { input } = this
    input.select()
    document.execCommand('copy')
    if (window.getSelection) window.getSelection().removeAllRanges()
    else if (document.selection) document.selection.empty()
    this.setState({ copied: true })
    window.setTimeout(this.timeout, 2000)
  }

  /* * * * * * * * * * * * * * * *
   *
   * WILL UNMOUNT
   *
   * * * * * * * * * * * * * * * */
  componentWillUnmount () {
    window.clearTimeout(this.timeout)
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { c, props, state } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)
    if (props.hideField) classes.push(`${c}_hide-field`)
    if (state.copied) classes.push(`${c}_copied`)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display component */
    return <div className={classes.join(' ')} {...passedProps}>
      <button className={`${c}__button`}
        onClick={this.copyToClipboard}>
        <Paragraph small>{
          state.copied
            ? props.successLabel
            : props.label
        }</Paragraph>
      </button>
      <input className={`${c}__input`}
        ref={n => { this.input = n }}
        value={props.value}
        onFocus={this.copyToClipboard}
        type='text'
        readOnly />
    </div>
  }
}

/* * * * * Prop types * * * * */

CopyValue.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  successLabel: PropTypes.string,
  hideField: PropTypes.bool
}

CopyValue.defaultProps = {
  value: window.location,
  label: 'Copier le lien',
  successLabel: 'Lien copié',
  hideField: false
}
