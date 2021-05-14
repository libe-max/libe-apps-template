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
      'artiSuperficyLabel', 'artiSuperficy', 'natuSuperficyLabel', 'natuSuperficy', 'densityLabel', 'density', 'densityGraph', 'densityUnit', 'franceDensity',
      'natuColor', 'agriColor', 'artiColor', 'noneColor', 'franceAgriSuperficy', 'franceArtiSuperficy', 'franceNatuSuperficy'
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
      margin: '3.5rem .5rem'
    }
    const titleRowStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '.25rem'
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
            <Span level={0} style={{
              fontFamily: 'Libe-Sans-Semicondensed',
              fontWeight: 600,
              letterSpacing: '.03rem'
            }}>
              {props.superficyLabel}
            </Span>
            <Span>
              <Span
                level={0}
                style={{
                  fontFamily: 'Libe-Sans-Semicondensed',
                  color: 'rgba(251, 0, 6, 1)',
                  fontWeight: 600
                }}>
                {makeReadable(props.superficy)}
              </Span>
              &nbsp;
              <Span
                level={-1}
                style={{ fontFamily: 'Synthese' }}>
                {props.superficyUnit}
              </Span>
            </Span>
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '.25rem'
            }}>
              <Span
                level={0}
                lineLevel={-2}
                style={{
                  width: '.75rem',
                  height: '.75rem',
                  background: props.agriColor,
                  display: 'inline-block',
                  borderRadius: '50%',
                  marginRight: '.25rem'
                }} />
              <Span
                level={-1}
                lineLevel={-2}
                style={{ fontFamily: 'Synthese' }}>
                {props.agriSuperficyLabel} (France : <span style={{ color: props.agriColor, fontWeight: 600 }}>
                  {props.franceAgriSuperficy}
                </span>)
              </Span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '.25rem'
            }}>
              <Span
                level={0}
                lineLevel={-2}
                style={{
                  width: '.75rem',
                  height: '.75rem',
                  background: props.natuColor,
                  display: 'inline-block',
                  borderRadius: '50%',
                  marginRight: '.25rem'
                }} />
              <Span
                level={-1}
                lineLevel={-2}
                style={{ fontFamily: 'Synthese' }}>
                {props.natuSuperficyLabel} (France : <span style={{ color: props.natuColor, fontWeight: 600 }}>{props.franceNatuSuperficy}</span>)
              </Span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '.25rem' }}>
              <Span
                level={0}
                lineLevel={-2}
                style={{
                  width: '.75rem',
                  height: '.75rem',
                  background: props.artiColor,
                  display: 'inline-block',
                  borderRadius: '50%',
                  marginRight: '.25rem'
                }} />
              <Span
                level={-1}
                lineLevel={-2}
                style={{ fontFamily: 'Synthese' }}>
                {props.artiSuperficyLabel} (France : <span style={{ color: props.artiColor, fontWeight: 600 }}>{props.franceArtiSuperficy}</span>)
              </Span>
            </div>
          </div>
        </div>
        <div style={cardHalfStyle}>
          <div style={titleRowStyle}>
            <Span level={0} style={{
              fontFamily: 'Libe-Sans-Semicondensed',
              fontWeight: 600,
              letterSpacing: '.03rem'
            }}>
              {props.densityLabel}
            </Span>
            <Span>
              <Span
                level={0}
                style={{
                  fontFamily: 'Libe-Sans-Semicondensed',
                  color: 'rgba(251, 0, 6, 1)',
                  fontWeight: 600
                }}>
                {makeReadable(props.density)}
              </Span>
              &nbsp;
              <Span
                level={-1}
                style={{ fontFamily: 'Synthese' }}>
                {props.densityUnit}
              </Span>
            </Span>
          </div>
          <div style={graphWrapperStyle}>
            <div style={{
              ...graphInnerWrapperStyle,
              backgroundImage: `url(${props.densityGraph})`,
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat'
            }} />
          </div>
          <div style={{
            width: '100%',
            marginTop: '.5rem',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <Span level={-1} style={{
              fontFamily: 'Synthese',
              letterSpacing: '.03rem'
            }}>
              France&nbsp;:&nbsp;
            </Span>
            <Span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <Span
                level={0}
                style={{
                  fontFamily: 'Libe-Sans-Semicondensed',
                  color: 'rgba(251, 0, 6, 1)',
                  fontWeight: 600
                }}>
                {makeReadable(props.franceDensity)}
              </Span>
              &nbsp;
              <Span
                level={-1}
                style={{ fontFamily: 'Synthese' }}>
                {props.densityUnit}
              </Span>
            </Span>
          </div>
        </div>
      </div>
    </div>
  }
}
