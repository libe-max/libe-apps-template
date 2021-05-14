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
    const region = data.findRegionById(activeRegionId) ?? data.findRegionById('ara')
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
          elections={[{
            title: <JSXInterpreter content={region.election_2015_label} />,
            subtitle: <JSXInterpreter content={region.election_2015_sublabel} />,
            abstention_label: <JSXInterpreter content={region.election_2015_abstention_label} />,
            abstention: <JSXInterpreter content={region.election_2015_abstention} />,
            votes: (region.election_2015_result ?? '')
              .replace('{', '').replace('}', '')
              .trim()
              .split(',')
              .map(e => {
                const [_id, _score] = e.trim().split(':')
                const id = _id.trim()
                const score = parseFloat(_score)
                const party = data.findPartyById(id)
                return {
                  label: id?.toUpperCase(),
                  color: party?.color,
                  score: score
                }
              })
          }, {
            title: <JSXInterpreter content={region.election_2017_label} />,
            subtitle: <JSXInterpreter content={region.election_2017_sublabel} />,
            abstention_label: <JSXInterpreter content={region.election_2017_abstention_label} />,
            abstention: <JSXInterpreter content={region.election_2017_abstention} />,
            votes: (region.election_2017_result ?? '')
              .replace('{', '').replace('}', '')
              .split(',')
              .map(e => {
                const [_id, _score] = e.trim().split(':')
                const id = _id.trim()
                const score = parseFloat(_score)
                const party = data.findPartyById(id)
                return {
                  label: id?.toUpperCase(),
                  color: party?.color,
                  score: score
                }
              })
          }, {
            title: <JSXInterpreter content={region.election_2019_label} />,
            subtitle: <JSXInterpreter content={region.election_2019_sublabel} />,
            abstention_label: <JSXInterpreter content={region.election_2019_abstention_label} />,
            abstention: <JSXInterpreter content={region.election_2019_abstention} />,
            votes: (region.election_2019_result ?? '')
              .replace('{', '').replace('}', '')
              .split(',')
              .map(e => {
                const [_id, _score] = e.trim().split(':')
                const id = _id.trim()
                const score = parseFloat(_score)
                const party = data.findPartyById(id)
                return {
                  label: id?.toUpperCase(),
                  color: party?.color,
                  score: score
                }
              })
          }]} />
        
        <Covid
          regionName={region.name}
          graphs={[{
            label: <JSXInterpreter content={region.covid_incidence_label} />,
            legend: <JSXInterpreter content={region.covid_incidence_sublabel} />,
            domain: (region.covid_incidence_data_domain ?? '')
              .replace('[', '').replace(']', '')
              .split(',')
              .map(e => parseFloat(e.trim())),
            data: (region.covid_incidence ?? '')
              .replace('[', '').replace(']', '')
              .split(',')
              .map(e => parseFloat(e.trim())),
            data: new Array(100).fill(null).map(e => Math.random() * 100),
            france_data: (region.covid_france_incidence ?? '')
              .replace('[', '').replace(']', '')
              .split(',')
              .map(e => parseFloat(e.trim()))
          }, {
            label: <JSXInterpreter content={region.covid_deaths_label} />,
            legend: <JSXInterpreter content={region.covid_deaths_sublabel} />,
            domain: (region.covid_incidence_data_domain ?? '')
              .replace('[', '').replace(']', '')
              .split(',')
              .map(e => parseFloat(e.trim())),
            data: (region.covid_deaths ?? '')
              .replace('[', '').replace(']', '')
              .split(',')
              .map(e => parseFloat(e.trim())),
            france_data: (region.covid_france_deaths ?? '')
              .replace('[', '').replace(']', '')
              .split(',')
              .map(e => parseFloat(e.trim()))
          }, {
            label: <JSXInterpreter content={region.covid_vaccination_label} />,
            legend: <JSXInterpreter content={region.covid_vaccination_sublabel} />,
            domain: (region.covid_incidence_data_domain ?? '')
              .replace('[', '').replace(']', '')
              .split(',')
              .map(e => parseFloat(e.trim())),
            data: (region.covid_vaccination ?? '')
              .replace('[', '').replace(']', '')
              .split(',')
              .map(e => parseFloat(e.trim())),
            france_data: (region.covid_france_vaccination ?? '')
              .replace('[', '').replace(']', '')
              .split(',')
              .map(e => parseFloat(e.trim()))
          }]} />
        
        <Population
          regionName={region.name}
          graphLabel={<JSXInterpreter content={region.population_breakdown_label} />}
          population={region.population}
          populationUnit={<JSXInterpreter content={region.population_unit} />}
          domain={(region.population_breakdown_domain ?? '')
            .replace('[', '').replace(']', '')
            .split(',')
            .map(e => parseFloat(e.trim()))}
          maleData={(region.male_population_breakdown ?? '')
            .replace('[', '').replace(']', '')
            .split(',')
            .map(e => parseFloat(e.trim()))
            .reverse()}
          femaleData={(region.female_population_breakdown ?? '')
            .replace('[', '').replace(']', '')
            .split(',')
            .map(e => parseFloat(e.trim()))
            .reverse()}
          maleFranceData={(region.male_france_population_breakdown ?? '')
            .replace('[', '').replace(']', '')
            .split(',')
            .map(e => parseFloat(e.trim()))
            .reverse()}
          femaleFranceData={(region.female_france_population_breakdown ?? '')
            .replace('[', '').replace(']', '')
            .split(',')
            .map(e => parseFloat(e.trim()))
            .reverse()} />
        
        <Territoire
          superficyLabel={<JSXInterpreter content={region.superficy_label} />}
          superficy={parseFloat(region.superficy ?? 0)}
          superficyUnit={<JSXInterpreter content={region.superficy_unit} />}
          agriSuperficyLabel={<JSXInterpreter content={region.agri_superficy_label} />}
          agriSuperficy={parseFloat(region.agri_superficy ?? 0)}
          artiSuperficyLabel={<JSXInterpreter content={region.arti_superficy_label} />}
          artiSuperficy={parseFloat(region.arti_superficy ?? 0)}
          natuSuperficyLabel={<JSXInterpreter content={region.natu_superficy_label} />}
          natuSuperficy={parseFloat(region.natu_superficy ?? 0)}
          densityLabel={<JSXInterpreter content={region.density_label} />}
          density={parseFloat(region.density ?? 0)}
          densityGraph={region.density_graph}
          densityUnit={<JSXInterpreter content={region.density_unit} />}
          franceDensity={parseFloat(region.franceDensity ?? 0)}
          natuColor={region.natu_color}
          agriColor={region.agri_color}
          artiColor={region.arti_color}
          noneColor={region.none_color}
          franceAgriSuperficy={region.france_agri_superficy}
          franceArtiSuperficy={region.france_arti_superficy}
          franceNatuSuperficy={region.france_natu_superficy} />
        
        <Chomage
          regionName={region.name}
          currentUnemploymentRates={region.current_unemployment_rate}
          currentPovertyRates={region.current_poverty_rate}
          franceCurrentUnemploymentRate={region.france_current_unemployment_rate}
          franceUnemploymentRates={region.france_unemployment_rates}
          franceCurrentPovertyRate={region.france_current_poverty_rate}
          francePovertyRates={region.france_poverty_rates}
          graphs={[{
            label: <JSXInterpreter content={region.unemployment_rates_label} />,
            data: (region.unemployment_rates ?? '')
              .replace('[', '').replace(']', '')
              .split(',')
              .map(e => parseFloat(e.trim()))
          }, {
            label: <JSXInterpreter content={region.poverty_rates_label} />,
            data: (region.poverty_rates ?? '')
              .replace('[', '').replace(']', '')
              .split(',')
              .map(e => parseFloat(e.trim()))
          }]} />
        
        <Budget
          incomeLabel={region.income_label}
          income={region.income}
          incomeAvgLabel={region.income_avg_label}
          incomeAvg={region.income_avg}
          incomeMax={region.income_max}
          incomeUnit={region.income_unit}
          outcomeLabel={region.outcome_label}
          outcome={region.outcome}
          outcomeAvgLabel={region.outcome_avg_label}
          outcomeAvg={region.outcome_avg}
          outcomeMax={region.outcome_max}
          outcomeUnit={region.outcome_unit}
          trainOutcomeLabel={region.train_outcome_label}
          trainOutcome={region.train_outcome}
          trainOutcomeUnit={region.train_outcome_unit}
          highschoolOutcomeLabel={region.highschool_outcome_label}
          highschoolOutcome={region.highschool_outcome}
          highschoolOutcomeUnit={region.highschool_outcome_unit}
          trainingOutcomeLabel={region.training_outcome_label}
          trainingOutcome={region.training_outcome}
          trainingOutcomeUnit={region.training_outcome_unit}
          outcomeItemMax={region.outcome_item_max} />
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
