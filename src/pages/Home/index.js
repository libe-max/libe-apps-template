import React, { Component } from 'react' 
import moment from 'moment'
import H3 from '../../libe-components/text/H3'
import P from '../../libe-components/text/P'
import JSXInterpreter from '../../libe-components/logic/JSXInterpreter'
import AppContext from '../../context'

/*
 *   Home page component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   The front page of your app.
 *
 *   PROPS
 *   -
 *
 */

class Home extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-app-home-page'
    this.observe = this.observe.bind(this)
    this.observerHandler = this.observerHandler.bind(this)
    this.frontpageClickHandler = this.frontpageClickHandler.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT & UPDATE
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    this.observe()
  }

  componentDidUpdate () {
    this.observe()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * INTERSECTION OBSERVATION
   *
   * * * * * * * * * * * * * * * * */
  observer = IntersectionObserver
    ? new IntersectionObserver(this.observerHandler, { threshold: .25 })
    : null
  observeList = []
  observe ($elt) {
    if (!this.observer) return
    const toObserve = [...this.$frontpages.querySelectorAll('.frontpage, .exergue')]
    toObserve.forEach($observable => {
      if (this.observeList.indexOf($observable) === -1) {
        this.observeList.push($observable)
        this.observer.observe($observable)
      }
    })
  }

  observerHandler (entries, observer) {
    if (!entries.length) return
    entries.forEach(entry => {
      const { isIntersecting, target } = entry
      if (!target) return
      if (isIntersecting) {
        target.classList.remove('hide')
        target.classList.add('fade-in')
      }
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * FRONT PAGE CLICK HANDLER
   *
   * * * * * * * * * * * * * * * * */
  frontpageClickHandler (e, frontpage) {
    window.open(frontpage.hd_url)
  }
  
  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, context, c } = this
    const { data } = props
    const { viewport } = context
    const { width, rem } = viewport

    const colMinWidth = 20 * rem + (width - 20 * rem) * 0.1
    const nbColumns = Math.max(Math.floor(width / colMinWidth), 1)
    const colWidth = width / nbColumns
    const frontpagePadding = colWidth * 0.15

    const exergueClass = this.observer ? 'exergue' : 'exergue hide'
    const frontpageClass = this.observer ? 'frontpage' : 'frontpage hide'

    return <div
      className={`frontpages`}
      ref={n => this.$frontpages = n}>{
      data.map((frontpage, i) => {
        const offset = Math.random() * 2 * frontpagePadding - frontpagePadding
        if (frontpage.type === 'text') return <div
          key={i}
          className={`exergue hide`}
          style={{
            width: '100%',
            padding: `${1.5 * frontpagePadding}px ${rem}px`,
            animationDuration: `${Math.random() * 500 + 200}ms`
          }}>
          {frontpage.titre && <H3 level={3}><JSXInterpreter content={frontpage.titre || ''} /></H3>}
          <P level={1.5}><JSXInterpreter content={frontpage.texte || ''} /></P>
        </div>

        if (frontpage.type === 'une') return <div
          key={i}
          className={`frontpage hide`}
          style={{
            width: colWidth,
            animationDuration: `${Math.random() * 500 + 200}ms`
          }}>
          <div
            className={`frontpage__ratio-box`}
            style={{ transform: `translateY(${offset}px)` }}>
            <div
              className={`frontpage__image-box`}
              style={{
                top: `50%`,
                left: `50%`,
                transform: 'translate(-50%, -50%)',
                width: `calc(100% - 2 * ${frontpagePadding}px)`
              }}>
              <img loading='lazy' src={frontpage.sd_url} onClick={e => this.frontpageClickHandler(e, frontpage)} />
            </div>
            <P style={{
              color: 'white',
              left: frontpagePadding,
              bottom: frontpagePadding
            }}>
              {frontpage.date.format('DD MMM YYYY')}
            </P>
          </div>
        </div>

        return null
      })
    }</div>
  }
}

export default Home
