import { Component } from 'react'
import AppContext from '../../../../context'

class Breakpoints extends Component {
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
  render () {
    const { props, context }  = this
    const value = props.value || []
    const display = context.viewport.display_name
    return value.includes(display) ? props.children : null
  }
}

export default Breakpoints
