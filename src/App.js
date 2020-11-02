import React, { Component } from 'react'
import AppContext from './context'

import Loader from './libe-components/blocks/Loader'
import LoadingError from './libe-components/blocks/LoadingError'
import ShareArticle from './libe-components/blocks/ShareArticle'
import LibeLaboLogo from './libe-components/blocks/LibeLaboLogo'
import ArticleMeta from './libe-components/blocks/ArticleMeta'
import Diaporama from './libe-components/blocks/Diaporama'
import ReadAlso from './libe-components/blocks/ReadAlso'
import Svg from './libe-components/primitives/Svg'
import InterTitle from './libe-components/text-levels/InterTitle'
import Annotation from './libe-components/text-levels/Annotation'
import Paragraph from './libe-components/text-levels/Paragraph'
import BlockTitle from './libe-components/text-levels/BlockTitle'
import Slug from './libe-components/text-levels/Slug'
import JSXInterpreter from './libe-components/logic/JSXInterpreter'

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
    this.expandedMediaPanelKeyListener = this.expandedMediaPanelKeyListener.bind(this)
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
        window.removeEventListener('keydown', this.expandedMediaPanelKeyListener)
        return {
          ...curr,
          expanded_media_id: null,
          show_expanded_medias_panel: true
        }  
      }
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', this.expandedMediaPanelKeyListener)
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
    window.removeEventListener('keydown', this.expandedMediaPanelKeyListener)
    this.setState(curr => ({
      show_expanded_medias_panel: false
    }))
  }

  /* * * * * * * * * * * * * * * * *
   *
   * EXPANDED MEDIA PANEL ESC KEY LISTENER
   *
   * * * * * * * * * * * * * * * * */
  expandedMediaPanelKeyListener (e) {
    if (e.key === 'Escape') return this.handleCloseExpandedMediasPanelClick(e)
    if (!this.diaporama) return
    if (e.key === 'ArrowLeft') return this.diaporama.handlePrevButtonClick(e)
    if (e.key === 'ArrowRight') return this.diaporama.handleNextButtonClick(e)
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
      const parsedData = {}
      data.forEach(elem => {
        if (elem.length < 3) parsedData[elem[0]] = elem[1]
        else parsedData[elem[0]] = elem.slice(1)
      })
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
    const classes = [c, props.meta.slug]
    if (state.loading_sheet) classes.push(`${props.meta.slug}_loading`)
    if (state.error_sheet) classes.push(`${props.meta.slug}_error`)
    if (state.konami_mode) classes.push(`${props.meta.slug}_konami`)
    if (state.show_expanded_medias_panel) classes.push(`${props.meta.slug}_expanded-medias`)

    const passedContext = {
      ...this.context,
      add_expandable_media: this.addExpandableMedia,
      update_expandable_media: this.updateExpandableMedia,
      remove_expandable_media: this.removeExpandableMedia,
      expand_media: this.expandMedia
    }

    return <AppContext.Provider value={passedContext}>
      <div id={props.meta.slug} className={classes.join(' ')}>
        {/* Loading */}
        {state.loading_sheet
        && <div className='lblb-default-apps-loader'>
          <Loader />
        </div>}

        {/* Error */}
        {!state.loading_sheet
        && state.error_sheet
        && <div className='lblb-default-apps-error'>
          <LoadingError message={state.error_sheet.message} />
        </div>}

        { /* App */ }
        {!state.loading_sheet
        && !state.error_sheet
        && <div className={`${props.meta.slug}__content`}>
          <div className='lblb-default-apps-header'>
            {state.data_sheet.title && <InterTitle
              level={1}
              big
              className='lblb-default-apps-header__title'>
              <JSXInterpreter content={state.data_sheet.title} />
            </InterTitle>}
            {state.data_sheet.subtitle && <Paragraph big>
              <JSXInterpreter content={state.data_sheet.subtitle} />
            </Paragraph>}
          </div>
          {state.data_sheet.intro && <div className={`${props.meta.slug}__intro`}>
            <Paragraph literary>
              <JSXInterpreter content={state.data_sheet.intro} />
            </Paragraph>
          </div>}
          <div
            className={`${props.meta.slug}__desktop`}
            style={{ width: 'calc(100% - 1rem)' }}>
            {state.data_sheet.infog_1_title && <BlockTitle huge>
              <JSXInterpreter content={state.data_sheet.infog_1_title} />
            </BlockTitle>}
            {state.data_sheet.infog_1_text && <Paragraph literary>
              <JSXInterpreter content={state.data_sheet.infog_1_text} />
            </Paragraph>}
            {state.data_sheet.infog_1_legende_img_desktop && <img style={{ width: '67%', maxWidth: '663px' }} src={state.data_sheet.infog_1_legende_img_desktop} />}
            {state.data_sheet.infog_1_img_desktop && <img style={{ width: '100%', maxWidth: '979px' }} src={state.data_sheet.infog_1_img_desktop} />}

            {state.data_sheet.infog_2_title && <BlockTitle huge>
              <JSXInterpreter content={state.data_sheet.infog_2_title} />
            </BlockTitle>}
            {state.data_sheet.infog_2_text && <Paragraph literary>
              <JSXInterpreter content={state.data_sheet.infog_2_text} />
            </Paragraph>}
            {state.data_sheet.infog_2_legende_img_desktop && <img style={{ width: '100%', maxWidth: '510px' }} src={state.data_sheet.infog_2_legende_img_desktop} />}
            {state.data_sheet.infog_2_img_desktop && <img style={{ width: '100%', maxWidth: '70rem' }} src={state.data_sheet.infog_2_img_desktop} />}

            {state.data_sheet.infog_3_title && <BlockTitle huge>
              <JSXInterpreter content={state.data_sheet.infog_3_title} />
            </BlockTitle>}
            {state.data_sheet.infog_3_text && <Paragraph literary>
              <JSXInterpreter content={state.data_sheet.infog_3_text} />
            </Paragraph>}
            {state.data_sheet.infog_3_legende_img_desktop && <img style={{ width: '100%', maxWidth: '236px' }} src={state.data_sheet.infog_3_legende_img_desktop} />}
            {state.data_sheet.infog_3_img_desktop && <img style={{ width: '100%', maxWidth: '70rem' }} src={state.data_sheet.infog_3_img_desktop} />}
          </div>
          <div
            className={`${props.meta.slug}__mobile`}
            style={{ width: 'calc(100% - 1rem)' }}>
            {state.data_sheet.infog_1_title && <BlockTitle huge>
              <JSXInterpreter content={state.data_sheet.infog_1_title} />
            </BlockTitle>}
            {state.data_sheet.infog_1_text && <Paragraph literary>
              <JSXInterpreter content={state.data_sheet.infog_1_text} />
            </Paragraph>}
            {state.data_sheet.infog_1_legende_img_mobile && <img style={{ width: '69%', maxWidth: '277px' }} src={state.data_sheet.infog_1_legende_img_mobile} />}
            {state.data_sheet.infog_1_img_mobile && <img style={{ width: '100%', maxWidth: '400px' }} src={state.data_sheet.infog_1_img_mobile} />}

            {state.data_sheet.infog_2_title && <BlockTitle huge>
              <JSXInterpreter content={state.data_sheet.infog_2_title} />
            </BlockTitle>}
            {state.data_sheet.infog_2_text && <Paragraph literary>
              <JSXInterpreter content={state.data_sheet.infog_2_text} />
            </Paragraph>}
            {state.data_sheet.infog_2_legende_img_mobile && <img style={{ width: '100%', maxWidth: '365px' }} src={state.data_sheet.infog_2_legende_img_mobile} />}
            {state.data_sheet.infog_2_img_mobile && <img style={{ width: '100%', maxWidth: '400px' }} src={state.data_sheet.infog_2_img_mobile} />}

            {state.data_sheet.infog_3_title && <BlockTitle huge>
              <JSXInterpreter content={state.data_sheet.infog_3_title} />
            </BlockTitle>}
            {state.data_sheet.infog_3_text && <Paragraph literary>
              <JSXInterpreter content={state.data_sheet.infog_3_text} />
            </Paragraph>}
            {state.data_sheet.infog_3_legende_img_mobile && <img style={{ width: '100%', maxWidth: '225px' }} src={state.data_sheet.infog_3_legende_img_mobile} />}
            {state.data_sheet.infog_3_img_mobile && <img style={{ width: '100%', maxWidth: '400px' }} src={state.data_sheet.infog_3_img_mobile} />}
          </div>

          <div className={`${props.meta.slug}__links`}>
            <Slug noBg>A lire aussi</Slug>{
              state.data_sheet.links_title.map((title, i) => <Annotation key={title}>
                <a href={state.data_sheet.links_url[i]}>
                  <JSXInterpreter content={title} />
                </a>
              </Annotation>)
            }
          </div>
        </div>}

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
        </div>

        {/* Expanded medias panel */}
        <div
          className='lblb-default-expanded-medias-panel'
          style={{ top: `${context.viewport.nav_height}px` }}>
          <Diaporama
            showThumbs
            ref={n => this.diaporama = n}
            medias={state.expandable_medias}
            active={state.expanded_media_id}
            onChange={this.expandMedia} />
          <button
            className='lblb-default-expanded-medias-panel__close-button'
            onClick={this.handleCloseExpandedMediasPanelClick}>
            <Svg src={`${props.statics_url}/assets/tilted-cross-icon_40.svg`} />
          </button>
        </div>
      </div>
    </AppContext.Provider>
  }
}
