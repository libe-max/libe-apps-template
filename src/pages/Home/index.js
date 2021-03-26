import React, { Component } from 'react' 
import moment from 'moment'
import H3 from '../../libe-components/text/H3'
import P from '../../libe-components/text/P'
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
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT & UPDATE
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    // [...this.$frontpages.querySelectorAll('.frontpage, .exergue')].forEach($frontpage => this.observe($frontpage))
    this.observe()
  }

  componentDidUpdate () {
    // [...this.$frontpages.querySelectorAll('.frontpage, .exergue')].forEach($frontpage => this.observe($frontpage))
    this.observe()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * INTERSECTION OBSERVATION
   *
   * * * * * * * * * * * * * * * * */
  observer = new IntersectionObserver(this.observerHandler, { threshold: .25 })
  observeList = []
  observe ($elt) {
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
      } else {
        // target.classList.remove('fade-in')
        // target.classList.add('hide')
      }
    })
    // const observed = entries[0]
    // const { isIntersecting, target } = observed
    // if (isIntersecting) {
    //   target.classList.remove('hide')
    //   target.classList.add('fade-in')
    // } else {
    //   target.classList.remove('fade-in')
    //   target.classList.add('hide')
    // }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext
  
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
          {frontpage.titre && <H3>{frontpage.titre}</H3>}
          <P level={3}>{frontpage.texte}</P>
        </div>

        return <div
          key={i}
          className={`frontpage hide`}
          style={{
            width: colWidth,
            animationDuration: `${Math.random() * 500 + 200}ms`
          }}>
          <div
            className={`frontpage__ratio-box`}
            style={{ transform: `translateY(${offset}px)` }}>
            <img
              loading='lazy'
              src={frontpage.sd_url}
              style={{
                top: `50%`,
                left: `50%`,
                transform: 'translate(-50%, -50%)',
                width: `calc(100% - 2 * ${frontpagePadding}px)`
              }} />
            <P style={{
              color: 'white',
              left: frontpagePadding,
              bottom: frontpagePadding
            }}>
              {frontpage.date.format('DD MMM YYYY')}
            </P>
          </div>
        </div>
      })
    }</div>
  }
}

export default Home
