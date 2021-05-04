import React, { Component } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Svg from '../../../../../libe-components/primitives/Svg'
import P from '../../../../../libe-components/text/P'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'
import AppContext from '../../../../../context'

/*
 *   Carrousel component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Renders children through a react-slick Slider
 *
 *   PROPS
 *   children, className
 *
 */

export default class Carrousel extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * INITIAL STATE
   *
   * * * * * * * * * * * * * * * * */
  state = {
    value: 0
  }

  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-carrousel'
    this.usedProps = ['children', 'className']
    this.handlePrevClick = this.handlePrevClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.dirtySlickTrackFix = this.dirtySlickTrackFix.bind(this)
    this.cleanDirtySlickTrackFix = this.cleanDirtySlickTrackFix.bind(this)
  }

  /* * * * * * * * * * * * * * * *
   *
   * DID MOUNT, UPDATE & WILL UNMOUNT
   *
   * * * * * * * * * * * * * * * */
  componentDidMount () {
    this.dirtySlickTrackFix()
  }

  componentDidUpdate() {
    this.dirtySlickTrackFix()
  }

  componentWillUnmount () {
    this.cleanDirtySlickTrackFix()
  }

  /* * * * * * * * * * * * * * * *
   *
   * DIRTY & CLEAN SLICK TRACK FIX
   *
   * * * * * * * * * * * * * * * */
  dirtySlickTrackFix () {
    if (!this.$root) return
    if (!this.dirtyFixTimeouts) this.dirtyFixTimeouts = []
    this.dirtyFixTimeouts.push(window.setTimeout(() => {
      const $track = this.$root.querySelector('.slick-track')
      $track.style.width = `${100000}px`
    }, 100))
    this.dirtyFixTimeouts.push(window.setTimeout(() => {
      const $track = this.$root.querySelector('.slick-track')
      $track.style.width = `${100000}px`
    }, 500))
  }

  cleanDirtySlickTrackFix () {
    if (!this.dirtyFixTimeouts) return
    this.dirtyFixTimeouts.forEach(timeout => window.clearTimeout(timeout))
  }

  /* * * * * * * * * * * * * * * *
   *
   * HANDLERS
   *
   * * * * * * * * * * * * * * * */
  handlePrevClick (e) {
    if (!this.slider) return
    this.slider.slickPrev()
  }

  handleNextClick (e) {
    if (!this.slider) return
    this.slider.slickNext()
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, state, context, c } = this
    const { config, viewport } = context

    /* Logic */
    const settings = {
      arrows: false,
      accessibility: true,
      infinite: true,
      speed: viewport.display_name === 'lg' ? 100 : 50,
      centerMode: true,
      variableWidth: true,
      slidesToScroll: 1,
      dots: true,
      customPaging: i => {
        return <P level={-.5} className={`${c}__dot`}>{i + 1}</P>
      }
      /*,
      appendDots: dots => <ul>
        {dots.map((dot, i) => {
          const handleClick = e => this.slider?.slickGoTo(i)
          return dot
          return <li
            key={i}
            onClick={handleClick}
            className={`${c}__dot`}>
            {i + 1}
          </li>
        })}
      </ul>*/
    }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <div
      className={classes.join(' ')}
      ref={n => this.$root = n}>
      <Slider
        {...settings}
        className={`${c}__slider`}
        ref={n => (this.slider = n)}>
        {props.children.map((child, i) => <div
          key={i}
          onClick={e => this.slider?.slickGoTo(i)}
          className={`${c}__slide`}>
          {child}
        </div>)}
      </Slider>
      <div className={`${c}__buttons`}>
        <button onClick={this.handlePrevClick}><Svg src={`${config.statics_url}/assets/left-arrow-head-icon_40.svg`} /></button>
        <button onClick={this.handleNextClick}><Svg src={`${config.statics_url}/assets/right-arrow-head-icon_40.svg`} /></button>
      </div>
    </div>
  }
} 
