import React, { Component } from 'react'
import H3 from '../../../../../libe-components/text/H3'
import Span from '../../../../../libe-components/text/Span'
import makeReadable from '../../../../../libe-utils/number-to-spaced-string'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'

/*
 *   Budget component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   -
 *
 */

export default class Budget extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor(props) {
    super()
    this.c = 'slide'
    this.usedProps = [
      'incomeLabel',
      'income',
      'incomeAvgLabel',
      'incomeAvg',
      'incomeMax',
      'outcomeLabel',
      'outcome',
      'outcomeAvgLabel',
      'outcomeAvg',
      'outcomeMax',
      'incomeUnit',
      'outcomeUnit',
      'trainOutcomeLabel',
      'trainOutcome',
      'trainOutcomeUnit',
      'highschoolOutcomeLabel',
      'highschoolOutcome',
      'highschoolOutcomeUnit',
      'trainingOutcomeLabel',
      'trainingOutcome',
      'trainingOutcomeUnit',
      'outcomeItemMax'
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
      display: 'flex',
      flexDirection: 'column'
    }

    /* Logic */
    const incomeRatio = `${100 * props.income / props.incomeMax}%`
    const incomeAvgRatio = `${100 * props.incomeAvg / props.incomeMax}%`
    const outcomeRatio = `${100 * props.outcome / props.outcomeMax}%`
    const outcomeAvgRatio = `${100 * props.outcomeAvg / props.outcomeMax}%`

    const trainRatio = `${100 * Math.pow(props.trainOutcome / props.outcomeItemMax, .5)}%`
    const highschoolRatio = `${100 * Math.pow(props.highschoolOutcome / props.outcomeItemMax, .5)}%`
    const trainingRatio = `${100 * Math.pow(props.trainingOutcome / props.outcomeItemMax, .5)}%`

    console.log('train', props.trainOutcome)
    console.log('highschool', props.highschoolOutcome)
    console.log('training', props.trainingOutcome)
    console.log('max', props.outcomeItemMax)
    console.log('train ratio', trainRatio)
    console.log('highschool ratio', highschoolRatio)
    console.log('training ratio', trainingRatio)
    console.log('=======')

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <div
      id='budget'
      className={classes.join(' ')}
      {...passedProps}>
      <H3 level={2} className='slide__title'>Budget</H3>
      <div className='slide__card' style={cardStyle}>
        <div style={{ 
          width: '100%',
          height: '55%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem' }}>
            <div style={{
              background: 'rgba(137, 137, 137, 1)',
              width: incomeRatio,
              height: '3rem',
              flexShrink: 0,
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '.25rem',
              color: 'white'
            }}>
              <Span level={2} style={{
                fontFamily: 'Libe-Sans-Semicondensed',
                letterSpacing: '.03em'
              }}>{props.incomeLabel}</Span>
            </div>
            <div style={{ marginLeft: '.25rem' }}>
              <Span level={2} style={{
                fontFamily: 'Libe-Sans-Semicondensed',
                letterSpacing: '.03em'
              }}>{makeReadable(props.income)}&nbsp;{props.incomeUnit}</Span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{
              background: 'rgba(230, 230, 230, 1)',
              width: incomeAvgRatio,
              height: '1.5rem',
              flexShrink: 0,
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '.25rem'
            }}><Span level={-1} style={{
                fontFamily: 'Synthese',
                letterSpacing: '.03em'
              }}>{props.incomeAvgLabel}</Span>
            </div>
            <div style={{ marginLeft: '.25rem' }}>
              <Span level={-1} style={{ fontFamily: 'Synthese' }}>
                {makeReadable(props.incomeAvg)}&nbsp;{props.incomeUnit}
              </Span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem' }}>
            <div style={{
              background: 'rgba(252, 90, 92, 1)',
              width: outcomeRatio,
              height: '3rem',
              flexShrink: 0,
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '.25rem',
              color: 'white'
            }}><Span level={2} style={{
                fontFamily: 'Libe-Sans-Semicondensed',
                letterSpacing: '.03em'
              }}>{props.outcomeLabel}</Span>
            </div>
            <div style={{ marginLeft: '.25rem' }}>
              <Span level={2} style={{
                fontFamily: 'Libe-Sans-Semicondensed',
                letterSpacing: '.03em'
              }}>{makeReadable(props.outcome)}&nbsp;{props.outcomeUnit}</Span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem' }}>
            <div style={{
              background: 'rgba(253, 193, 194, 1)',
              width: outcomeAvgRatio,
              height: '1.5rem',
              flexShrink: 0,
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '.25rem'
            }}><Span level={-1} style={{
                fontFamily: 'Synthese',
                letterSpacing: '.03em'
              }}>{props.outcomeAvgLabel}</Span>
            </div>
            <div style={{ marginLeft: '.25rem' }}>
              <Span level={-1} style={{ fontFamily: 'Synthese' }}>
                {makeReadable(props.outcomeAvg)}&nbsp;{props.outcomeUnit}
              </Span>
            </div>
          </div>
        </div>

        <div style={{
          width: '100%',
          height: '45%',
          display: 'flex',
          justifyContent: 'space-around',
          position: 'relative'
        }}>
          <div style={{
            width: '30%',
            justifyContent: 'space-around',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}>
            <div style={{ width: '100%', paddingBottom: '100%', position: 'relative' }}>
              <div style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: trainRatio,
                height: trainRatio,
                background: 'rgba(253, 185, 186, 1)',
                position: 'absolute',
                borderRadius: '50%',
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center' }}>
                <div style={{ width: '15rem', flexShrink: 0, textAlign: 'center' }}>
                  <Span level={1} style={{
                    fontFamily: 'Libe-Sans-Semicondensed',
                    letterSpacing: '.03em',
                    color: 'rgba(252, 15, 25, 1)' }}>
                    {makeReadable(props.trainOutcome)} {props.trainOutcomeUnit}
                  </Span>
                </div>
              </div>
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Span
                level={-1}
                lineLevel={-4}
                style={{ fontFamily: 'Synthese', fontWeight: 600, lineHeight: '.5rem' }}>{props.trainOutcomeLabel}</Span>
            </div>
          </div>
          <div style={{
            width: '30%',
            justifyContent: 'space-around',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}>
            <div style={{ width: '100%', paddingBottom: '100%', position: 'relative' }}>
              <div style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: highschoolRatio,
                height: highschoolRatio,
                background: 'rgba(253, 185, 186, 1)',
                position: 'absolute',
                borderRadius: '50%',
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center' }}>
                <div style={{ width: '15rem', flexShrink: 0, textAlign: 'center' }}>
                  <Span level={1} style={{
                    fontFamily: 'Libe-Sans-Semicondensed',
                    letterSpacing: '.03em',
                    color: 'rgba(252, 15, 25, 1)' }}>
                    {makeReadable(props.highschoolOutcome)} {props.highschoolOutcomeUnit}
                  </Span>
                </div>
              </div>
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Span
                level={-1}
                lineLevel={-4}
                style={{ fontFamily: 'Synthese', fontWeight: 600, lineHeight: '.5rem' }}>{props.highschoolOutcomeLabel}</Span>
            </div>
          </div>
          <div style={{
            width: '30%',
            justifyContent: 'space-around',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}>
            <div style={{ width: '100%', paddingBottom: '100%', position: 'relative' }}>
              <div style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: trainingRatio,
                height: trainingRatio,
                background: 'rgba(253, 185, 186, 1)',
                position: 'absolute',
                borderRadius: '50%',
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center' }}>
                <div style={{ width: '15rem', flexShrink: 0, textAlign: 'center' }}>
                  <Span level={1} style={{
                    fontFamily: 'Libe-Sans-Semicondensed',
                    letterSpacing: '.03em',
                    color: 'rgba(252, 15, 25, 1)' }}>
                    {makeReadable(props.trainingOutcome)} {props.trainingOutcomeUnit}
                  </Span>
                </div>
              </div>
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Span
                level={-1}
                lineLevel={-4}
                style={{ fontFamily: 'Synthese', fontWeight: 600, lineHeight: '.5rem' }}>{props.trainingOutcomeLabel}</Span>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
