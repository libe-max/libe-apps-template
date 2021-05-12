import React, { Component } from 'react' 
import Carrousel from './components/blocks/Carrousel'
import AppContext from '../../context'

import H1 from '../../libe-components/text/H1'
import H3 from '../../libe-components/text/H3'
import P from '../../libe-components/text/P'
import Span from '../../libe-components/text/Span'
import JSXInterpreter from '../../libe-components/logic/JSXInterpreter'

import prettyNumber from '../../libe-utils/number-to-spaced-string'

import Test from './components/cards/Test'
import VueEnsemble from './components/cards/VueEnsemble'
import LaRegion from './components/cards/LaRegion'
import LeDepartement from './components/cards/LeDepartement'
import PrecElections from './components/cards/PrecElections'
import Covid from './components/cards/Covid'
import Population from './components/cards/Population'
import Territoire from './components/cards/Territoire'
import Chomage from './components/cards/Chomage'
import Budget from './components/cards/Budget'

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

const windowSearch = {}
window
  .location
  .search
  .slice(1)
  .split('&')
  .map(e => e.split('='))
  .map(([key, value]) => (windowSearch[key] = value))

class Home extends Component {
  state = {
    data: null,
    active_region_id: windowSearch.r ?? 'bre',
    init_slide: parseInt(windowSearch.p ?? 0)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-app-home-page'
    this.parseData = this.parseData.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * PARSE DATA
   *
   * * * * * * * * * * * * * * * * */
  parseData (rawData) {
    /* REGIONS */
    const regionsRawData = rawData.map(line => line.slice(0, 18)).filter(line => line.join(''))
    const departmentsRawData = rawData.map(line => line.slice(18, 25))
    const partiesRawData = rawData.map(line => line.slice(25))

    const regionsKeys = regionsRawData.map(line => line[0])
    const regionIds = regionsRawData[0].slice(1)
    
    const regions = regionIds.map((id, _idCol) => {
      const idCol = _idCol + 1
      const valuesArr = regionsRawData.map((line, linePos) => {
        const value = line[idCol]
        return value
      })
      const region = { id }
      regionsKeys.forEach((key, keyPos) => {
        region[key] = valuesArr[keyPos]
      })
      return region
    })

    /* DEPARTMENTS */
    const departmentsKeys = departmentsRawData[0]
    const departments = departmentsRawData
      .slice(1)
      .map((line, linePos) => {
        if (!line.join('')) return
        const department = {}
        departmentsKeys.forEach((key, keyPos) => {
          department[key] = line[keyPos]
        })
        return department
      }).filter(e => e)

    /* PARTIES */
    const partiesKeys = partiesRawData[0]
    const parties = partiesRawData
      .slice(1)
      .map((line, linePos) => {
        if (!line.join('')) return
        const party = {}
        partiesKeys.forEach((key, keyPos) => {
          party[key] = line[keyPos]
        })
        return party
      }).filter(e => e)

    /* FIND REGION, DEPARTMENT, PARTY BY ID */
    const findRegionById = id => regions.find(region => region.id === id)
    const findDepartmentById = id => departments.find(department => department.id === id)
    const findPartyById = id => parties.find(party => party.id === id)

    return {
      regions,
      departments,
      parties,
      findRegionById,
      findDepartmentById,
      findPartyById
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    const { props } = this
    const data = this.parseData(props.data)
    this.setState({ data })
  }
  
  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, state, context, c } = this
    const { viewport } = context
    const { rem } = viewport
    const { data } = state
    if (!data) return <div className={c} />

    const activeRegionId = state.active_region_id
    const initialSlide = state.init_slide
    const region = data.findRegionById(activeRegionId)
    const departments = data.departments.filter(department => department.region_id === region.id)
    const party = data.findPartyById(region.president_party_id) || {}

    return <div className={c}>
      <H1 level={3} className='region-name'>{region.name}</H1>
      <Carrousel settings={{ initialSlide }}>
        <VueEnsemble
          mapUrl={region.map_overall_url}
          regionFacts={[{
            line_1: <JSXInterpreter content={region.population_label ?? ''} />,
            line_2: <JSXInterpreter content={`${prettyNumber(region.population)} ${region.population_unit}`} />,
            line_1_style: { color: '#191919' },
            line_2_style: { color: '#dd0013' }
          }, {
            line_1: <JSXInterpreter content={region.density_label ?? ''} />,
            line_2: <JSXInterpreter content={`${prettyNumber(region.density)} ${region.density_unit}`} />,
            line_1_style: { color: '#191919' },
            line_2_style: { color: '#dd0013' }
          }, {
            line_1: <JSXInterpreter content={region.capital_label ?? ''} />,
            line_2: <JSXInterpreter content={region.capital_name ?? ''} />,
            line_3: <JSXInterpreter content={`${prettyNumber(region.capital_population)} ${region.capital_population_unit}`} />,
            line_1_style: { color: '#191919' },
            line_2_style: { color: '#191919' },
            line_3_style: { color: '#dd0013' }
          }, {
            line_1: <JSXInterpreter content={region.president_label ?? ''} />,
            line_2: <JSXInterpreter content={region.president_name ?? ''} />,
            line_3: <JSXInterpreter content={party.name ?? ''} />,
            line_1_style: { color: '#191919' },
            line_2_style: { color: '#191919' },
            line_3_style: { color: party.color }
          }]} />
        <LaRegion
          mapUrl={region.map_region_url}
          presidentColor={party.color}
          presidentPhoto={region.president_photo}
          presidentName={<JSXInterpreter content={region.president_name ?? ''} />}
          presidentLabel={<JSXInterpreter content={region.president_label ?? ''} />}
          presidentParty={<JSXInterpreter content={party.name ?? ''} />}
          nbSeats={<JSXInterpreter content={region.nb_seats ?? ''} />}
          nbSeatsLabel={<JSXInterpreter content={region.nb_seats_label ?? ''} />}
          seatsDistribution={region.seats_infog_url} />
        <LeDepartement
          mapUrl={region.map_departments_url}
          departmentFacts={
            departments.map((department) => {
              const line1 = `${department.name} (${department.number})`
              const deptPresidentParty = data.findPartyById(department.president_party_id)
              const line2 = `${department.president_short_name}&nbsp;(${deptPresidentParty.short_name})`
              return {
                line_1: <JSXInterpreter content={line1} />,
                line_2: <JSXInterpreter content={line2} />,
                line_1_style: { fontFamily: 'Synthese', fontWeight: 600, color: '#191919' },
                line_2_style: { fontFamily: 'Synthese', fontWeight: 400, color: deptPresidentParty.color }
              }
          })} />
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
        <Covid
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
          }]} />
        <Population
          regionName={'Bretagne'} />
        <Territoire />
        <Chomage
          regionName={'Bretagne'}
          graphs={[{
            label: 'Incidence',
            legend: 'nombre de cas pour 100 000 hab.',
            data: [1, [1, [1, 1]], [[[[[[0, 0, 2]]]]]], 4]
          }, {
            label: 'Décès',
            legend: 'nombre de décès pour 100 000 hab.',
            data: [5, [1, 2], [2, 6], [1, 1, [7, 3]]]
          }]} />
        <Budget />
        {/*
          <Test />
          <LaRegion />
          <LaRegion />
        */}
      </Carrousel>
    </div>
  }
}

export default Home
