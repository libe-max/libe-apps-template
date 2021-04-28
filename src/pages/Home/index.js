import React, { Component } from 'react' 
import moment from 'moment'
import { scaleLinear, scaleTime } from 'd3'
import perlin from 'perlin-noise'
import AppContext from '../../context'
import BarChart from '../../libe-components/graphs-2/BarChart'
import Grid from '../../libe-components/graphs-2/Grid'
import Paragraph from '../../libe-components/text-levels/Paragraph'
import H1 from '../../libe-components/text/H1'
import H2 from '../../libe-components/text/H2'
import H4 from '../../libe-components/text/H4'
import H5 from '../../libe-components/text/H5'
import H6 from '../../libe-components/text/H6'
import P from '../../libe-components/text/P'
import Span from '../../libe-components/text/Span'
import fibonacci from '../../libe-utils/fibonacci'
import parseTsv from '../../libe-utils/parse-tsv'
import roundNumber from '../../libe-utils/round-number'
import numberToSpacedString from '../../libe-utils/number-to-spaced-string'
import _regions from './regions.json'

const regions = _regions.sort((a, b) => a.name.localeCompare(b.name))

const dataRootUrl = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3006'
  : window.location?.host === 'www.liberation.fr'
    ? 'https://www.liberation.fr/apps/2021/02/vaccins-CN/data'
    : 'https://maximefabas.github.io/apps/2021/02/vaccins-CN/data'

const ageCategories = [{
  name: 'Ensemble',
  value: 'tt',
  data_identifiers: ['tt']
}, {
  name: '18 - 29 ans',
  value: '29',
  data_identifiers: ['24', '29']
}, {
  name: '30 - 39',
  value: '39',
  data_identifiers: ['39']
}, {
  name: '40 - 49',
  value: '49',
  data_identifiers: ['49']
}, {
  name: '50 - 59',
  value: '59',
  data_identifiers: ['59']
}, {
  name: '60 - 69',
  value: '69',
  data_identifiers: ['64', '69']
}, {
  name: '70 - 79',
  value: '79',
  data_identifiers: ['74', '79']
}, {
  name: '80 ans et +',
  value: '80',
  data_identifiers: ['80']
}]

const dataGenerator = (nbChanels, length) => {
  const noises = new Array(nbChanels)
    .fill(null)
    .map(e => perlin.generatePerlinNoise(length, 1, {
      octaveCount: 4,
      amplitude: 0.1,
      persistence: 0.2
    }))
  return new Array(length).fill(null).map((e, i) => {
    return noises.map((line, j) => line[i] * 2500000)
  })
}

const startMoment = moment('15-12-2020', 'DD-MM-YYYY')
const endMoment = moment().add(-1, 'days')
const nbDays = endMoment.diff(startMoment, 'days')

const columns = new Array(nbDays)
  .fill(null)
  .map((e, i) => moment(startMoment)
    .add(i, 'days')
    .format('D MMMM YYYY'))

const nbRegions = regions.length

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
  state = {
    current_filter: 'tt',
    cached_data: {},
    data_error: null,
    columns
  }
  
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-app-home-page'
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.fetchAllData = this.fetchAllData.bind(this)
    this.mergeCsvs = this.mergeCsvs.bind(this)
    try {
      this.fetchAllData()
    } catch (err) {
      alert('error fetching data', err)
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * COMPONENT DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    this.handleFilterClick('tt')
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * HANDLE FILTER CLICK
   *
   * * * * * * * * * * * * * * * * */
  async handleFilterClick (value) {
    const cacheExists = this.state.cached_data[value]
    if (cacheExists) return new Promise((resolve, reject) => this.setState(
      curr => ({
        ...curr,
        current_filter: value,
        current_data: cacheExists
      }),
      cb => resolve()
    ))

    try {
      const allData = await this.fetchAllData(value)
      return new Promise((resolve, reject) => this.setState(
        curr => ({
          ...curr,
          current_filter: value,
          current_data: allData,
          cached_data: {
            ...curr.cached_data,
            [value]: allData
          }
        }),
        cb => resolve()
      ))
    } catch (err) {
      return new Promise((resolve, reject) => this.setState(
        curr => ({ ...curr, data_error: err }),
        cb => resolve()
      ))
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH ALL DATA
   *
   * * * * * * * * * * * * * * * * */
  async fetchAllData (filter = this.state.current_filter) {
    const category = ageCategories.find(cat => cat.value === filter)
    const resourcesList = [{
      filter,
      reg: 'FRA',
      urls: category.data_identifiers.map(id => `${dataRootUrl}/data-france-${id}.csv`)
    },
    ...regions.map(region => ({
      filter,
      reg: region.code,
      urls: category.data_identifiers.map(id => `${dataRootUrl}/data-region-${id}-${region.code}.csv`)
    }))]
    return new Promise((resolve, reject) => {
      Promise.all(resourcesList.map(resources => this.fetchData(resources)))
        .then(success => resolve(success))
        .catch(err => reject(err))
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH DATA
   *
   * * * * * * * * * * * * * * * * */
  async fetchData (resources) {
    const fetched = { ...resources, data: [] }
    return new Promise((resolve, reject) => {
      Promise.all(resources.urls.map(url => window.fetch(url)
        .then(res => res.text())
        .then(data => fetched.data.push(data))
        .catch(err => err)
      )).then(success => {
        const merged = this.mergeCsvs(fetched)
        resolve(merged)
      }).catch(err => reject(err))
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MERGE CSVS
   *
   * * * * * * * * * * * * * * * * */
  mergeCsvs (csvs) {
    const jsons = csvs.data.map(csv => parseTsv(csv, [4], ',')[0])
    const daysObj = {}
    jsons.forEach(json => json.forEach(entry => {
      if (!daysObj[entry.jour]) daysObj[entry.jour] = [0, 0]
      daysObj[entry.jour][0] += parseInt(entry.n_dose1, 10)
      daysObj[entry.jour][1] += Math.ceil(parseInt(entry.n_dose1, 10) / 4)
    }))
    const days = new Array(nbDays).fill(null).map((_, i) => {
      const date = moment(startMoment).add(i, 'days').format('YYYY-MM-DD')
      const nDose1 = daysObj[date] ? daysObj[date][0] : 0
      const nDose2 = daysObj[date] ? daysObj[date][1] : 0
      return { date, n_dose1: nDose1, n_dose2: nDose2 }
    })
    return { ...csvs, days }
  }
  
  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, state, context, c } = this
    const { current_data: data } = state
    const { viewport } = context
    const { rem } = viewport

    const responsiveValue = (values) => {
      if (!Array.isArray(values) || values.length !== 3) return
      const dispName = viewport.display_name
      return dispName === 'lg'
        ? values[0]
        : dispName === 'md'
          ? values[1]
          : values[2]
    }
    
    const width = viewport.width

    if (!data) return <div className={`${c}`} />

    const franceWidth = viewport.width
    const franceHeight = Math.min(Math.floor(franceWidth * 11 / 16), 700)
    const franceMarginTop = responsiveValue([4 * rem, 2 * rem, 2 * rem])

    const titleLevel = responsiveValue([4, 2, 3])
    const titleLineLevel = responsiveValue([2.5, 1, 1.5])
    const legendWidth = responsiveValue([12 * rem, 13 * rem, 9 * rem])
    const legendXPos = responsiveValue([2.5 * rem, 2.5 * rem, width - legendWidth])
    const legendYPos = responsiveValue([3.5 * rem, 3.5 * rem, 1.5 * rem])
    const legend1Label = responsiveValue(['1res vaccinations', '1res vaccinations', '1res vacc.'])
    const legend2Label = responsiveValue(['Vaccination complète', 'Vaccination complète', 'Vacc. complète'])

    const nbRegions = data.length - 1
    const regionSlotsPerLine = Math.max(Math.floor(width / (12 * rem)), 1)
    const regionSlotWidth = (width - 3 * rem) / regionSlotsPerLine
    const regionWidth = regionSlotWidth - 2 * rem
    const regionHeight = Math.floor(regionSlotWidth * 9 / 20)
    const nbLines = Math.ceil(nbRegions / regionSlotsPerLine)

    const height = franceHeight + franceMarginTop + nbLines * (regionHeight + 2 * rem) + 2 * rem + 1 * rem

    const scales = props.data
    const frYScaleMax = scales[`fr_${state.current_filter}`]
    const regYScaleMax = scales[`reg_${state.current_filter}`]

    const frData = data.find(reg => reg.reg === 'FRA').days.map(day => [day.n_dose1, day.n_dose2])

    return <div className={`${c}`}>
      <div className={`${c}__actions`}>
        <Span level={0}>
          {ageCategories.map(category => {
            const classes = [`${c}__filter-button`]
            if (category.value === state.current_filter) classes.push(`${c}__filter-button_active`)
            return <button
              key={category.value}
              className={classes.join(' ')}
              onClick={e => this.handleFilterClick(category.value)}>
              {category.name}
            </button>
          })
        }</Span>
      </div>
      <svg
        className={`${c}__graph`}
        width={width}
        height={height}>
        
        {/* France */}
        <g
          className={`${c}__france`}
          transform={`translate(0 ${franceMarginTop})`}>
          {/* Background */}
          <rect
            x={0}
            y={0}
            width={franceWidth}
            height={franceHeight}
            opacity={0} />
          {/* Grid */}
          <Grid
            x={3 * rem}
            y={5 * rem}
            width={franceWidth - 4 * rem}
            height={franceHeight - 5 * rem}
            xScale={scaleTime().domain([
              moment(startMoment).toDate(),
              moment(startMoment).add(nbDays, 'days').toDate()
            ])}
            yScale={scaleLinear().domain([0, frYScaleMax])}
            xTicks={4}
            yTicks={new Array(7).fill(0).map((e, i) => i * frYScaleMax / 6)}
            xTickFormat={date => moment(date).year() === moment().year() ? moment(date).format('MMM') : moment(date).format('MMM YY')}
            yTickFormat={val => `${roundNumber(val / 1e6, 1)}M` }
            xBottomLabelPosition={({ x, y, val, label }) => ({ x, y: y + .5 * rem })}
            yLeftLabelPosition={({ x, y, val, label }) => ({ y, x: (x - .5 * rem) })} />
          {/* Title */}
          <foreignObject
            x={responsiveValue([3 * rem, 3 * rem, 1 * rem])}
            y={responsiveValue([-3 * rem, -1 * rem, -1.5 * rem])}
            width={20 * rem}
            height={8 * rem}>
            <div style={{ width: 20 * rem, height: 8 * rem }}>
              <H1 level={titleLevel} lineLevel={titleLineLevel}>
                Nombre<br />
                de vaccinations<br />
                en France.
              </H1>
            </div>
          </foreignObject>
          {/* Bars */}
          <BarChart
            x={3 * rem}
            y={3 * rem}
            width={franceWidth - 4 * rem}
            height={franceHeight - 3 * rem}
            bgHoverable={true}
            cursor='pointer'
            stackBars={false}
            accumulate={true}
            min={0}
            max={frYScaleMax}
            columns={state.columns}
            data={frData}
            tooltip={({ val, col, bar, chart, i }) => {
              return <foreignObject
                key={i}
                x={bar.x - ((240 - bar.width) * bar.x / chart.width)}
                x={(chart.width - 240) / 2}
                y={Math.min(5 * rem, chart.height - (104 + 2 * rem))}
                y={Math.min(3 * rem, chart.height - (6 * rem))}
                width={240}
                height={6 * rem}>
                <div style={{
                  width: 240 - 0.5 * rem,
                  margin: 0.25 * rem,
                  background: 'white',
                  padding: '.25rem',
                  boxShadow: '0 0 .25rem 0 rgba(25, 25, 25, .1)'
                }}>
                  <P level={-1} style={{ fontFamily: 'Synthese' }}>
                    <strong style={{ fontWeight: 600 }}>{col}</strong>
                    {val.map((v, j) => <span key={j}>
                      <br />
                      {j === 0 ? '1res' : '2es'} vaccinations : {numberToSpacedString(frData[i][j])}<br />
                      Cumul : {numberToSpacedString(v)}
                    </span>)}
                    <br />
                  </P>
                </div>
              </foreignObject>}} />
          <line 
            x1={3 * rem}
            y1={3 * rem + franceHeight - 3 * rem}
            x2={3 * rem + franceWidth - 4 * rem}
            y2={3 * rem + franceHeight - 3 * rem}
            style={{
              strokeWidth: 1,
              stroke: '#191919',
              strokeLinecap: 'round'
            }} />
          {/* Legend */}
          <foreignObject
            x={legendXPos}
            y={legendYPos}
            width={legendWidth}
            height={8 * rem}>
            <div style={{
              width: legendWidth - 1 * rem,
              margin: .5 * rem,
              padding: '.25rem .5rem',
              background: 'rgba(255, 255, 255, .9)',
              boxShadow: '0 0 .25rem 0 rgba(25, 25, 25, .1)'
            }}>
              <P
                level={-1}
                lineLevel={1}
                style={{
                  fontFamily: 'Synthese',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <Span
                  level={2}
                  lineLevel={1}
                  style={{
                    color: 'rgba(183, 196, 247, 1)' }}>
                  <strong>—</strong>
                </Span>&nbsp;&nbsp;{legend1Label}
              </P>
              <P
                level={-1}
                lineLevel={1}
                style={{
                  fontFamily: 'Synthese',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <Span
                  level={2}
                  lineLevel={1}
                  style={{
                    color: 'rgba(110, 138, 239, 1)' }}>
                  <strong>—</strong>
                </Span>&nbsp;&nbsp;{legend2Label}
              </P>
            </div>
          </foreignObject>
        </g>
        <g
          className={`${c}__regions`}
          transform={`translate(${3 * rem}, ${franceHeight + franceMarginTop + 3 * rem})`}>{
          new Array(nbLines).fill(null).map((line, lineNb) => {
            const loSlotNb = lineNb * regionSlotsPerLine
            const hiSlotNb = Math.min((lineNb + 1) * regionSlotsPerLine, nbRegions)
            const nbSlots = hiSlotNb - loSlotNb
            const lineX = ((regionSlotsPerLine - nbSlots) / 2) * regionSlotWidth
            const lineY = lineNb * (regionHeight + 2 * rem)
            const lineWidth = nbSlots * regionSlotWidth - rem
            const lineHeight = regionHeight
            return <g
              key={lineNb}
              transform={`translate(${lineX}, ${lineY})`}
              className={`${c}__region-line`}>
              <rect x={0} y={0} width={lineWidth} height={lineHeight} opacity={0} />
              <Grid
                x={0}
                y={0}
                width={lineWidth}
                height={lineHeight}
                yScale={scaleLinear().domain([0, regYScaleMax])}
                xTicks={0}
                yTicks={[0, regYScaleMax]}
                yTickFormat={val => `${val}%`}
                yLeftLabelPosition={props => ({ ...props, x: props.x - .5 * rem })} />
              {new Array(nbSlots).fill(null).map((slot, slotNb) => {
                const regionNb = slotNb + lineNb * regionSlotsPerLine
                const region = regions[regionNb]
                const regFilterPop = region.pop[`_${state.current_filter}`]
                const regFilterLimit = regFilterPop * regYScaleMax / 100
                const regionData = data.find(reg => reg.reg === region.code).days.map(day => [day.n_dose1, day.n_dose2])
                return <g key={slotNb}>
                  <Grid
                    x={(slotNb % regionSlotsPerLine) * regionSlotWidth}
                    width={regionWidth}
                    height={regionHeight}
                    xScale={scaleTime().domain([
                      moment(startMoment).toDate(),
                      moment(startMoment).add(nbDays, 'days').toDate()
                    ])}
                    xTicks={2}
                    yTicks={0}
                    xTickFormat={date => moment(date).year() === moment().year() ? moment(date).format('MMM') : moment(date).format('MMM YY')}
                    xBottomLabelPosition={({ x, y, val, label }) => ({ x, y: y + .25 * rem })} />
                  <BarChart                  
                    x={(slotNb % regionSlotsPerLine) * regionSlotWidth}
                    width={regionWidth}
                    height={regionHeight}
                    cursor='pointer'
                    bgHoverable={true}
                    min={0}
                    max={regFilterLimit}
                    columns={state.columns}
                    data={regionData}
                    stackBars={false}
                    accumulate={true}
                    tooltip={({ val, col, bar, chart, i }) => {
                      return <foreignObject
                        x={-.125 * chart.width}
                        y={1.5 * rem}
                        width={1.25 * chart.width}
                        height={3 * rem}>
                        <div style={{
                          maxWidth: 1.25 * chart.width - rem,
                          margin: 0.25 * rem,
                          background: 'white',
                          padding: '.25rem',
                          boxShadow: '0 0 .25rem 0 rgba(25, 25, 25, .1)',
                          textAlign: 'center'
                        }}>
                          <P level={-1} style={{ fontFamily: 'Synthese' }}>
                            <strong style={{ marginRight: '.25rem', fontWeight: 600 }}>{
                              moment(col, 'D MMMM YYYY').format('D MMM')
                            }</strong>
                            <span>1res : {numberToSpacedString(regionData[i][0]).replace(' ', ' ')}</span>
                            <span>, 2es : {numberToSpacedString(regionData[i][1]).replace(' ', ' ')}</span>
                            {/*val.map((v, j) => <span key={j}>
                              Cumul {j === 0 ? '1res' : '2es'} : {numberToSpacedString(v).replace(' ', ' ')}<br />
                            </span>)*/}
                          </P>
                        </div>
                      </foreignObject>
                    }} />
                  {/* Title */}
                  <foreignObject
                    x={(slotNb % regionSlotsPerLine) * regionSlotWidth}
                    y={0}
                    width={regionWidth}
                    height={2 * rem}>
                    <div style={{ width: regionWidth, height: 2 * rem }}>
                      <P
                        level={-.5}
                        style={{
                          textAlign: 'center',
                          fontFamily: 'Libe-Sans-Semicondensed',
                          fontWeight: 600,
                          letterSpacing: '.03em',
                          textShadow: '1px 1px 0 white'
                        }}>{regions[regionNb].name}</P>
                    </div>
                  </foreignObject>
                </g>
              })}
              <line 
                x1={0}
                y1={lineHeight}
                x2={lineWidth}
                y2={lineHeight}
                style={{ strokeWidth: 1, stroke: '#191919', strokeLinecap: 'round' }} />
            </g>
          })
        }</g>
      </svg>
    </div>
  }
}

export default Home
