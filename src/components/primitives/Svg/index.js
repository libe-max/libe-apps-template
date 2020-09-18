import React, { Component } from 'react'
import ReactSvg from 'react-svg'

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
  render () {
    return <div className='lblb-svg'>
      <ReactSvg
        fallback={fallback}
        renumerateIRIElements={false}
        {...this.props} />
    </div>
  }
}
