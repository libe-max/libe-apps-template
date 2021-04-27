import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Flickity from 'flickity'
import 'flickity/dist/flickity.min.css'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   Carrousel component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays children inside a carrousel
 *
 *   PROPS
 *   slides
 *
 */

export default class Carrousel extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor(props) {
    super()
    this.c = 'lblb-carrousel'
    this.usedProps = ['slides', 'className']
    this.state = { flickityReady: false }
    this.refreshFlickity = this.refreshFlickity.bind(this)
  }

  /* * * * * * * * * * * * * * * *
   *
   * MOUNT, UPDATE, UNMOUNT
   *
   * * * * * * * * * * * * * * * */
  componentDidMount () {
    this.flickity = new Flickity(this.flickityNode, this.props.options || {})
    this.setState({ flickityReady: true })
  }

  componentDidUpdate (prevProps, prevState) {
    const flickityDidBecomeActive = !prevState.flickityReady && this.state.flickityReady
    const childrenDidChange = prevProps.children.length !== this.props.children.length
    if (flickityDidBecomeActive || childrenDidChange) this.refreshFlickity()
  }

  componentWillUnmount () {
    this.flickity.destroy()
  }

  /* * * * * * * * * * * * * * * *
   *
   * REFRESH FLICKITY
   *
   * * * * * * * * * * * * * * * */
  refreshFlickity () {
    this.flickity.reloadCells()
    this.flickity.resize()
    this.flickity.updateDraggable()
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER PORTAL
   *
   * * * * * * * * * * * * * * * */
  renderPortal () {
    if (!this.flickityNode) return null
    const mountNode = this.flickityNode.querySelector('.flickity-slider')
    if (mountNode) return ReactDOM.createPortal(this.props.children, mountNode)
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER PORTAL
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, state, c } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    return [
      <div
        className={classes.join(' ')}
        key='flickityBase'
        ref={node => (this.flickityNode = node)}
        {...passedProps} />,
      this.renderPortal(),
    ].filter(Boolean)
  }



  // state = {
  //   active_slide: null
  // }

  // /* * * * * * * * * * * * * * * *
  //  *
  //  * CONSTRUCTOR
  //  *
  //  * * * * * * * * * * * * * * * */
  // constructor () {
  //   super()
  //   this.c = 'lblb-carrousel'
  //   this.usedProps = ['slides', 'className']
  //   this.handlePrevClick = this.handlePrevClick.bind(this)
  //   this.handleNextClick = this.handleNextClick.bind(this)
  // }

  // /* * * * * * * * * * * * * * * *
  //  *
  //  * HANDLE PREV CLICK
  //  *
  //  * * * * * * * * * * * * * * * */
  // handlePrevClick (e) {
  //   const slides = this.props.slides || []
  //   this.setState(curr => ({
  //     ...curr,
  //     active_slide: (slides.length + curr.active_slide - 1) % slides.length
  //   }))
  // }

  // /* * * * * * * * * * * * * * * *
  //  *
  //  * HANDLE NEXT CLICK
  //  *
  //  * * * * * * * * * * * * * * * */
  // handleNextClick (e) {
  //   const slides = this.props.slides || []
  //   this.setState(curr => ({
  //     ...curr,
  //     active_slide: (slides.length + curr.active_slide + 1) % slides.length
  //   }))
  // }

  // /* * * * * * * * * * * * * * * *
  //  *
  //  * RENDER
  //  *
  //  * * * * * * * * * * * * * * * */
  // render () {
  //   const { props, state, c } = this
  //   const { slides } = props
  //   const activeSlideNb = (state.active_slide ?? 0) % slides.length

  //   /* Assign classes */
  //   const classes = [c]
  //   if (props.className) classes.push(props.className)

  //   /* Passed props */
  //   const passedProps = removeObjectKeys(props, this.usedProps)

  //   return <div className={classes.join(' ')} {...passedProps}>
  //     <div className={`${c}__actions`}>
  //       <button
  //         onClick={this.handlePrevClick}
  //         className={`${c}__action ${c}__action_prev`}>
  //         prev
  //       </button>
  //       <span className={`${c}__page-info`}>
  //         title
  //       </span>
  //       <button
  //         onClick={this.handleNextClick}
  //         className={`${c}__action ${c}__action_next`}>
  //         next
  //       </button>
  //     </div>
  //     <div className={`${c}__content-wrapper`}>
  //       <div className={`${c}__content`}>
  //         {slides.map((slide, i) => i === activeSlideNb
  //           ? <div
  //             key={i}
  //             className={`${c}__slide ${c}__slide_active`}>
  //             {slide.content}
  //           </div>
  //           : <div
  //             key={i}
  //             className={`${c}__slide`}>
  //             {slide.content}
  //           </div>          
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // }
}
