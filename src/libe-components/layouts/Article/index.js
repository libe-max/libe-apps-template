import React, { Component } from 'react'

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

    /* Display component */
    return <div className={classes.join(' ')}>
      {props.children}
    </div>
  }
}

/* * * * * Prop types * * * * */
Article.propTypes = {}
Article.defaultProps = {}
