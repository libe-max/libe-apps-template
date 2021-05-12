import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import P from '../../../../../libe-components/text/P'
import Span from '../../../../../libe-components/text/Span'
import SplitBar from '../../blocks/SplitBar'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'
import makeReadable from '../../../../../libe-utils/number-to-spaced-string'

/*
 *   territoire component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   -
 *
 */

export default class territoire extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor(props) {
    super()
    this.c = 'slide'
    this.usedProps = [
      'superficyLabel', 'superficy', 'superficyUnit', 'agriSuperficyLabel', 'agriSuperficy',
      'artiSuperficyLabel', 'artiSuperficy', 'natuSuperficyLabel', 'natuSuperficy', 'densityLabel', 'density', 'densityUnit', 'franceDensity',
      'natuColor', 'agriColor', 'artiColor', 'noneColor'
    ]
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER PORTAL
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    const cardStyle = {
      display: 'flex'
    }
    const cardHalfStyle = {
      width: '50%',
      margin: '2rem .5rem'
    }
    const titleRowStyle = {
      display: 'flex',
      justifyContent: 'space-between'
    }
    const graphWrapperStyle = {
      position: 'relative',
      width: '100%',
      paddingBottom: '100%'
    }
    const graphInnerWrapperStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'violet'
    }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    const grounds = [
      { value: props.natuSuperficy, type: 'natu', color: props.natuColor },
      { value: props.agriSuperficy, type: 'agri', color: props.agriColor },
      { value: props.artiSuperficy, type: 'arti', color: props.artiColor }
    ].map(e => ({ ...e, ratio: e.value / props.superficy }))
    const ratioSum = grounds.reduce((acc, curr) => (acc + curr.ratio), 0)
    const sortedGrounds = grounds.sort((a, b) => (b.ratio - a.ratio))
    sortedGrounds.push({
      value: (1 - ratioSum) * props.superficy,
      type: 'other',
      ratio: 1 - ratioSum,
      color: props.noneColor
    })
    const leftColWidth = sortedGrounds[0].ratio * 100
    const rightColWidth = 100 - leftColWidth
    const line1Height = (sortedGrounds[1].ratio * 100) / (rightColWidth / 100)
    const line2Height = (sortedGrounds[2].ratio * 100) / (rightColWidth / 100)
    const line3Height = (sortedGrounds[3].ratio * 100) / (rightColWidth / 100)
    const labelStyle = {
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'inline-block',
      background: 'rgba(25, 25, 25, .15)',
      textShadow: '1px 1px 0 rgba(25, 25, 25, .3)',
      color: '#FFFFFF',
      borderRadius: '.125rem',
      padding: '.125rem'
    }

    /* Display */
    return <div
      id='territoire'
      className={classes.join(' ')}
      {...passedProps}>
      <H3 level={2} className='slide__title'>Territoire</H3>
      <div className='slide__card' style={cardStyle}>
        <div style={cardHalfStyle}>
          <div style={titleRowStyle}>
            <Span level={0} style={{ fontFamily: 'Synthese' }}>{props.superficyLabel}</Span>
            <Span level={0} style={{ fontFamily: 'Synthese' }}>{makeReadable(props.superficy)} {props.superficyUnit}</Span>
          </div>
          <div style={graphWrapperStyle}>
            <div style={graphInnerWrapperStyle}>
              <div style={{ height: '100%', width: '100%', background: 'red', display: 'flex' }}>
                <div style={{ height: '100%', width: `${leftColWidth}%`, background: sortedGrounds[0].color }}>
                  <span style={labelStyle}>
                    <P level={-2} style={{ fontFamily: 'Synthese', fontWeight: 600 }}>
                      {makeReadable(sortedGrounds[0].ratio * 100, 1)}%
                    </P>
                  </span>
                </div>
                <div style={{ height: '100%', width: `${rightColWidth}%` }}>
                  <div style={{ height: `${line1Height}%`, width: '100%', background: sortedGrounds[1].color }}>
                    <span style={labelStyle}>
                      <P level={-2} style={{ fontFamily: 'Synthese', fontWeight: 600 }}>
                        {makeReadable(sortedGrounds[1].ratio * 100, 1)}%
                      </P>
                    </span>
                  </div>
                  <div style={{ height: `${line2Height}%`, width: '100%', background: sortedGrounds[2].color }}>
                    <span style={labelStyle}>
                      <P level={-2} style={{ fontFamily: 'Synthese', fontWeight: 600 }}>
                        {makeReadable(sortedGrounds[2].ratio * 100, 1)}%
                      </P>
                    </span>
                  </div>
                  <div style={{ height: `${line3Height}%`, width: '100%', background: sortedGrounds[3].color }}>
                    <span style={labelStyle}>
                      <P level={-2} style={{ fontFamily: 'Synthese', fontWeight: 600 }}>
                        {makeReadable(sortedGrounds[3].ratio * 100, 1)}%
                      </P>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '.5rem' }}>
            <P lineLevel={-2}><Span level={0} lineLevel={-2}>idiom</Span> <Span level={0} lineLevel={-2}>label</Span></P>
            <P lineLevel={-2}><Span level={0} lineLevel={-2}>idiom</Span> <Span level={0} lineLevel={-2}>label</Span></P>
            <P lineLevel={-2}><Span level={0} lineLevel={-2}>idiom</Span> <Span level={0} lineLevel={-2}>label</Span></P>
          </div>
        </div>
        <div style={cardHalfStyle}>
          <div style={titleRowStyle}>
            <Span level={0} style={{ fontFamily: 'Synthese' }}>{props.densityLabel}</Span>
            <Span level={0} style={{ fontFamily: 'Synthese' }}>{makeReadable(props.density)} {props.densityUnit}</Span>
          </div>
          <div style={graphWrapperStyle}>
            <div style={graphInnerWrapperStyle}>
              Graph
            </div>
          </div>
          <P level={0} style={{ fontFamily: 'Synthese' }}>France : {props.franceDensity} {props.densityUnit}</P>
        </div>
      </div>
    </div>
  }
}
