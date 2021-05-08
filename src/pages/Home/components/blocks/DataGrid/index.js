import React, { Component } from 'react'
import removeObjectKeys from '../../../../../libe-utils/remove-object-keys'
import AppContext from '../../../../../context'

/*
 *   DataGrid component
 *   ------------------------------------------------------
 *
 *   PROPS
 *   children, columns
 *
 */

export default class DataGrid extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * MAKE CONTEXT ACCESSIBLE
   *
   * * * * * * * * * * * * * * * * */
  static contextType = AppContext

  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-data-grid'
    this.usedProps = ['children', 'columns', 'className']
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, context, c } = this
    const { viewport } = context

    /* Logic */
    const childrenArr = React.Children.toArray(props.children)
    const nbPerLine = props.columns ?? 3
    const nbLines = Math.ceil(childrenArr.length / nbPerLine)
    const lineArr = new Array(nbLines).fill(null)
    const gridStyle = {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap'
    }
    const lineStyle = {
      width: '100%',
      display: 'flex',
      flexGrow: 0,
      flexShrink: 0,
      justifyContent: 'space-around',
      alignItems: 'space-around',
    }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    /* Display */
    return <div
      className={classes.join(' ')}
      {...passedProps}
      style={gridStyle}>
      {lineArr.map((line, linePos) => {
        return <div
          key={linePos}
          className={`${c}__line`}
          style={lineStyle}>
          {new Array(nbPerLine).fill(null).map((e, posInLine) => {
            const childPos = linePos * nbPerLine + posInLine
            if (childrenArr[childPos] == undefined) return
            const child = childrenArr[childPos]
            return <div
              key={childPos}
              className={`${c}__cell`}>
              {child}
            </div>
          })}
        </div>
      })}
    </div>
  }
}
