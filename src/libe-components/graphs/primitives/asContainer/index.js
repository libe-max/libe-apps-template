import React, { Component } from 'react'
import PositionBox from '../../primitives/PositionBox'
import PaddingBox from '../../primitives/PaddingBox'
import DataBox from '../../primitives/DataBox'

/*
 *   asContainer HOC
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Captates generic props for containers, then renders the
 *   provided wrapped component
 *   
 *   PROPS
 *   x, y, width, height,
 *   padding, background, clip, backgroundInner, clipInner,
 *   data, xScale, xScaleDomain, xScaleConf, yScale, yScaleDomain, yScaleConf, render
 *
 */

const asContainer = Wrapped => {
  class AsContainer extends Component {
    /* * * * * * * * * * * * * * * * *
     *
     * RENDER
     *
     * * * * * * * * * * * * * * * * */
    render () {
      const { props } = this

      /* Inner logic */
      const childProps = { ...props }
      delete childProps.x
      delete childProps.y
      delete childProps.width
      delete childProps.height
      delete childProps.padding
      delete childProps.background
      delete childProps.backgroundInner
      delete childProps.clip
      delete childProps.clipInner
      delete childProps.data
      delete childProps.xScale
      delete childProps.xScaleDomain
      delete childProps.xScaleConf
      delete childProps.yScale
      delete childProps.yScaleDomain
      delete childProps.yScaleConf
      delete childProps.render

      /* Display */
      return <PositionBox
        name={props.name}
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        background={props.background}
        clip={props.clip}>
        <PaddingBox
          name={props.name}
          padding={props.padding}
          clip={props.clipInner}
          background={props.backgroundInner}>
          <DataBox
            name={props.name}
            data={props.data}
            xScale={props.xScale}
            xScaleDomain={props.xScaleDomain}
            xScaleConf={props.xScaleConf}
            yScale={props.yScale}
            yScaleDomain={props.yScaleDomain}
            yScaleConf={props.yScaleConf}
            render={props.render}>
            <Wrapped {...childProps} />
          </DataBox>
        </PaddingBox>
      </PositionBox>
    }
  }
  return AsContainer
}

export default asContainer
