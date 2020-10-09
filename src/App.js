import React, { Component } from 'react'
import { statics_url as staticsUrl } from './config'
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

        {/* Intro */}
        <div className={`${c}__intro`}>
          <Paragraph literary>
            Mauris tincidunt libero et urna eleifend, a ornare eros gravida. Quisque tincidunt condimentum nibh, vitae ullamcorper felis lacinia quis. Mauris vestibulum blandit orci, eu dignissim libero aliquet mattis.<br /><br />Integer et erat in lorem congue consequat nec ac elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi viverra commodo placerat.
          </Paragraph>
        </div>

        { /* App */ }
        <div className={`${c}__content`}>
          <MetroTiler gutters={[32, 16, 16]} columns={[3, 2, 1]}>
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/881503147168071680' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1199718185865535490' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1225174713992990721' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1207508280207011841' />
          </MetroTiler>
          <Paragraph literary>
            Mauris tincidunt libero et urna eleifend, a ornare eros gravida. Quisque tincidunt condimentum nibh, vitae ullamcorper felis lacinia quis.
          </Paragraph>
          <MetroTiler gutters={[32, 16, 16]} columns={[3, 2, 1]}>
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1118876219381026818' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1235633381595066373' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1189601417469841409' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1261747580666552320' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1220536711031078913' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1081735898679701505' />
          </MetroTiler>
          <Paragraph literary>
            Vestibulum blandit orci, eu dignissim libero aliquet mattis. Integer et erat in lorem congue consequat nec ac elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi viverra commodo placerat.
          </Paragraph>
          <MetroTiler gutters={[32, 16, 16]} columns={[3, 2, 1]}>
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1163603361423351808' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1058388700617498625' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1227040292060180481' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1170546650651271169' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1220463728535252992' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1292628551926263808' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1223640662689689602' />
          </MetroTiler>
          <Paragraph literary>
            Quisque tincidunt condimentum nibh, vitae ullamcorper felis lacinia quis. Mauris vestibulum blandit orci, eu dignissim libero aliquet mattis. Integer et erat in lorem congue consequat nec ac elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi viverra commodo placerat.
          </Paragraph>
          <MetroTiler gutters={[32, 16, 16]} columns={[3, 2, 1]}>
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1170089069105340416' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1236778368533700609' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1265851644736081921' />
            <Tweet small urlsLength={28} url='https://twitter.com/realdonaldtrump/status/1075846949427908608' />
          </MetroTiler>
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
