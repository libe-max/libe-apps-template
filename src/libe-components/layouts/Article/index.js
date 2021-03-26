import React, { Component } from 'react'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Article component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Basically adds margins around it's children
 *
 *   PROPS
 *   - none -
 *
 */

export default class Article extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-article'
    this.usedProps = ['className']
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, props } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)
    
    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display component */
    return <div className={classes.join(' ')} {...passedProps}>
      {props.children}
    </div>
  }
}

/* * * * * Prop types * * * * */
Article.propTypes = {}
Article.defaultProps = {}
