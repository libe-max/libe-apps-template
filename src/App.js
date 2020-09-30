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
import JSXInterpreter from './libe-components/logic/JSXInterpreter'
import numberToSpacedString from './libe-utils/number-to-spaced-string'
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
          { name: 'France', short_name: 'FRA', deaths: 0 },
          { name: 'Italie', short_name: 'ITA', deaths: 0 },
          { name: 'Espagne', short_name: 'ESP', deaths: 0 },
          { name: 'Royaume-Uni', short_name: 'UK', deaths: 0 },
          { name: 'Etats-Unis', short_name: 'USA', deaths: 0  },
          { name: 'Russie', short_name: 'RUS', deaths: 0  },
          { name: 'Chine', short_name: 'CHN', deaths: 213 },
          { name: 'Mexique', short_name: 'MEX', deaths: 0 },
          { name: 'Brésil', short_name: 'BRE', deaths: 0 },
          { name: 'Pérou', short_name: 'PER', deaths: 0 },
          { name: 'Colombie', short_name: 'COL', deaths: 0 },
          { name: 'Inde', short_name: 'IND', deaths: 0 },
          { name: 'Iran', short_name: 'IRA', deaths: 0 },
          { name: 'Autres pays', short_name: 'Autres', deaths: 0 }
        ]
      }, {
        month: 2,
        month_name: '',
        total: 2942,
        detail: [
          { name: 'France', short_name: 'FRA', deaths: 2 },
          { name: 'Italie', short_name: 'ITA', deaths: 29 },
          { name: 'Espagne', short_name: 'ESP', deaths: 1 },
          { name: 'Royaume-Uni', short_name: 'UK', deaths: 0 },
          { name: 'Etats-Unis', short_name: 'USA', deaths: 0  },
          { name: 'Russie', short_name: 'RUS', deaths: 0  },
          { name: 'Chine', short_name: 'CHN', deaths: 2838 },
          { name: 'Mexique', short_name: 'MEX', deaths: 0 },
          { name: 'Brésil', short_name: 'BRE', deaths: 0 },
          { name: 'Pérou', short_name: 'PER', deaths: 0 },
          { name: 'Colombie', short_name: 'COL', deaths: 0 },
          { name: 'Inde', short_name: 'IND', deaths: 0 },
          { name: 'Iran', short_name: 'IRA', deaths: 43 },
          { name: 'Autres pays', short_name: 'Autres', deaths: 29 }
        ]
      }, {
        month: 3,
        month_name: 'Janvier,<br />Février & Mars',
        total: 37842,
        detail: [
          { name: 'France', short_name: 'FRA', deaths: 3015 },
          { name: 'Italie', short_name: 'ITA', deaths: 11562 },
          { name: 'Espagne', short_name: 'ESP', deaths: 10045 },
          { name: 'Royaume-Uni', short_name: 'UK', deaths: 2050 },
          { name: 'Etats-Unis', short_name: 'USA', deaths: 2398  },
          { name: 'Russie', short_name: 'RUS', deaths: 9  },
          { name: 'Chine', short_name: 'CHN', deaths: 476},
          { name: 'Mexique', short_name: 'MEX', deaths: 20 },
          { name: 'Brésil', short_name: 'BRE', deaths: 136 },
          { name: 'Pérou', short_name: 'PER', deaths: 11 },
          { name: 'Colombie', short_name: 'COL', deaths: 10 },
          { name: 'Inde', short_name: 'IND', deaths: 32 },
          { name: 'Iran', short_name: 'IRA', deaths: 2855 },
          { name: 'Autres pays', short_name: 'Autres', deaths: 5223 }
        ]
      }, {
        month: 4,
        month_name: 'Avril',
        total: 183727,
        detail: [
          { name: 'France', short_name: 'FRA', deaths: 21037 },
          { name: 'Italie', short_name: 'ITA', deaths: 16091 },
          { name: 'Espagne', short_name: 'ESP', deaths: 14971 },
          { name: 'Royaume-Uni', short_name: 'UK', deaths: 23999 },
          { name: 'Etats-Unis', short_name: 'USA', deaths: 55332 },
          { name: 'Russie', short_name: 'RUS', deaths: 1064 },
          { name: 'Chine', short_name: 'CHN', deaths: 1329},
          { name: 'Mexique', short_name: 'MEX', deaths: 1549 },
          { name: 'Brésil', short_name: 'BRE', deaths: 4881 },
          { name: 'Pérou', short_name: 'PER', deaths: 843 },
          { name: 'Colombie', short_name: 'COL', deaths: 259 },
          { name: 'Inde', short_name: 'IND', deaths: 1042 },
          { name: 'Iran', short_name: 'IRA', deaths: 3130 },
          { name: 'Autres pays', short_name: 'Autres', deaths: 38200 }
        ]
      }, {
        month: 5,
        month_name: 'Mai',
        total: 141773,
        detail: [
          { name: 'France', short_name: 'FRA', deaths: 4663 },
          { name: 'Italie', short_name: 'ITA', deaths: 5658 },
          { name: 'Espagne', short_name: 'ESP', deaths: 2946 },
          { name: 'Royaume-Uni', short_name: 'UK', deaths: 11336 },
          { name: 'Etats-Unis', short_name: 'USA', deaths: 44910 },
          { name: 'Russie', short_name: 'RUS', deaths: 3620 },
          { name: 'Chine', short_name: 'CHN', deaths: 2},
          { name: 'Mexique', short_name: 'MEX', deaths: 7846 },
          { name: 'Brésil', short_name: 'BRE', deaths: 22861 },
          { name: 'Pérou', short_name: 'PER', deaths: 3376 },
          { name: 'Colombie', short_name: 'COL', deaths: 584 },
          { name: 'Inde', short_name: 'IND', deaths: 4090 },
          { name: 'Iran', short_name: 'IRA', deaths: 1706 },
          { name: 'Autres pays', short_name: 'Autres', deaths: 28175 }
        ]
      }, {
        month: 6,
        month_name: 'Juin',
        total: 134365,
        detail: [
          { name: 'France', short_name: 'FRA', deaths: 1013 },
          { name: 'Italie', short_name: 'ITA', deaths: 1404 },
          { name: 'Espagne', short_name: 'ESP', deaths: 388 },
          { name: 'Royaume-Uni', short_name: 'UK', deaths: 2956 },
          { name: 'Etats-Unis', short_name: 'USA', deaths: 23563 },
          { name: 'Russie', short_name: 'RUS', deaths: 4627 },
          { name: 'Chine', short_name: 'CHN', deaths: 3},
          { name: 'Mexique', short_name: 'MEX', deaths: 17233 },
          { name: 'Brésil', short_name: 'BRE', deaths: 29744 },
          { name: 'Pérou', short_name: 'PER', deaths: 5087 },
          { name: 'Colombie', short_name: 'COL', deaths: 2253 },
          { name: 'Inde', short_name: 'IND', deaths: 11729 },
          { name: 'Iran', short_name: 'IRA', deaths: 2936 },
          { name: 'Autres pays', short_name: 'Autres', deaths: 31429 }
        ]
      }, {
        month: 7,
        month_name: 'Juillet',
        total: 162946,
        detail: [
          { name: 'France', short_name: 'FRA', deaths: 406 },
          { name: 'Italie', short_name: 'ITA', deaths: 388 },
          { name: 'Espagne', short_name: 'ESP', deaths: 103 },
          { name: 'Royaume-Uni', short_name: 'UK', deaths: 828 },
          { name: 'Etats-Unis', short_name: 'USA', deaths: 23851 },
          { name: 'Russie', short_name: 'RUS', deaths: 4643 },
          { name: 'Chine', short_name: 'CHN', deaths: 18},
          { name: 'Mexique', short_name: 'MEX', deaths: 18713 },
          { name: 'Brésil', short_name: 'BRE', deaths: 32512 },
          { name: 'Pérou', short_name: 'PER', deaths: 9499 },
          { name: 'Colombie', short_name: 'COL', deaths: 6348 },
          { name: 'Inde', short_name: 'IND', deaths: 18854 },
          { name: 'Iran', short_name: 'IRA', deaths: 5899 },
          { name: 'Autres pays', short_name: 'Autres', deaths: 40884 }
        ]
      }, {
        month: 8,
        month_name: 'Août',
        total: 181040,
        detail: [
          { name: 'France', short_name: 'FRA', deaths: 331 },
          { name: 'Italie', short_name: 'ITA', deaths: 345 },
          { name: 'Espagne', short_name: 'ESP', deaths: 817 },
          { name: 'Royaume-Uni', short_name: 'UK', deaths: 330 },
          { name: 'Etats-Unis', short_name: 'USA', deaths: 31635 },
          { name: 'Russie', short_name: 'RUS', deaths: 3213 },
          { name: 'Chine', short_name: 'CHN', deaths: 63},
          { name: 'Mexique', short_name: 'MEX', deaths: 18458 },
          { name: 'Brésil', short_name: 'BRE', deaths: 30328 },
          { name: 'Pérou', short_name: 'PER', deaths: 9791 },
          { name: 'Colombie', short_name: 'COL', deaths: 9610 },
          { name: 'Inde', short_name: 'IND', deaths: 28722 },
          { name: 'Iran', short_name: 'IRA', deaths: 4893 },
          { name: 'Autres pays', short_name: 'Autres', deaths: 42504 }
        ]
      }, {
        month: 9,
        month_name: 'Septembre',
        total: 155401,
        detail: [
          { name: 'France', short_name: 'FRA', deaths: 1141 },
          { name: 'Italie', short_name: 'ITA', deaths: 374 },
          { name: 'Espagne', short_name: 'ESP', deaths: 1961 },
          { name: 'Royaume-Uni', short_name: 'UK', deaths: 502 },
          { name: 'Etats-Unis', short_name: 'USA', deaths: 21931 },
          { name: 'Russie', short_name: 'RUS', deaths: 3369 },
          { name: 'Chine', short_name: 'CHN', deaths: 17},
          { name: 'Mexique', short_name: 'MEX', deaths: 12611 },
          { name: 'Brésil', short_name: 'BRE', deaths: 21279 },
          { name: 'Pérou', short_name: 'PER', deaths: 3655 },
          { name: 'Colombie', short_name: 'COL', deaths: 6424 },
          { name: 'Inde', short_name: 'IND', deaths: 31849 },
          { name: 'Iran', short_name: 'IRA', deaths: 4317 },
          { name: 'Autres pays', short_name: 'Autres', deaths: 45971 }
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
        <div className={`${c}__overhead`}><PageTitle level={1} big>Covid-19</PageTitle></div>
        <div className={`${c}__title`}><PageTitle level={2} big>Un million de morts</PageTitle></div>
        <div className={`${c}__intro`}>
          <Paragraph literary>
            Dix mois après la naissance de la pandémie en Chine, le cap du million de morts officiellement dus au Covid-19 dans le monde a été franchi. Cette visualisation montre comment, mois après mois, le virus s'est déplacé sur la planète, même si douze pays – ici isolés – concentrent les trois-quarts des morts.
            <br /><br />
          </Paragraph>
          <Paragraph small literary>
            {props.viewport.display !== 'sm' ? 'Un point représente dix morts' : 'Un point représente cinquante morts'}.
            <br />
            Source OMS (données arrêtées au 30 septembre, 10 heures)
          </Paragraph>
        </div>
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
            key={country.name}
            className={classes.join(' ')}
            onMouseEnter={e => this.activateHover(country.name)}
            onMouseLeave={e => this.activateHover(null)}
            onClick={e => this.activateFilter(country.name)}>
            <AnnotationTitle>
              <span onMouseEnter={e => this.activateHover(country.name)}>
                {country.name}
              </span>
            </AnnotationTitle>
            <AnnotationTitle small>
              <span onMouseEnter={e => this.activateHover(country.name)}>
                {country.short_name}
              </span>
            </AnnotationTitle>
          </span>
        })}
      </div>
      
      {/* Content */}
      <div className={`${c}__content`}>
        {state.data.map(month => {
          const { width, display } = props.viewport
          const heightPercent = month.total / 1000000
          const paddingTop = display === 'lg'
            ? `calc(100% * ${heightPercent})`
            : display === 'md'
              ? `calc(180% * ${heightPercent})`
              : `calc(300% * ${heightPercent})`
          return <div
            className={`${c}__month-line`}
            style={{ paddingTop }}
            key={month.month}>
            <div className={`${c}__month-line-inner`}>
              <div className={`${c}__month-name`}>
                <AnnotationTitle big><JSXInterpreter content={month.month_name} /></AnnotationTitle>
                <Paragraph small literary>{month.month_name ? `${numberToSpacedString(month.total)} morts` : null}</Paragraph>
                <br />
                <Paragraph small literary>{month.month_name ? `dont ${numberToSpacedString(month.detail[0].deaths)} en France` : null}</Paragraph>
              </div>
              {month.detail.map(country => {
                const width = `${100 * country.deaths / month.total}%`
                const classes = [`${c}__country-cell`]
                if (country.name === state.sort) classes.push(`${c}__country-cell_active`)
                if (country.name === state.hover) classes.push(`${c}__country-cell_hover`)
                if (state.sort === null) classes.push(`${c}__country-cell_hover`)
                const type = props.viewport.display.toUpperCase()
                const color = country.name === state.sort ? 'red' : 'black'
                const backgroundImage = `url(./assets/${type}-${color}-${month.month}-${country.short_name}.png)`
                return <div
                  key={country.name}
                  className={classes.join(' ')}
                  style={{ width, backgroundImage }}
                  onClick={e => this.activateFilter(country.name)}
                  onMouseEnter={e => this.activateHover(country.name)}
                  onMouseLeave={e => this.activateHover(null)}>
                  <span className={`${c}__country-deaths`}>
                    <Annotation literary small>{
                      month.month_name
                      && country.name !== 'France'
                      && numberToSpacedString(country.deaths)
                    }</Annotation>
                  </span>
                </div>
              })}
            </div>
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
