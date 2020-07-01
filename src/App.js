import React, { Component } from 'react'
import { google } from 'googleapis'
import Loader from 'libe-components/lib/blocks/Loader'
import LoadingError from 'libe-components/lib/blocks/LoadingError'
import ShareArticle from 'libe-components/lib/blocks/ShareArticle'
import LibeLaboLogo from 'libe-components/lib/blocks/LibeLaboLogo'
import ArticleMeta from 'libe-components/lib/blocks/ArticleMeta'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import credentials from './credentials.json'

export default class App extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-some-app'
    this.state = {
      loading_sheet: true,
      error_sheet: null,
      data_sheet: [],
      keystrokes_history: [],
      konami_mode: false
    }
    this.fetchSheet = this.fetchSheet.bind(this)
    this.fetchCredentials = this.fetchCredentials.bind(this)
    this.listenToKeyStrokes = this.listenToKeyStrokes.bind(this)
    this.watchKonamiCode = this.watchKonamiCode.bind(this)
    this.createSheetsApiClient = this.createSheetsApiClient.bind(this)
    this.getRawSheetData = this.getRawSheetData.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    document.addEventListener('keydown', this.listenToKeyStrokes)
    this.fetchCredentials()
    if (this.props.spreadsheet) return this.fetchSheet()
    return this.setState({ loading_sheet: false })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WILL UNMOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentWillUnmount () {
    document.removeEventListener('keydown', this.listenToKeyStrokes)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * SHOULD UPDATE
   *
   * * * * * * * * * * * * * * * * */
  shouldComponentUpdate (props, nextState) {
    const changedKeys = []
    Object.keys(nextState).forEach(key => {
      if (this.state[key] !== nextState[key]) changedKeys.push(key)
    })
    if (changedKeys.length === 1 &&
      changedKeys.includes('keystrokes_history')) return false
    return true
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH CREDENTIALS
   *
   * * * * * * * * * * * * * * * * */
  async fetchCredentials () {
    const { api_url } = this.props
    const { format, article } = this.props.tracking
    const api = `${api_url}/${format}/${article}/load`
    try {
      const reach = await window.fetch(api, { method: 'POST' })
      const response = await reach.json()
      const { lblb_tracking, lblb_posting } = response._credentials
      if (!window.LBLB_GLOBAL) window.LBLB_GLOBAL = {}
      window.LBLB_GLOBAL.lblb_tracking = lblb_tracking
      window.LBLB_GLOBAL.lblb_posting = lblb_posting
      return { lblb_tracking, lblb_posting }
    } catch (error) {
      console.error('Unable to fetch credentials:')
      console.error(error)
      return Error(error)
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH SHEET
   *
   * * * * * * * * * * * * * * * * */
  async fetchSheet () {
    this.setState({ loading_sheet: true, error_sheet: null })
    const sheet = this.props.spreadsheet
    try {
      const sheetsApi = await this.createSheetsApiClient()
      const initRawSheetData = await this.getRawSheetData(sheetsApi)
      console.log(initRawSheetData)
      // const initSheetData = makeObjectsFromRawSheetData(initRawSheetData)


      // const reach = await window.fetch(this.props.spreadsheet)
      // if (!reach.ok) throw reach
      // const data = await reach.text()
      // const parsedData = data // Parse sheet here
      // this.setState({ loading_sheet: false, error_sheet: null, data_sheet: parsedData })
      // return data
    } catch (error) {
      if (error.status) {
        const text = `${error.status} error while fetching : ${sheet}`
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
   * CREATE GOOGLE API CLIENT
   *
   * * * * * * * * * * * * * * * * */
  async createSheetsApiClient () {
    const googleAPIClient = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    )
    return new Promise((resolve, reject) => {
      googleAPIClient.authorize(err => {
        if (err) return reject(`Error in createSheetsApiClient: ${err.message}`)
        const sheetsApi = google.sheets({
          version: 'v4',
          auth: googleAPIClient
        })
        resolve(sheetsApi)
      })
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * GET RAW SHEET DATA
   *
   * * * * * * * * * * * * * * * * */
  async getRawSheetData (sheetsApi) {
    const options = { spreadsheetId: '182qplcZdqp3RFeYQ2ePIvPnx_KIkbv5RrrHLecwaIOg', range: 'Data!A:W' }
    const response = await sheetsApi.spreadsheets.values.get(options)
    const sheetData = response.data.values
    return sheetData
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE OBJECTS FROM RAW SHEET DATA
   *
   * * * * * * * * * * * * * * * * */
  // makeObjectsFromRawSheetData (rawData = []) {
  //   const keys = rawData[0]
  //   const lines = rawData.slice(1)
  //   const objects = lines.map(line => {
  //     const obj = {}
  //     line.forEach((cell, i) => {
  //       const key = keys[i]
  //       obj[key] = cell
  //     })
  //     return obj
  //   })
  //   return objects
  // }

  /* * * * * * * * * * * * * * * * *
   *
   * START LISTENING KEYSTROKES
   *
   * * * * * * * * * * * * * * * * */
  listenToKeyStrokes (e) {
    if (!e || !e.keyCode) return
    const currHistory = this.state.keystrokes_history
    const newHistory = [...currHistory, e.keyCode]
    this.setState({ keystrokes_history: newHistory })
    this.watchKonamiCode()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WATCH KONAMI CODE
   *
   * * * * * * * * * * * * * * * * */
  watchKonamiCode () {
    const konamiCodeStr = '38,38,40,40,37,39,37,39,66,65'
    const lastTenKeys = this.state.keystrokes_history.slice(-10)
    if (lastTenKeys.join(',') === konamiCodeStr) this.setState({ konami_mode: true })
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
          <Paragraph>{state.error_sheet}</Paragraph>
          <LoadingError />
        </div>
      </div>
    }

    /* Display component */
    return <div className={classes.join(' ')}>
      App is ready.<br />
      - fill spreadsheet field in config.js<br />
      - display it's content via state.data_sheet
      <div className='lblb-default-apps-footer'>
        <ShareArticle short iconsOnly tweet={props.meta.tweet} url={props.meta.url} />
        <ArticleMeta
          publishedOn='01/01/2020 12:00' authors={[
            { name: 'Libé Labo', role: 'Production', link: 'https://www.liberation.fr/libe-labo-data-nouveaux-formats,100538' }
          ]}
        />
        <LibeLaboLogo target='blank' />
      </div>
    </div>
  }
}
