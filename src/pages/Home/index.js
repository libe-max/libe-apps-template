import React, { Component } from 'react'
import Video from '../../libe-components/blocks/Video2'
import H1 from '../../libe-components/text/H1'
import H2 from '../../libe-components/text/H2'
import H3 from '../../libe-components/text/H3'
import H4 from '../../libe-components/text/H4'
import H5 from '../../libe-components/text/H5'
import H6 from '../../libe-components/text/H6'
import P from '../../libe-components/text/P'
import Span from '../../libe-components/text/Span'

/*
 *   Chrono component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   A simple chrono app
 *
 *   PROPS
 *   data
 *
 */

class Chrono extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-chrono'
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Inner logic */
    const { data } = props
    const events = data.sort((a, b) => a.order - b.order)

    return <div className={classes.join(' ')}>{
      data.map((event, i) => {
        const mediaType = event.image ? 'image' : (event.video ? 'video' : (event.audio ? 'audio' : 'none'))
        const orientation = i % 2 === 0 ? 'left' : 'right'
        return <div
          key={i}
          className={`${c}__event ${c}__event_${orientation}`}>
          <P level={0}>{event.small_title}</P>
          <H3>{event.big_title}</H3>
          {mediaType === 'image' && <img src={event.image} />}
          {mediaType === 'video' && <Video src={event.video} height={300} />}
          {mediaType === 'audio' && <img src={event.image} />}
          <P>{event.credit}</P>
          <P>{event.text}</P>
        </div>})
    }</div>
  }
}

export default Chrono
