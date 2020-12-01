import { Component } from 'react'
import AppContext from '../../../../context'

class Responsive extends Component {
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
    const propsValue = props.value || []
    const responsiveValueGetter = context.viewport.responsive_value_getter
    const responsiveValue = responsiveValueGetter(propsValue)
    return typeof responsiveValue === 'function'
      ? responsiveValue(context.viewport)
      : responsiveValue !== undefined
        ? responsiveValue
        : null
  }
}

export default Responsive
