import React, { Component } from 'react' 
import Carrousel from './components/blocks/Carrousel'
import H1 from '../../libe-components/text/H1'
import H3 from '../../libe-components/text/H3'
import P from '../../libe-components/text/P'
import AppContext from '../../context'

import Test from './components/cards/Test'
import VueEnsemble from './components/cards/VueEnsemble'
import LaRegion from './components/cards/LaRegion'
import LeDepartement from './components/cards/LeDepartement'
import PrecElections from './components/cards/PrecElections'
import Covid from './components/cards/Covid'

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
      <H1 level={3} className='region-name'>
        Bretagne
      </H1>
      <Carrousel settings={{ initialSlide: 0 }}>
        <Test />
        <VueEnsemble
          mapUrl='https://upload.wikimedia.org/wikipedia/commons/6/67/Regions_France_2016.svg'
          regionFacts={new Array(6).fill(null).map((e, i) => ({
            line_1: 'line 1feazf',
            line_2: 'line 2',
            line_3: 'line_3',
            line_1_style: { color: 'olive' },
            line_2_style: { color: 'navy' },
            line_3_style: { color: 'red' }
          }))} />
        <LaRegion
          mapUrl='https://upload.wikimedia.org/wikipedia/commons/6/67/Regions_France_2016.svg'
          presidentColor='red'
          presidentPhoto='https://cdn-s-www.dna.fr/images/7AE3786C-F36F-4AB0-9693-E463199273EA/NW_raw/jean-rottner-president-de-la-region-grand-est-photo-archives-dna-michel-frison-1614059403.jpg'
          presidentName='Jean-Marie Dubourg'
          presidentLabel='Président sortant'
          presidentParty='Parti Socialiste'
          nbSeats={83}
          seatsDistribution={[
            { label: 'PS', nb: 8, color: 'red' },
            { label: 'FN', nb: 8, color: 'navy' },
            { label: 'LR', nb: 8, color: 'olive' },
          ]} />
        <LeDepartement
          mapUrl='https://upload.wikimedia.org/wikipedia/commons/6/67/Regions_France_2016.svg'
          departmentFacts={new Array(6).fill(null).map((e, i) => ({
            line_1: 'Finistère',
            line_2: 'Nathalie Sarrabezolles',
            line_3: 'Les Républicains',
            line_1_style: { fontFamily: 'Libe-Sans-Semicondensed', fontWeight: 400, color: '#191919' },
            line_2_style: { fontFamily: 'Libe-Sans-Semicondensed', fontWeight: 600, color: '#191919' },
            line_3_style: { fontFamily: 'Libe-Sans-Semicondensed', fontWeight: 600, color: 'red' }
          }))} />
        <PrecElections
          elections={[
            {
              title: 'Européennes',
              subtitle: '1er tour — 2019',
              abstention: '52%',
              votes: [
                { label: 'PS', color: 'navy', value: 24 },
                { label: 'NPA', color: 'olive', value: 32 },
                { label: 'LR', color: 'red', value: 16 },
                { label: 'LREM', color: 'yellow', value: 4 },
                { label: 'ABS', color: '#DDDDDD', value: 52 }
              ].map((vote, i) => ({
                ...vote,
                label: <P
                  level={-2}
                  style={{
                    display: 'inline-block',
                    marginLeft: '.125rem',
                    fontFamily: 'Synthese',
                    fontWeight: '400',
                    color: '#FFFFFF',
                    opacity: .95,
                    textAlign: 'center',
                    background: 'rgba(25, 25, 25, .4)',
                    borderRadius: '.125rem',
                    padding: '.125rem'
                  }}>
                  {vote.label}<br />
                  {vote.value}%
                </P>
              }))
            },
            {
              title: 'Présidentielles',
              subtitle: '1er tour — 2017',
              abstention: '46%',
              votes: [
                { label: 'PS', color: 'yellow', value: 24 },
                { label: 'NPA', color: 'olive', value: 32 },
                { label: 'LR', color: 'red', value: 16 },
                { label: 'LREM', color: 'yellow', value: 4 },
                { label: 'ABS', color: '#DDDDDD', value: 46 }
              ].map((vote, i) => ({
                ...vote,
                label: <P
                  level={-2}
                  style={{
                    display: 'inline-block',
                    marginLeft: '.125rem',
                    fontFamily: 'Synthese',
                    fontWeight: '400',
                    color: '#FFFFFF',
                    opacity: .95,
                    textAlign: 'center',
                    background: 'rgba(25, 25, 25, .4)',
                    borderRadius: '.125rem',
                    padding: '.125rem'
                  }}>
                  {vote.label}<br />
                  {vote.value}%
                </P>
              }))
            },
            {
              title: 'Régionales',
              subtitle: '1er tour — 2015',
              abstention: '48%',
              votes: [
                { label: 'PS', color: 'navy', value: 24 },
                { label: 'NPA', color: 'olive', value: 32 },
                { label: 'LR', color: 'red', value: 16 },
                { label: 'LREM', color: 'yellow', value: 4 },
                { label: 'ABS', color: '#DDDDDD', value: 48 }
              ].map((vote, i) => ({
                ...vote,
                label: <P
                  level={-2}
                  style={{
                    display: 'inline-block',
                    marginLeft: '.125rem',
                    fontFamily: 'Synthese',
                    fontWeight: '400',
                    color: '#FFFFFF',
                    opacity: .95,
                    textAlign: 'center',
                    background: 'rgba(25, 25, 25, .4)',
                    borderRadius: '.125rem',
                    padding: '.125rem'
                  }}>
                  {vote.label}<br />
                  {vote.value}%
                </P>
              }))
            }
          ]} />
        {/*<Covid
          regionName={'Bretagne'}
          graphs={[{
            label: 'Incidence',
            legend: 'nombre de cas pour 100 000 hab.',
            data: [1, [1, [1, 1]], [[[[[[0, 0, 2]]]]]], 4]
          }, {
            label: 'Décès',
            legend: 'nombre de décès pour 100 000 hab.',
            data: [5, [1, 2], [2, 6], [1, 1, [7, 3]]]
          }, {
            label: 'Vaccination',
            legend: 'part de la pop. ayant reçu au moins une dose',
            data: [5, [1, 2], [2, 6], [1, 1, [7, 3]]]
          }]} />*/}
        <LaRegion />
        <LaRegion />
      </Carrousel>
    </div>
  }
}

export default Home
