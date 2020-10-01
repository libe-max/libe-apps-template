import React, { Component } from 'react'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Heading component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   This component returns a heading tag according to the
 *   provided 'level' prop.
 *
 *   PROPS
 *   level, children
 *
 */

export default class Heading extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'heading'
    this.usedProps = ['level', 'children', 'className']
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this
    
    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)
    
    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display component */
    if (props.level === 1) return <h1 className={classes.join(' ')} {...passedProps}>{props.children}</h1>
    else if (props.level === 2) return <h2 className={classes.join(' ')} {...passedProps}>{props.children}</h2>
    else if (props.level === 3) return <h3 className={classes.join(' ')} {...passedProps}>{props.children}</h3>
    else if (props.level === 4) return <h4 className={classes.join(' ')} {...passedProps}>{props.children}</h4>
    else if (props.level === 5) return <h5 className={classes.join(' ')} {...passedProps}>{props.children}</h5>
    else if (props.level === 6) return <h6 className={classes.join(' ')} {...passedProps}>{props.children}</h6>
    else return <span className='heading'>{props.children}</span>
  }
}
