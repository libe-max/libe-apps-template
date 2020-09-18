import React, { Component } from 'react'
import Loader from 'libe-components/lib/blocks/Loader'
import LoadingError from 'libe-components/lib/blocks/LoadingError'
import ShareArticle from 'libe-components/lib/blocks/ShareArticle'
import LibeLaboLogo from 'libe-components/lib/blocks/LibeLaboLogo'
import ArticleMeta from 'libe-components/lib/blocks/ArticleMeta'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'

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
    if (this.props.spreadsheet) return this.fetchSheet()
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
    const sheet = this.props.spreadsheet
    try {
      const reach = await window.fetch(this.props.spreadsheet)
      if (!reach.ok) throw reach
      const data = await reach.text()
      const parsedData = data // Parse sheet here
      this.setState({ loading_sheet: false, error_sheet: null, data_sheet: parsedData })
      return data
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
   * WATCH KONAMI CODE
   *
   * * * * * * * * * * * * * * * * */
  keystrokesHistory = []
  watchKonamiCode (e) {
    if (!e || !e.keyCode) return
    this.keystrokesHistory.push(e.keyCode)
    const konamiCodeStr = '38,38,40,40,37,39,37,39,66,65'
    const lastTenKeys = this.keystrokesHistory.slice(-10)
    if (lastTenKeys.join(',') === konamiCodeStr) this.setState({ konami_mode: true })
    else if (lastTenKeys.reverse().join(',') === konamiCodeStr) this.setState({ konami_mode: false })
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
