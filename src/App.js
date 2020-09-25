import React, { Component } from 'react'
import ArticleMeta from './libe-components/blocks/ArticleMeta'
import LibeLaboLogo from './libe-components/blocks/LibeLaboLogo'
import Loader from './libe-components/blocks/Loader'
import LoadingError from './libe-components/blocks/LoadingError'
import Paragraph from './libe-components/text-levels/Paragraph'
import ParagraphTitle from './libe-components/text-levels/ParagraphTitle'
import Slug from './libe-components/text-levels/Slug'
import InterTitle from './libe-components/text-levels/InterTitle'
import ShareArticle from './libe-components/blocks/ShareArticle'

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
      sort: null
    }
    this.fetchSheet = this.fetchSheet.bind(this)
    this.watchKonamiCode = this.watchKonamiCode.bind(this)
    this.activateSort = this.activateSort.bind(this)
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
   * ACTIVATE SORT
   *
   * * * * * * * * * * * * * * * * */
  activateSort (value) {
    console.log(value)
    this.setState(curr => ({ sort: value }))
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
        <div className={`${c}__overhead`}><InterTitle level={1}>Covid 19</InterTitle></div>
        <div className={`${c}__title`}><InterTitle level={2}>Un million de morts</InterTitle></div>
        <div className={`${c}__intro`}><Paragraph>Un paragraphe</Paragraph></div>
      </div>
      {/* Filters */}
      <div className={`${c}__filters`}>
        <span className={`${c}__filter-title`}>
          <Slug>Tri</Slug>
        </span>
        <span
          onClick={e => this.activateSort(null)}
          className={`${c}__filter-option ${state.sort === null ? `${c}__filter-option_active` : ''}`}>
          <Paragraph>aucun</Paragraph>
        </span>
        <span
          onClick={e => this.activateSort('continent')}
          className={`${c}__filter-option ${state.sort === 'continent' ? `${c}__filter-option_active` : ''}`}>
          <Paragraph>par continent</Paragraph>
        </span>
        <span
          onClick={e => this.activateSort('country')}
          className={`${c}__filter-option ${state.sort === 'country' ? `${c}__filter-option_active` : ''}`}>
          <Paragraph>par pays</Paragraph>
        </span>
      </div>
      {/* Content */}
      <div className={`${c}__content`}>
        {state.sort}
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
