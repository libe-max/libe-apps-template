import React, { Component } from 'react'
import { statics_url as staticsUrl } from './config'
import AppContext from './context'
import Loader from './libe-components/blocks/Loader'
import LoadingError from './libe-components/blocks/LoadingError'
import ShareArticle from './libe-components/blocks/ShareArticle'
import LibeLaboLogo from './libe-components/blocks/LibeLaboLogo'
import ArticleMeta from './libe-components/blocks/ArticleMeta'
import Diaporama from './libe-components/blocks/Diaporama'
import Svg from './libe-components/primitives/Svg'
import InterTitle from './libe-components/text-levels/InterTitle'
import Paragraph from './libe-components/text-levels/Paragraph'
import Graph from './libe-components/graphs/Graph'
import Frame from './libe-components/graphs/Frame'
import Rect from './libe-components/graphs/Rect'
  
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

    const data = [
      { name: 'Zidane', year: 1972, start: 1989, end: 2006, trophies: 19, team: 'Real' }, 
      { name: 'Serena Williams', year: 1981, start: 1999, end: 2022, trophies: 23, team: 'Nike' }, 
      { name: 'Nadal', year: 1986, start: 2003, end: 2024, trophies: 21, team: 'Babolat' }
    ]

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
        && <div style={{ width: '100%' }}>
          <Graph
            x={0}
            y={10}
            height='90vw'
            padding='1rem'
            data={data}
            xScale='pow'
            yScale='pow'
            xScaleDomain={[0, 5e6]}
            yScaleDomain={[0, 11]}
            xScaleConf={({ scale, width, height, data }) => scale.exponent(.5).domain([0, width * 4100]) }
            render={({ scale, width, height, data }) => <g><Rect xValue={10} widthValue={66000} height={10} style={{ fill: 'orange' }} /></g>}
            style={{ fill: 'rgba(20, 20, 220, .7)' }}
            innerStyle={{}}
            title={'Un titre, parfois c\'est long<br />ça s\'étend sur 3 lignes<br />et tout, ça en fait des mots'}
            subtitle={`
              Et puis alors les sous-titres alors là c'est encore autre chose
              <br />parce que les gens ils croient comme c'est tout petit on peut
              <br />en mettre des tonnes mais au final c'est quand même bien long quoi`}
            source='Source : Big'
            titleAlign='middle'
            subtitleAlign='middle'
            sourceAlign='middle'
            headTop='0rem'
            footBottom='0rem'
            titleLeft='Not read because titleRight'
            titleRight='50%'
            subtitleLeft='Not read because titleRight'
            subtitleRight='50%'
            sourceLeft='Not read because titleRight'
            sourceRight='50%'
            framePadding='16rem 4rem 4rem 4rem'
            frameStyle={{ fill: 'rgba(255, 255, 255, 1)' }}
            frameInnerStyle={{}}
            frameClipContent={false}
            frameInnerClipContent={false}
            viewportPadding='1rem'
            viewportStyle={{}}
            viewportInnerStyle={{ fill: 'coral' }}
            viewportClipContent={false}
            viewportInnerClipContent={false}
            showTopAxis
            showLeftAxis
            hideDomain={false}
            hideTopDomain={false}
            hideRightDomain={false}
            hideBottomDomain={false}
            hideLeftDomain={false}
            domainStyle={{ strokeWidth: '.25rem', strokeLinecap: 'butt' }}
            topDomainStyle={{}}
            rightDomainStyle={{}}
            bottomDomainStyle={{}}
            leftDomainStyle={{}}
            tickSize='3'
            topTickSize='calc(100% - 1rem)'
            leftTickSize='calc(100% - 1rem)'
            tickOffset={2}
            topTickOffset={0}
            rightTickOffset={0}
            bottomTickOffset={0}
            leftTickOffset={0}
            tickValues={undefined}
            topTickValues={[0, 3e4, 1e5, 3e5, 1e6, 3e6]}
            rightTickValues={undefined}
            bottomTickValues={undefined}
            leftTickValues={undefined}
            tickFormat={[10, 's']}
            topTickFormat={undefined}
            rightTickFormat={undefined}
            bottomTickFormat={undefined}
            leftTickFormat={undefined}
            tickStyle={{ strokeWidth: '.125rem', stroke: 'rgba(33, 33, 33, .2)' }}
            topTickStyle={{}}
            rightTickStyle={{}}
            bottomTickStyle={{}}
            leftTickStyle={{}}
            tickLabelOffset={'.5rem'}
            topTickLabelOffset={undefined}
            rightTickLabelOffset={undefined}
            bottomTickLabelOffset={undefined}
            leftTickLabelOffset={undefined} />
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
