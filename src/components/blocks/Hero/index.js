import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 *   Hero component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Very visual component for page headings with a big
 *   image or floating illustration and a title block
 *
 *   PROPS
 *   children, height, maxContentWidth, fullHeight,
 *   bgColor, bgImage, bgPosition, bgSize, parallax, illustration,
 *   illustrationPosition, illustrationShadow, textPosition,
 *   textShadow
 *
 */

export default class Hero extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-hero'
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
    if (props.textShadow) classes.push(`${c}_text-shadow`)
    if (props.illustrationShadow) classes.push(`${c}_illustration-shadow`)
    if (props.parallax) classes.push(`${c}_parallax`)

    /* Inner logic */
    const wrapperStyle = {
      height: props.fullHeight ? '100vh' : props.height,
      backgroundColor: props.bgColor,
      backgroundImage: props.bgImage ? `url(${props.bgImage})` : undefined,
      backgroundPosition: props.bgPosition || undefined,
      backgroundSize: props.bgSize || undefined
    }
    const innerStyle = {
      maxWidth: `${props.maxContentWidth}rem`
    }
    const illustrationStyle = {
      top: `${props.illustrationPosition.split(' ')[0]}%` || '0%',
      left: `${props.illustrationPosition.split(' ')[1]}%` || '0%'
    }
    const textStyle = {
      top: `${props.textPosition.split(' ')[0]}%` || '50%',
      left: `${props.textPosition.split(' ')[1]}%` || '0%'
    }

    /* Display component */
    return <div className={classes.join(' ')}
      style={wrapperStyle}>
      <div className={`${c}__inner`}
        style={innerStyle}>
        <div className={`${c}__illustration`}
          style={illustrationStyle}>
          <img src={props.illustration} />
        </div>
        <div className={`${c}__content`} style={textStyle}>
          {props.children}
        </div>
      </div>
    </div>
  }
}

/* * * * * Prop types * * * * */
Hero.propTypes = {
  prop: PropTypes.string
}

Hero.defaultProps = {
  illustrationPosition: '50 85',
  maxContentWidth: 90,
  height: 20,
  textPosition: '50 0'
}
