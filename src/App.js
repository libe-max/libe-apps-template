import React, { Component } from 'react'
import Loader from './libe-components/blocks/Loader'
import LoadingError from './libe-components/blocks/LoadingError'
import ShareArticle from './libe-components/blocks/ShareArticle'
import LibeLaboLogo from './libe-components/blocks/LibeLaboLogo'
import ArticleMeta from './libe-components/blocks/ArticleMeta'
import Paragraph from './libe-components/text-levels/Paragraph'
import Tweet from './libe-components/blocks/Tweet'
import Photo2 from './libe-components/blocks/Photo2'
import DemoPage from './libe-components/layouts/DemoPage'
import AppContext from './context'

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
      expandable_medias: []
    }
    this.watchKonamiCode = this.watchKonamiCode.bind(this)
    this.addExpandableMedia = this.addExpandableMedia.bind(this)
    this.updateExpandableMedia = this.updateExpandableMedia.bind(this)
    this.removeExpandableMedia = this.removeExpandableMedia.bind(this)
    this.requestMediaExpansion = this.requestMediaExpansion.bind(this)
    this.fetchSheet = this.fetchSheet.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    window.setTimeout(e => this.setState(curr => ({
      ...curr,
      photo: false
    })), 2000)
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
   * ADD EXPANDABLE MEDIA
   *
   * * * * * * * * * * * * * * * * */
  addExpandableMedia (type, props, id) {
    const newMedia = { type, props, id }
    this.setState(curr => ({
      ...curr,
      expandable_medias: [...curr.expandable_medias, newMedia]
    }))
  }

  /* * * * * * * * * * * * * * * * *
   *
   * UPDATE EXPANDABLE MEDIA
   *
   * * * * * * * * * * * * * * * * */
  updateExpandableMedia (type, props, id) {
    const newMedia = { type, props, id }
    this.setState(curr => {
      const currExpMedias = curr.expandable_medias
      const currentMediaPos = currExpMedias.findIndex(media => media.id === newMedia.id)
      if (currentMediaPos === -1) return {
        ...curr,
        expandable_medias: [...currExpMedias, newMedia]
      }
      const currentMedia = currExpMedias[currentMediaPos]
      if (currentMedia.type === newMedia.type
        && currentMedia.props === newMedia.props) return curr
      const newExpandableMedias = [
        ...currExpMedias.slice(0, currentMediaPos),
        newMedia,
        ...currExpMedias.slice(currentMediaPos + 1)
      ]
      return {
        ...curr,
        expandable_medias: newExpandableMedias
      }
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * REMOVE EXPANDABLE MEDIA
   *
   * * * * * * * * * * * * * * * * */
  removeExpandableMedia (id) {
    this.setState(curr => {
      const currExpMedias = curr.expandable_medias
      const currentMediaPos = currExpMedias.findIndex(media => media.id === id)
      if (currentMediaPos === -1) return { ...curr }
      return {
        ...curr,
        expandable_medias: [
          ...currExpMedias.slice(0, currentMediaPos),
          ...currExpMedias.slice(currentMediaPos + 1)
        ]
      }
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * REQUEST MEDIA EXPANSION
   *
   * * * * * * * * * * * * * * * * */
  requestMediaExpansion (id) {
    alert('requested media expansion, see what i can do')
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
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, state, props } = this
    console.log(state.expandable_medias)

    /* Assign classes */
    const classes = [c]
    if (state.loading_sheet) classes.push(`${c}_loading`)
    if (state.error_sheet) classes.push(`${c}_error`)
    if (state.konami_mode) classes.push(`${c}_konami`)

    const passedContext = {
      ...this.context,
      add_expandable_media: this.addExpandableMedia,
      update_expandable_media: this.updateExpandableMedia,
      remove_expandable_media: this.removeExpandableMedia,
      request_media_expansion: this.requestMediaExpansion
    }

    /* Load & errors */
    if (state.loading_sheet) {
      return <AppContext.Provider value={passedContext}>
        <div className={classes.join(' ')}>
          <div className='lblb-default-apps-loader'>
            <Loader />
          </div>
        </div>
      </AppContext.Provider>
    } else if (state.error_sheet) {
      return <AppContext.Provider value={passedContext}>
        <div className={classes.join(' ')}>
          <div className='lblb-default-apps-error'>
            <Paragraph>{state.error_sheet.message}</Paragraph>
            <LoadingError />
          </div>
        </div>
      </AppContext.Provider>
    }

    /* Display component */
    return <AppContext.Provider value={passedContext}>
      <div className={classes.join(' ')}>
        <Paragraph literary>
          App is ready.<br />
          - remove DemoPage component<br />
          - fill spreadsheet_id field in config.js<br />
          - display it's content via state.data_sheet
        </Paragraph>
        <br />
        <br />
        <br />
        <br />
        <Photo2
          width='240px'
          height='240px'
          cover
          expandable
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Photo 1 - Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah' />
        <br />
        <div style={{ width: '10rem' }}>
          <Photo2
            src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
            description='Une longue description qui fait plusieurs lignes'
            credit='Un crédit qui est long aussi oulalah' />
        </div>
        <br />
        <div style={{ width: '20rem', height: '20rem' }}>
          <Photo2
            cover
            src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
            description='Une longue description qui fait plusieurs lignes'
            credit='Un crédit qui est long aussi oulalah' />
        </div>
        <br />
        <Photo2
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah'
          style={{ width: '30rem' }} />
        <br />
        <Photo2
          cover
          position='center'
          attachment='fixed'
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah'
          style={{ width: '100%', height: '30rem' }} />
        <br />
        <Photo2
          src='https://apod.nasa.gov/apod/image/1305/ngc6960_FinalPugh.jpg'
          description='Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah'
          width='30rem' />
        <br />
        <Photo2
          src='https://apod.nasa.gov/apod/image/1305/ngc6960_FinalPugh.jpg'
          description='Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah'
          width='30rem'
          height='30rem' />
        <br />
        <Photo2
          src='https://apod.nasa.gov/apod/image/1305/ngc6960_FinalPugh.jpg'
          description='Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah'
          height='30rem' />
        <br />
        <br />
        <br />
        <br />
        <DemoPage />
        <br />
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
    </AppContext.Provider>
  }
}
