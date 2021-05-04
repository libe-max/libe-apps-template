import React, { Component } from 'react' 
import Carrousel from './components/blocks/Carrousel'
import H1 from '../../libe-components/text/H1'
import H3 from '../../libe-components/text/H3'
import ScoresRegionales from './components/cards/ScoresRegionales'
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
    const { rem } = viewport

    return <div className={c}>
      <H1 level={3} className='regionales-2021__region-name'>
        Bretagne
      </H1>
      <Carrousel>
        <ScoresRegionales className='regionales-2021__slide' val={'Vue d\'ensemble'} />
        <ScoresRegionales className='regionales-2021__slide' val={'Vue d\'ensemble'} />
        <ScoresRegionales className='regionales-2021__slide' val={'Vue d\'ensemble'} />
        <ScoresRegionales className='regionales-2021__slide' val={'Vue d\'ensemble'} />
        <ScoresRegionales className='regionales-2021__slide' val={'Vue d\'ensemble'} />
        <ScoresRegionales className='regionales-2021__slide' val={'Vue d\'ensemble'} />
        <ScoresRegionales className='regionales-2021__slide' val={'Vue d\'ensemble'} />
      </Carrousel>
    </div>
  }
}

export default Home
