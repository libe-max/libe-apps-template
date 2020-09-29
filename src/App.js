import React, { Component } from 'react'
import ArticleMeta from './libe-components/blocks/ArticleMeta'
import LibeLaboLogo from './libe-components/blocks/LibeLaboLogo'
import Loader from './libe-components/blocks/Loader'
import LoadingError from './libe-components/blocks/LoadingError'
import Paragraph from './libe-components/text-levels/Paragraph'
import AnnotationTitle from './libe-components/text-levels/AnnotationTitle'
import Annotation from './libe-components/text-levels/Annotation'
import ParagraphTitle from './libe-components/text-levels/ParagraphTitle'
import Slug from './libe-components/text-levels/Slug'
import PageTitle from './libe-components/text-levels/PageTitle'
import ShareArticle from './libe-components/blocks/ShareArticle'
import chroma from 'chroma-js'

export default class App extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor (props) {
    super(props)
    this.c = props.meta.slug
    this.state = {
      loading_sheet: true,
      error_sheet: null,
      data_sheet: [],
      konami_mode: false,
      sort: 'France',
      hover: null,
      data: [{
        month: 1,
        month_name: '',
        total: 213,
        detail: [
          { name: 'France', deaths: 0 },
          { name: 'Italie', deaths: 0 },
          { name: 'Espagne', deaths: 0 },
          { name: 'Royaume-Uni', deaths: 0 },
          { name: 'Etats-Unis', deaths: 0 },
          { name: 'Mexique', deaths: 0 },
          { name: 'Brésil', deaths: 0 },
          { name: 'Pérou', deaths: 0 },
          { name: 'Autres', deaths: 213 }
        ]
      }, {
        month: 2,
        month_name: '',
        total: 2714,
        detail: [
          { name: 'France', deaths: 2 },
          { name: 'Italie', deaths: 21 },
          { name: 'Espagne', deaths: 0 },
          { name: 'Royaume-Uni', deaths: 0 },
          { name: 'Etats-Unis', deaths: 0 },
          { name: 'Mexique', deaths: 0 },
          { name: 'Brésil', deaths: 0 },
          { name: 'Pérou', deaths: 0 },
          { name: 'Autres', deaths: 2691 }
        ]
      }, {
        month: 3,
        month_name: 'Janvier, Février & Mars',
        total: 35799,
        detail: [
          { name: 'France', deaths: 3022 },
          { name: 'Italie', deaths: 11570 },
          { name: 'Espagne', deaths: 7340 },
          { name: 'Royaume-Uni', deaths: 2050 },
          { name: 'Etats-Unis', deaths: 3170 },
          { name: 'Mexique', deaths: 28 },
          { name: 'Brésil', deaths: 159 },
          { name: 'Pérou', deaths: 24 },
          { name: 'Autres', deaths: 8436 }
        ]
      }, {
        month: 4,
        month_name: 'Avril',
        total: 189176,
        detail: [
          { name: 'France', deaths: 21063 },
          { name: 'Italie', deaths: 16091 },
          { name: 'Espagne', deaths: 17203 },
          { name: 'Royaume-Uni', deaths: 23999 },
          { name: 'Etats-Unis', deaths: 57796 },
          { name: 'Mexique', deaths: 1704 },
          { name: 'Brésil', deaths: 5307 },
          { name: 'Pérou', deaths: 919 },
          { name: 'Autres', deaths: 45094 }
        ]
      }, {
        month: 5,
        month_name: 'Mai',
        total: 140149,
        detail: [
          { name: 'France', deaths: 4684 },
          { name: 'Italie', deaths: 5668 },
          { name: 'Espagne', deaths: 2584 },
          { name: 'Royaume-Uni', deaths: 11336 },
          { name: 'Etats-Unis', deaths: 42815 },
          { name: 'Mexique', deaths: 8047 },
          { name: 'Brésil', deaths: 23368 },
          { name: 'Pérou', deaths: 3428 },
          { name: 'Autres', deaths: 38229 }
        ]
      }, {
        month: 6,
        month_name: 'Juin',
        total: 134078,
        detail: [
          { name: 'France', deaths: 1042 },
          { name: 'Italie', deaths: 1404 },
          { name: 'Espagne', deaths: 1228 },
          { name: 'Royaume-Uni', deaths: 2956 },
          { name: 'Etats-Unis', deaths: 22359 },
          { name: 'Mexique', deaths: 17342 },
          { name: 'Brésil', deaths: 29480 },
          { name: 'Pérou', deaths: 5133 },
          { name: 'Autres', deaths: 53134 }
        ]
      }, {
        month: 7,
        month_name: 'Juillet',
        total: 166208,
        detail: [
          { name: 'France', deaths: 441 },
          { name: 'Italie', deaths: 388 },
          { name: 'Espagne', deaths: 90 },
          { name: 'Royaume-Uni', deaths: 828 },
          { name: 'Etats-Unis', deaths: 25930 },
          { name: 'Mexique', deaths: 18879 },
          { name: 'Brésil', deaths: 32949 },
          { name: 'Pérou', deaths: 9517 },
          { name: 'Autres', deaths: 77186 }
        ]
      }, {
        month: 8,
        month_name: 'Août',
        total: 178628,
        detail: [
          { name: 'France', deaths: 352 },
          { name: 'Italie', deaths: 345 },
          { name: 'Espagne', deaths: 649 },
          { name: 'Royaume-Uni', deaths: 330 },
          { name: 'Etats-Unis', deaths: 30999 },
          { name: 'Mexique', deaths: 18158 },
          { name: 'Brésil', deaths: 29565 },
          { name: 'Pérou', deaths: 9767 },
          { name: 'Autres', deaths: 88463 }
        ]
      }, {
        month: 9,
        month_name: 'Septembre',
        total: 153035,
        detail: [
          { name: 'France', deaths: 853 },
          { name: 'Italie', deaths: 281 },
          { name: 'Espagne', deaths: 1940 },
          { name: 'Royaume-Uni', deaths: 363 },
          { name: 'Etats-Unis', deaths: 18840 },
          { name: 'Mexique', deaths: 10791 },
          { name: 'Brésil', deaths: 18149 },
          { name: 'Pérou', deaths: 3082 },
          { name: 'Autres', deaths: 98736 }
        ]
      }]
    }
    this.fetchSheet = this.fetchSheet.bind(this)
    this.watchKonamiCode = this.watchKonamiCode.bind(this)
    this.activateFilter = this.activateFilter.bind(this)
    this.activateHover = this.activateHover.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    document.addEventListener('keydown', this.watchKonamiCode)
    if (this.props.spreadsheet_id) return this.fetchSheet()
    return this.setState({ loading_sheet: false })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WILL UNMOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentWillUnmount () {
    document.removeEventListener('keydown', this.watchKonamiCode)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH SHEET
   *
   * * * * * * * * * * * * * * * * */
  async fetchSheet () {
    this.setState({ loading_sheet: true, error_sheet: null })
    const { proxydata_url: proxydataUrl, spreadsheet_id: spreadsheetId } = this.props
    try {
      const url = `${proxydataUrl}/proxy/spreadsheets/${spreadsheetId}`
      const reach = await window.fetch(url)
      if (!reach.ok) throw reach
      const { data, err } = await reach.json()
      if (err) throw err
      const parsedData = data // Parse sheet here
      this.setState({ loading_sheet: false, error_sheet: null, data_sheet: parsedData })
      return data
    } catch (error) {
      if (error.status) {
        const text = `${error.status} error while fetching : ${spreadsheetId}`
        this.setState({ loading_sheet: false, error_sheet: error })
        console.error(text, error)
        return Error(text)
      } else {
        this.setState({ loading_sheet: false, error_sheet: error })
        console.error(error)
        return Error(error)
      }
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WATCH KONAMI CODE
   *
   * * * * * * * * * * * * * * * * */
  keystrokesHistory = []
  watchKonamiCode (e) {
    if (!e || !e.keyCode) return
    this.keystrokesHistory.push(e.keyCode)
    const konamiCodeStr = '38,38,40,40,37,39,37,39,66,65'
    const lastTen = this.keystrokesHistory.slice(-10)
    if (lastTen.join(',') === konamiCodeStr) this.setState({ konami_mode: true })
    else if (lastTen.reverse().join(',') === konamiCodeStr) this.setState({ konami_mode: false })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * ACTIVATE FILTER
   *
   * * * * * * * * * * * * * * * * */
  activateFilter (value) {
    this.setState(curr => ({
      sort: value,
      hover: curr.hover === value ? null : curr.hover
    }))
  }

  /* * * * * * * * * * * * * * * * *
   *
   * ACTIVATE HOVER
   *
   * * * * * * * * * * * * * * * * */
  activateHover (value) {
    this.setState(curr => ({ hover: curr.sort === value ? null : value }))
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, state, props } = this

    /* Assign classes */
    const classes = [c]
    if (state.loading_sheet) classes.push(`${c}_loading`)
    if (state.error_sheet) classes.push(`${c}_error`)
    if (state.konami_mode) classes.push(`${c}_konami`)

    /* Load & errors */
    if (state.loading_sheet) {
      return <div className={classes.join(' ')}>
        <div className='lblb-default-apps-loader'>
          <Loader />
        </div>
      </div>
    } else if (state.error_sheet) {
      return <div className={classes.join(' ')}>
        <div className='lblb-default-apps-error'>
          <Paragraph>{state.error_sheet.message}</Paragraph>
          <LoadingError />
        </div>
      </div>
    }

    /* Display component */
    return <div className={classes.join(' ')}>

      {/* Head */}
      <div className={`${c}__head`}>
        <div className={`${c}__overhead`}><PageTitle level={1} big>Covid 19</PageTitle></div>
        <div className={`${c}__title`}><PageTitle level={2} big>Un million de morts</PageTitle></div>
        <div className={`${c}__intro`}><Paragraph literary>Un paragraphe</Paragraph></div>
      </div>
    
      {/* Filters */}
      <div
        className={`${c}__filters`}
        style={{ top: `calc(${props.viewport.nav_height}px)` }}>
        {state.data[0].detail.map(country => {
          const classes = [`${c}__filter-option`]
          if (country.name === state.sort) classes.push(`${c}__filter-option_active`)
          if (country.name === state.hover) classes.push(`${c}__filter-option_hover`)
          return <span
            className={classes.join(' ')}
            onMouseEnter={e => this.activateHover(country.name)}
            onMouseLeave={e => this.activateHover(null)}
            onClick={e => this.activateFilter(country.name)}>
            <AnnotationTitle>
              <span onMouseEnter={e => this.activateHover(country.name)}>
                {country.name}
              </span>
            </AnnotationTitle>
          </span>
        })}
      </div>
      
      {/* Content */}
      <div className={`${c}__content`}>
        {state.data.map(month => {
          const { width, display } = props.viewport
          const totalHeight = display === 'lg'
            ? 1.2 * width
            : display === 'md'
              ? 1.8 * width
              : 3.5 * width
          const heightPercent = month.total / 1000000
          const height = `${totalHeight * heightPercent}px`
          return <div
            className={`${c}__month-line`}
            style={{ height }}
            key={month.month}>
            <div className={`${c}__month-name`}>
              <AnnotationTitle big>{month.month_name}</AnnotationTitle>
              <Paragraph small literary>{month.month_name ? `${month.total} morts` : null}</Paragraph>
              <Paragraph small literary>{month.month_name ? `dont ${month.detail[0].deaths} en France` : null}</Paragraph>
            </div>
            {month.detail.map(country => {
              const width = `${100 * country.deaths / month.total}%`
              const classes = [`${c}__country-cell`]
              if (country.name === state.sort) classes.push(`${c}__country-cell_active`)
              if (country.name === state.hover) classes.push(`${c}__country-cell_hover`)
              return <div
                className={classes.join(' ')}
                style={{ width }}
                onClick={e => this.activateFilter(country.name)}
                onMouseEnter={e => this.activateHover(country.name)}
                onMouseLeave={e => this.activateHover(null)}>
                <span className={`${c}__country-deaths`}>
                  <Annotation literary small>{
                    month.month_name
                    && country.name !== 'France'
                    && country.deaths
                  }</Annotation>
                </span>
              </div>
            })}
          </div>
        })}
      </div>
      
      {/* Footer */}
      <div className='lblb-default-apps-footer'>
        <ShareArticle
          short
          iconsOnly
          tweet={props.meta.tweet}
          url={props.meta.url} />
        <ArticleMeta
          publishedOn={props.meta.published_on}
          updatedOn={props.meta.updated_on}
          authors={props.meta.authors} />
        <LibeLaboLogo target='blank' />
      </div>
    </div>
  }
}
