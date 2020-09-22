import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Annotation from '../../text-levels/Annotation'

/*
 *   BottomNotes component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Simple bottom notes component
 *
 *   PROPS
 *   notes, activeNote
 *
 */

export default class BottomNotes extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-bottom-notes'
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { c, props } = this

    /* Assign classes */
    const classes = [c]
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)

    /* Display component */
    return <div className={classes.join(' ')}>{
      props.notes.map((note, i) => {
        const { id, component, text } = note
        const sup = (id || id === 0) ? <sup>({id + 1})&nbsp;</sup> : ''
        const noteClasses = [`${c}__note`]
        if (id === props.activeNote) noteClasses.push(`${c}__note_active`)
        if (text) {
          return <div className={noteClasses.join(' ')} key={i}>
            <Annotation literary
              small={props.small}
              big={props.big}
              huge={props.huge}>
              {sup}{text}
            </Annotation>
          </div>
        } else if (component) {
          return <div className={noteClasses.join(' ')} key={i}>
            <Annotation literary
              small={props.small}
              big={props.big}
              huge={props.huge}>
              {sup}
            </Annotation>
            {component}
          </div>
        } else return ''
      })
    }</div>
  }
}

/* * * * * Prop types * * * * */

BottomNotes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    component: PropTypes.element,
    id: PropTypes.number
  })),
  activeNote: PropTypes.oneOfType([
    PropTypes.number,
    (props, propName) => props[propName] === null
  ])
}
BottomNotes.defaultProps = {
  notes: [],
  activeNote: null
}
