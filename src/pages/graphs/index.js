import React, { Component } from 'react'

import Test from './source/Test'
import CO220192020 from './source/CO220192020'

class GraphsPage extends Component {
  render () {
    return <div>
      <Test />
      <div style={{ width: '100%', height: '100px' }} />
      {/*<CO220192020 />*/}
    </div>
  }
}

export default GraphsPage
