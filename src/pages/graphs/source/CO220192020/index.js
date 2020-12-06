import React, { Component } from 'react'
import AppContext from '../../../../context'
import Breakpoints from '../../../../libe-components/logic/responsive/Breakpoints'
import Responsive from '../../../../libe-components/logic/responsive/Responsive'
import Graph from '../../../../libe-components/graphs/Graph'
import Viewport from '../../../../libe-components/graphs/containers/Viewport'
import Rect from '../../../../libe-components/graphs/shapes/Rect'
import Circle from '../../../../libe-components/graphs/shapes/Circle'
import Ellipse from '../../../../libe-components/graphs/shapes/Ellipse'
import Line from '../../../../libe-components/graphs/shapes/Line'
import Polyline from '../../../../libe-components/graphs/shapes/Polyline'
import Polygon from '../../../../libe-components/graphs/shapes/Polygon'
import Path from '../../../../libe-components/graphs/shapes/Path'
import Text from '../../../../libe-components/graphs/text/Text'
import TextLine from '../../../../libe-components/graphs/text/Line'
import H1 from '../../../../libe-components/graphs/text/H1'
import H2 from '../../../../libe-components/graphs/text/H2'
import H3 from '../../../../libe-components/graphs/text/H3'
import H4 from '../../../../libe-components/graphs/text/H4'
import H5 from '../../../../libe-components/graphs/text/H5'
import H6 from '../../../../libe-components/graphs/text/H6'

class CO220192020 extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { context } = this
    const { viewport } = context
    const { responsive_value_getter: responsiveValueGetter } = viewport

    const titleStyle = {
      fontFamily: 'Libe-Sans-Semicondensed',
      letterSpacing: '0.03em',
      fontWeight: 800
    }

    return <div style={{ maxWidth: '40rem' }}>
      <Graph
        height='43rem'
        padding='1rem'
        backgroundInner='rgba(255, 255, 255, .9)'
        background='coral'
        render={({ width, height }) => {
          return <g>
            <Rect
              width={width * .6}
              height={width * .6}
              transform={`translate(${width / 2}, 100) rotate(45)`}
              style={{ fill: '#D23A4E' }} />

            <Responsive value={{
              sm: <Text>
                <TextLine level={2} style={titleStyle}>
                  Les émissions de CO2
                </TextLine>
                <TextLine level={2} style={titleStyle}>
                  dans le monde
                </TextLine>
                <TextLine level={2} style={titleStyle}>
                  en 2019 et 2020
                </TextLine>
                <TextLine lineLevel={1.5}>En milliards de tonnes</TextLine>
                <TextLine lineLevel={1.5}>équivalent CO2</TextLine>
                <TextLine lineLevel={1.5}>entre janvier et août</TextLine>
              </Text>,

              default: <Text>
                <TextLine level={2.5} style={titleStyle}>
                  Les émissions de CO2 dans le monde en 2019 et 2020
                </TextLine>
                <TextLine level={2} style={{ ...titleStyle, fontWeight: 400 }}>
                  En milliards de tonnes équivalent CO2 entre janvier et août
                </TextLine>
              </Text>
            }} />

            <Rect
              x={10}
              width={40}
              height={40}
              style={{ fill: 'blue' }} />
          </g>
        }}>
      </Graph>
    </div>
  }
}

export default CO220192020
