import React, { Component } from 'react'

import { statics_url as staticsUrl } from './config'
import AppContext from './context'

import Loader from './libe-components/blocks/Loader'
import LoadingError from './libe-components/blocks/LoadingError'
import Diaporama from './libe-components/blocks/Diaporama'
import Svg from './libe-components/primitives/Svg'

import HomePage from './pages/Home'
import JsonTableToObjects from './libe-utils/json-table-to-objects'
  
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
    this.setState({
      loading_sheet: false,
      error_sheet: null,
      data_sheet: [{"publish":"1","order":"1","important":"","small_title":"8 février 1974","big_title":"","text":"Naissance de Guy-Manuel de Homem-Christo"},{"publish":"1","order":"2","important":"","small_title":"3 janvier 1975","big_title":"","text":"Naissance de Thomas Bangalter"},{"publish":"1","order":"3","important":"","small_title":"1995","big_title":"","text":"Le duo fait la première partie des Chemical Brothers à Londres"},{"publish":"1","order":"4","important":"","small_title":"20 janvier 1997","big_title":"Parution de leur premier album, Homework","text":"Suspendisse mollis non tortor ac laoreet. Nunc ullamcorper urna in vestibulum dictum.","image":"https://upload.wikimedia.org/wikipedia/en/9/9c/Daftpunk-homework.jpg","video":"","audio":"","credit":"Crédit 1 / Crédit 2"},{"publish":"1","order":"5","important":"","small_title":"Écouter un extrait de Da Funk ","big_title":"","text":"Lorem ipsum dolor sit amet","image":"","video":"","audio":"https://upload.wikimedia.org/wikipedia/en/9/9c/Daftpunk-homework.mp3"},{"publish":"1","order":"6","important":"","small_title":"15 avril 2002","big_title":"","text":"Lorem ipsum dolor sit amet","image":"","video":"https://www.youtube.com/watch?v=FGBhQbmPwH8"},{"publish":"1","order":"7","important":"","small_title":"D'autres puces","big_title":"","text":"..."},{"publish":"1","order":"8","important":"","small_title":"22 février 2021","big_title":"","text":"Ils annoncent la séparation de leur duo dans une vidéo intitulée Epilogue."}]
    })
    // this.setState({ loading_sheet: true, error_sheet: null })
    // const { proxydata_url: proxydataUrl, spreadsheet_id: spreadsheetId } = this.props
    // try {
    //   const url = `${proxydataUrl}/proxy/spreadsheets/${spreadsheetId}`
    //   const reach = await window.fetch(url)
    //   if (!reach.ok) throw reach
    //   const { data, err } = await reach.json()
    //   if (err) throw err
    //   const parsedData = data // Parse sheet here
    //   this.setState({ loading_sheet: false, error_sheet: null, data_sheet: JsonTableToObjects(parsedData) })
    //   return data
    // } catch (error) {
    //   if (error.status) {
    //     const text = `${error.status} error while fetching : ${spreadsheetId}`
    //     this.setState({ loading_sheet: false, error_sheet: error })
    //     console.error(text, error)
    //     return Error(text)
    //   } else {
    //     this.setState({ loading_sheet: false, error_sheet: error })
    //     console.error(error)
    //     return Error(error)
    //   }
    // }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { state, props, c } = this

    /* Assign classes */
    const classes = [c]
    if (state.loading_sheet) classes.push(`${c}_loading`)
    if (state.error_sheet) classes.push(`${c}_error`)
    if (state.konami_mode) classes.push(`${c}_konami`)
    if (state.show_expanded_medias_panel) classes.push(`${c}_expanded-medias`)
    const passedContext = {
      viewport: {
        ...props.viewport,
        responsive_value_getter: obj => {
          const displayName = props.viewport.display_name
          return obj[displayName] !== undefined
            ? obj[displayName]
            : obj.default
        }
      },
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
        && <HomePage data={state.data_sheet} />}

        {/* Expanded medias panel */}
        <div
          className='lblb-default-expanded-medias-panel'
          style={{ top: `${props.viewport.nav_height}px` }}>
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
