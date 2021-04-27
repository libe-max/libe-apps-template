import React, { Component } from 'react' 
import Carrousel from './components/blocks/Carrousel'
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

    const slidesData = [
      { title: 'Title 1!', content: <span>Some content!</span> },
      { title: 'Title 2!', content: <span>Some content!</span> },
      { title: 'Title 3!', content: <span>Some content!</span> },
      { title: 'Title 4!', content: <span>Some content!</span> }
    ]

    return <div className={c}>
      <Carrousel>
        {slidesData.map((slideData, i) => <div key={i}>{slideData.content}</div>)}
      </Carrousel>
    </div>
  }
}

export default Home
