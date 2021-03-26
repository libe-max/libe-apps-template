import React, { Component } from 'react'
import { ReactSVG } from 'react-svg'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   SVG component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Wrapper around the react-svg component, implementing
 *   a default fallback.
 *
 *   PROPS
 *   Mapped on react-svg props
 *
 */

const fallback = () => <img alt='Not found' src='https://www.liberation.fr' />

export default class Svg extends Component {
  constructor () {
    super()
    this.c = 'lblb-svg'
    this.usedProps = ['className']
  }
  render () {
    const { props, c } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)
    
    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display component */
    return <div className={classes.join(' ')} {...passedProps}>
      <ReactSVG
        fallback={fallback}
        renumerateIRIElements={false}
        {...this.props} />
    </div>
  }
}
