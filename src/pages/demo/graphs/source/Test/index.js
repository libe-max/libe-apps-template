import React, { Component } from 'react'
import AppContext from '../../../../../context'
import Graph from '../../../../../libe-components/graphs/Graph'
import Rect from '../../../../../libe-components/graphs/shapes/Rect'
import Circle from '../../../../../libe-components/graphs/shapes/Circle'
import Text from '../../../../../libe-components/graphs/text/Text'
import TextLine from '../../../../../libe-components/graphs/text/Line'

class Test extends Component {
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

    return <div>
      <Graph
        name='daddy'
        width='100vw'
        height='20rem'
        background='blue'
        padding='1rem'
        backgroundInner='red'
        clipInner>

        <Circle
          name='shape'
          cx='20%'
          cy='40%'
          r='5%'
          style={{ fill: 'transparent', stroke: 'black' }}
          anchor='0%'
          scale='1'
          rotate='-15' />

        <Rect
          name='shape'
          x='20%'
          y='50%'
          width='10%'
          height='50'
          style={{ fill: 'transparent', stroke: 'black' }}
          anchor='0%'
          scale='1'
          rotate='0' />

        <Rect
          name='shape'
          x='20%'
          y='80%'
          width='10%'
          height='50'
          style={{ fill: 'transparent', stroke: 'black' }}
          anchor='0%'
          scale='1.5'
          rotate='45' />



        <Rect
          name='shape'
          x='50%'
          y='20%'
          width='10%'
          height='50'
          style={{ fill: 'transparent', stroke: 'black' }}
          anchor='50%'
          scale='.5'
          rotate='-15' />

        <Rect
          name='shape'
          x='50%'
          y='50%'
          width='10%'
          height='50'
          style={{ fill: 'transparent', stroke: 'black' }}
          anchor='50%'
          scale='1'
          rotate='0' />

        <Rect
          name='shape'
          x='50%'
          y='80%'
          width='10%'
          height='50'
          style={{ fill: 'transparent', stroke: 'black' }}
          anchor='50%'
          scale='1.5'
          rotate='45' />


        <Rect
          name='shape'
          x='80%'
          y='20%'
          width='10%'
          height='50'
          style={{ fill: 'transparent', stroke: 'black' }}
          anchor='100%'
          scale='.5'
          rotate='-15' />

        <Rect
          name='shape'
          x='80%'
          y='50%'
          width='10%'
          height='50'
          style={{ fill: 'transparent', stroke: 'black' }}
          anchor='100%'
          scale='1'
          rotate='0' />

        <Rect
          name='shape'
          x='80%'
          y='80%'
          width='10%'
          height='50'
          style={{ fill: 'transparent', stroke: 'black' }}
          anchor='100%'
          scale='1.5'
          rotate='45' />

        {/*<Rect
          name='shape'
          x='150'
          y='75'
          width='50'
          height='50'
          style={{ fill: 'transparent', stroke: 'black' }}
          anchor='0'
          scale='1'
          rotate='45' />
        <Rect
          name='shape'
          x='150'
          y='75'
          width='50'
          height='50'
          style={{ fill: 'transparent', stroke: 'black' }}
          anchor='50'
          scale='1'
          rotate='45' />*/}

        {/*<Rect
          x='150'
          y='75'
          width='100'
          height='100'
          style={{ fill: 'purple' }}
          anchor='50%'
          // scale='1.2'
          rotate='135' />

        <Rect
          x='150'
          y='75'
          width='100'
          height='100'
          style={{ fill: 'orange' }}
          anchor='50%'
          // scale='.8'
          rotate='135' />

        <Rect
          width='40'
          height='60'
          x='3rem'
          y='40%'
          // anchor='50% 50%'
          style={{ fill: 'white' }}
          // translate='40 40'
          // rotate='45'
          />

        <Rect
          width='70'
          height='10'
          x='30rem'
          y='calc(100% - 70px)'
          style={{ fill: 'white' }}
          // translate='40 40'
          // rotate='45'
          />

        <Rect
          width='50'
          height='50'
          x='315'
          y='200'
          style={{ fill: 'white' }}
          // anchor='25%'
          // skew='20'
          // rotate='45'
          />

        <Rect
          width='140'
          height='5'
          x='11rem'
          y='50%'
          style={{ fill: 'white' }} />

        <Text x={100} y={200} rotate='360' anchor='50% 50%'>
          <TextLine 
            style={{ fill: 'green' }}
            // anchor='50% 0'
            // translate='0 0'
            // rotate='5'
            >
            Lorem ipsum dolor
          </TextLine>
          <TextLine 
            style={{ fill: 'green' }}
            // anchor='50% 0'
            >
            Lorem ipsum dolor
          </TextLine>
        </Text>
        */}
      </Graph>
    </div>
  }
}

export default Test
