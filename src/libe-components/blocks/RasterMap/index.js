import React, { Component } from 'react'
import { MapContainer as Leaflet, TileLayer } from 'react-leaflet'
import PropTypes from 'prop-types'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Raster map component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Leaflet map for raster tile sources component
 *
 *   PROPS
 *   center, zoom, tilesUrl, tilesAttribution,
 *   tilesOpacity, tilesZIndex, animate, bounds,
 *   doublcClickZoom, dragging, keyboard, maxBounds,
 *   onViewportChange, onViewportChanged, touchZoom,
 *   viewport
 *
 */

export default class RasterMap extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-raster-map'
    this.usedProps = [
      'center', 'zoom', 'tilesUrl', 'tilesAttribution',
      'tilesOpacity', 'tilesZIndex', 'animate', 'bounds',
      'doubleClickZoom', 'dragging', 'keyboard', 'maxBounds',
      'onViewportChange', 'onViewportChanged', 'touchZoom',
      'viewport', 'className'
    ]
    this.flyTo = this.flyTo.bind(this)
    this.zoomTo = this.zoomTo.bind(this)
    this.flyAndZoomTo = this.flyAndZoomTo.bind(this)
  }

  /* * * * * * * * * * * * * * * *
   *
   * FLY TO
   *
   * * * * * * * * * * * * * * * */
  flyTo (lat, lon) {
    const { map } = this
    if (!map ||
      !map.leafletElement ||
      !map.leafletElement.flyTo) return
    map.leafletElement.flyTo([lat, lon])
  }

  /* * * * * * * * * * * * * * * *
   *
   * ZOOM TO
   *
   * * * * * * * * * * * * * * * */
  zoomTo (z) {
    const { map } = this
    if (!map ||
      !map.leafletElement ||
      !map.leafletElement.setZoom) return
    map.leafletElement.setZoom(z)
  }

  /* * * * * * * * * * * * * * * *
   *
   * FLY AND ZOOM TO
   *
   * * * * * * * * * * * * * * * */
  flyAndZoomTo (lat, lon, z) {
    const { map } = this
    if (!map ||
      !map.leafletElement ||
      !map.leafletElement.setView) return
    map.leafletElement.setView([lat, lon], z)
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { c, props } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display component */
    return <div className={classes.join(' ')} {...passedProps}>
      <Leaflet ref={n => { this.map = n }}
        center={props.center}
        zoom={props.zoom}
        animate={props.animate}
        bounds={props.bounds}
        doublcClickZoom={props.doublcClickZoom}
        dragging={props.dragging}
        keyboard={props.keyboard}
        maxBounds={props.maxBounds}
        onViewportChange={props.onViewportChange}
        onViewportChanged={props.onViewportChanged}
        touchZoom={props.touchZoom}
        viewport={props.viewport}>
        <TileLayer url={props.tilesUrl}
          attribution={props.tilesAttribution}
          opacity={props.tilesOpacity}
          zIndex={props.tilesZIndex} />
        {props.children}
      </Leaflet>
    </div>
  }
}

/* * * * * Prop types * * * * */

RasterMap.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  tilesUrl: PropTypes.string,
  tilesAttribution: PropTypes.string,
  tilesOpacity: PropTypes.number,
  tilesZIndex: PropTypes.number,
  animate: PropTypes.bool,
  bounds: PropTypes.arrayOf(PropTypes.number),
  doublcClickZoom: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  dragging: PropTypes.bool,
  keyboard: PropTypes.bool,
  maxBounds: PropTypes.arrayOf(PropTypes.number),
  onViewportChange: PropTypes.func,
  onViewportChanged: PropTypes.func,
  touchZoom: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  viewport: PropTypes.shape({
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number
  })
}

RasterMap.defaultProps = {
  center: [43.708498, -1.051774],
  zoom: 15,
  tilesUrl: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png',
  tilesAttribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  doubleClickZoom: true,
  dragging: true,
  keyboard: true
}
