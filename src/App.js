import React, { Component } from 'react'
import Loader from './libe-components/blocks/Loader'
import LoadingError from './libe-components/blocks/LoadingError'
import ShareArticle from './libe-components/blocks/ShareArticle'
import LibeLaboLogo from './libe-components/blocks/LibeLaboLogo'
import ArticleMeta from './libe-components/blocks/ArticleMeta'
import Paragraph from './libe-components/text-levels/Paragraph'

import Tweet from './libe-components/blocks/Tweet'
import Photo from './libe-components/blocks/Photo2'

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
      konami_mode: false
    }
    this.fetchSheet = this.fetchSheet.bind(this)
    this.watchKonamiCode = this.watchKonamiCode.bind(this)
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
      <div>
        App is ready.<br />
        - fill spreadsheet_id field in config.js<br />
        - display it's content via state.data_sheet
      </div>

      <Photo
        description='Une belle description oh là là'
        credit={`La source de la photo hi hi hi c'est rigolo tout ça`}
        src='https://freight.cargo.site/w/358/q/94/i/8f64dcc173f313e01f56500c7efbf2c87f3794864272e2d19dfa29a4c2566411/hepler_4_o.jpg' />

      <Photo
        className='custom-lblb-photo-2-class'
        description='Une belle description oh là là'
        credit={`La source de la photo hi hi hi c'est rigolo tout ça`}
        src='https://apod.nasa.gov/apod/image/1305/ngc6960_FinalPugh.jpg' />
      <div style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '20rem'
      }}>
        <Tweet url='https://twitter.com/12shiptost/status/1247127828459642880' />
        {/*<Tweet url='https://twitter.com/dusttodigital/status/1306942442374082561' />
        <Tweet url='https://twitter.com/stupidites/status/1308694766511685632' />
        <Tweet url='https://twitter.com/StopCarnet/status/1308691981237977089' />
        <Tweet url='https://twitter.com/thediaryofastay/status/1308746752229609473' />
        <Tweet url='https://twitter.com/libe/status/1308764828673155073' />*/}
      </div>

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
