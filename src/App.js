import React, { Component } from 'react'
import { statics_url as staticsUrl } from './config'
import Loader from './libe-components/blocks/Loader'
import LoadingError from './libe-components/blocks/LoadingError'
import ShareArticle from './libe-components/blocks/ShareArticle'
import LibeLaboLogo from './libe-components/blocks/LibeLaboLogo'
import ArticleMeta from './libe-components/blocks/ArticleMeta'
import Paragraph from './libe-components/text-levels/Paragraph'
import Tweet from './libe-components/blocks/Tweet'
import Photo2 from './libe-components/blocks/Photo2'
import Diaporama from './libe-components/blocks/Diaporama'
import DemoPage from './libe-components/layouts/DemoPage'
import Svg from './libe-components/primitives/Svg'
import AppContext from './context'

export default class App extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor (props) {
    super(props)
    this.c = 'lblb-app'
    this.state = {
      loading_sheet: true,
      error_sheet: null,
      data_sheet: [],
      konami_mode: false,
      expandable_medias: [],
      expanded_media_id: null,
      show_expanded_medias_panel: false
    }
    this.watchKonamiCode = this.watchKonamiCode.bind(this)
    this.addExpandableMedia = this.addExpandableMedia.bind(this)
    this.updateExpandableMedia = this.updateExpandableMedia.bind(this)
    this.removeExpandableMedia = this.removeExpandableMedia.bind(this)
    this.expandMedia = this.expandMedia.bind(this)
    this.handleCloseExpandedMediasPanelClick = this.handleCloseExpandedMediasPanelClick.bind(this)
    this.expandedMediaPanelEscKeyListener = this.expandedMediaPanelEscKeyListener.bind(this)
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
   * EXPAND MEDIA
   *
   * * * * * * * * * * * * * * * * */
  expandMedia (id) {
    this.setState(curr => {
      const foundMedia = curr.expandable_medias.find(media => media.id === id)
      if (!foundMedia) {
        document.body.style.overflow = null
        window.removeEventListener('keydown', this.expandedMediaPanelEscKeyListener)
        return {
          ...curr,
          expanded_media_id: null,
          show_expanded_medias_panel: true
        }  
      }
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', this.expandedMediaPanelEscKeyListener)
      return {
        ...curr,
        expanded_media_id: id,
        show_expanded_medias_panel: true
      }
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * HANDLE CLOSE EXPANDED MEDIAS PANEL CLICK
   *
   * * * * * * * * * * * * * * * * */
  handleCloseExpandedMediasPanelClick (e) {
    document.body.style.overflow = null
    window.removeEventListener('keydown', this.expandedMediaPanelEscKeyListener)
    this.setState(curr => ({
      show_expanded_medias_panel: false
    }))
  }

  /* * * * * * * * * * * * * * * * *
   *
   * EXPANDED MEDIA PANEL ESC KEY LISTENER
   *
   * * * * * * * * * * * * * * * * */
  expandedMediaPanelEscKeyListener (e) {
    if (e.key === 'Escape') this.handleCloseExpandedMediasPanelClick(e)
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
    const { state, props, context, c } = this

    /* Assign classes */
    const classes = [c]
    if (state.loading_sheet) classes.push(`${c}_loading`)
    if (state.error_sheet) classes.push(`${c}_error`)
    if (state.konami_mode) classes.push(`${c}_konami`)
    if (state.show_expanded_medias_panel) classes.push(`${c}_expanded-medias`)

    const passedContext = {
      ...this.context,
      add_expandable_media: this.addExpandableMedia,
      update_expandable_media: this.updateExpandableMedia,
      remove_expandable_media: this.removeExpandableMedia,
      expand_media: this.expandMedia
    }

    /* Load & errors */
    if (state.loading_sheet) {
      return <AppContext.Provider value={passedContext}>
        <div
          id={props.meta.slug}
          className={classes.join(' ')}>
          <div className='lblb-default-apps-loader'>
            <Loader />
          </div>
        </div>
      </AppContext.Provider>
    } else if (state.error_sheet) {
      return <AppContext.Provider value={passedContext}>
        <div
          id={props.meta.slug}
          className={classes.join(' ')}>
          <div className='lblb-default-apps-error'>
            <Paragraph>{state.error_sheet.message}</Paragraph>
            <LoadingError />
          </div>
        </div>
      </AppContext.Provider>
    }

    /* Display component */
    return <AppContext.Provider value={passedContext}>
      <div id={props.meta.slug} className={classes.join(' ')}>
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
          src='https://www.easypano.com/images/pw/v3/banner.jpg'
          description='Photo 1 - Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah' />
        <br />
        <Photo2
          width='240px'
          height='240px'
          cover
          expandable
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Photo 2 - Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah' />
        <br />
        <Photo2
          width='240px'
          height='240px'
          cover
          expandable
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Photo 3 - Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah' />
        <br />
        <Photo2
          width='240px'
          height='240px'
          cover
          expandable
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Photo 4 - Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah' />
        <br />
        <Photo2
          width='240px'
          height='240px'
          cover
          expandable
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Photo 5 - Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah' />
        <br />
        <Photo2
          width='240px'
          height='240px'
          cover
          expandable
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Photo 6 - Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah' />
        <br />
        <Photo2
          width='240px'
          height='240px'
          cover
          expandable
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Photo 7 - Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah' />
        <br />
        <Photo2
          width='240px'
          height='240px'
          cover
          expandable
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Photo 8 - Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah' />
        <br />
        <Photo2
          width='240px'
          height='240px'
          cover
          expandable
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Photo 9 - Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah' />
        <br />
        <Photo2
          width='240px'
          height='240px'
          cover
          expandable
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Photo 10 - Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah' />
        <br />
        <Photo2
          width='240px'
          height='240px'
          cover
          expandable
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Photo 11 - Une longue description qui fait plusieurs lignes'
          credit='Un crédit qui est long aussi oulalah' />
        <br />
        <Photo2
          width='240px'
          height='240px'
          cover
          expandable
          src='https://upload.wikimedia.org/wikipedia/commons/6/6b/Tall_building_%284935391830%29.jpg'
          description='Photo 12 - Une longue description qui fait plusieurs lignes'
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

        <div
          className='lblb-default-expanded-medias-panel'
          style={{ top: `${context.viewport.nav_height}px` }}>
          <Diaporama
            showThumbs
            medias={state.expandable_medias}
            active={state.expanded_media_id}
            onChange={this.expandMedia} />
          <button
            className='lblb-default-expanded-medias-panel__close-button'
            onClick={this.handleCloseExpandedMediasPanelClick}>
            <Svg src={`${staticsUrl}/assets/tilted-cross-icon_40.svg`} />
          </button>
        </div>
      </div>
    </AppContext.Provider>
  }
}
