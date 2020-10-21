import React, { Component } from 'react'
import { statics_url as staticsUrl } from './config'
import AppContext from './context'

import Loader from './libe-components/blocks/Loader'
import LoadingError from './libe-components/blocks/LoadingError'
import ShareArticle from './libe-components/blocks/ShareArticle'
import LibeLaboLogo from './libe-components/blocks/LibeLaboLogo'
import ArticleMeta from './libe-components/blocks/ArticleMeta'
import Diaporama from './libe-components/blocks/Diaporama'
import Tweet from './libe-components/blocks/Tweet'
import Photo2 from './libe-components/blocks/Photo2'

import Svg from './libe-components/primitives/Svg'

import InterTitle from './libe-components/text-levels/InterTitle'
import Paragraph from './libe-components/text-levels/Paragraph'
import Quote from './libe-components/text-levels/Quote'

import MetroTiler from './libe-components/layouts/MetroTiler'

import Graph from './libe-components/graphs/Graph'
import Viewport from './libe-components/graphs/Viewport'

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

    return <AppContext.Provider value={passedContext}>
      <div id={props.meta.slug} className={classes.join(' ')}>
        {/* Header */}
        <div className='lblb-default-apps-header'>
          <InterTitle
            level={1}
            className='lblb-default-apps-header__title'>
            Default title lorem ipsum dolor sit amet
          </InterTitle>
        </div>

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
        && false
        && <Paragraph literary>
          App is ready.<br />
          - remove DemoPage component<br />
          - fill spreadsheet_id field in config.js<br />
          - display it's content via state.data_sheet
        </Paragraph>}

        { /* App */ }
        {!state.loading_sheet
        && !state.error_sheet
        && <div style={{ background: '#FAF2E6', padding: 40 }}>
          <div style={{ width: '25rem' }}>
            <div style={{ width: '36rem' }}>
              <Graph
                height={911}
                title='Un graphe<br />sur deux lignes'
                subtitle='avec des données dedans !<br />vraiment beaucoup de données'
                source='Source : Libé Labo et Big'
                padding='.5rem'>
                <Graph
                  title='Un graphe<br />sur deux lignes'
                  subtitle='avec des données dedans !<br />vraiment beaucoup de données'
                  source='Source : Libé Labo et Big'
                  padding='.5rem'>
                  <Graph
                    title='Un graphe<br />sur deux lignes'
                    subtitle='avec des données dedans !<br />vraiment beaucoup de données'
                    source='Source : Libé Labo et Big'
                    padding='.5rem'>
                    
                  </Graph>
                </Graph>
              </Graph>
            </div>
            <Graph
              height={311}
              headTop='1rem'
              title='Un graphe<br />sur deux lignes'
              titleAlign='end'
              titleRight='1rem'
              subtitle='avec des données dedans !<br />vraiment beaucoup de données'
              subtitleAlign='end'
              subtitleRight='1rem'
              footBottom='1rem'
              source='Source : Libé Labo et Big'
              sourceAlign='start'
              sourceLeft='1rem'
              padding='2.5rem .5rem 1.5rem 3.5rem'>
              <rect x={'1rem'} y={'1rem'} width={'100px'} height={'.5rem'} style={{ fill: 'orange' }} />
              <g transform={`translate(0, 0)`}>
                <rect x={'1rem'} y={'1rem'} width={'100px'} height={'.5rem'} style={{ fill: 'orange' }} />
              </g>
            </Graph>
          </div>

          <div style={{ width: '36rem' }}>
            <Graph
              height={911}
              title='Un graphe<br />sur deux lignes'
              subtitle='avec des données dedans !<br />vraiment beaucoup de données'
              source='Source : Libé Labo et Big'
              padding='3.5rem 1.5rem .5rem 1rem'>
              <Viewport x={40} y={40} width='50%' height='50%' axisPadding='.5rem 4.5rem 8rem 2.5rem' />
              <rect x={'1rem'} y={'1rem'} width={'100px'} height={'.5rem'} style={{ fill: 'orange' }} />
              <g transform={`translate(0, 0)`}>
                <rect x={'1rem'} y={'1rem'} width={'100px'} height={'.5rem'} style={{ fill: 'orange' }} />
              </g>
            </Graph>
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
          <LibeLaboLogo target='blank' />
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
            <Svg src={`${staticsUrl}/assets/tilted-cross-icon_40.svg`} />
          </button>
        </div>
      </div>
    </AppContext.Provider>
  }
}
