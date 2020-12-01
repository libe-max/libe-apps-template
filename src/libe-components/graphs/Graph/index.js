import React, { Component } from 'react'
import AppContext from '../../../context'
import ContainedGraph from '../containers/Graph'

/*
 *   Graph component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   displays a svg, and renders a ContainedGraph inside, with forwarded props
 *   
 *   PROPS
 *   ...asContainer.props,
 *   ...containers/Graph.props,
 *   className
 *
 */

class Graph extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.state = { is_mounted: false }
    this.c = 'lblb-graph'
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
    this.setState({ is_mounted: true })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { props, state, context, c, $wrapper } = this

    /* Inner logic */
    const width = props.width !== undefined ? props.width : '100%'
    const { is_mounted: isMounted } = state
    const { width: pxWidth, height: pxHeight } = $wrapper ? $wrapper.getBoundingClientRect() : { width: 0, height: 0 }
    const childContext = {
      ...context,
      current_graph: {
        width: pxWidth,
        height: pxHeight
      }
    }

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)

    /* Display */
    return <AppContext.Provider value={childContext}>
      <svg
        width={width}
        height={props.height}
        ref={n => this.$wrapper = n}
        className={classes.join(' ')}>
        {isMounted && <ContainedGraph {...props} />}
      </svg>
    </AppContext.Provider>
  }
}

export default Graph
