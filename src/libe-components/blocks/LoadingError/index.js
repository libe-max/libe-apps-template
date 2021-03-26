import React, { Component } from 'react'
import Paragraph from '../../text-levels/Paragraph'
import Annotation from '../../text-levels/Annotation'
import LogoGlyph from '../../blocks/LogoGlyph'
import removeObjectKeys from '../../../libe-utils/remove-object-keys'

/*
 *   Loading error component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays an error message and a link to reload the
 *   page
 *
 *   PROPS
 *   small, big, huge, message
 *
 */

export default class LoadingError extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-loading-error'
    this.state = { show_message: false }
    this.usedProps = ['small', 'big', 'huge', 'message', 'className']
    this.toggleShowMessage = this.toggleShowMessage.bind(this)
  }

  /* * * * * * * * * * * * * * * *
   *
   * TOGGLE SHOW MESSAGE
   *
   * * * * * * * * * * * * * * * */
  toggleShowMessage () {
    this.setState(curr => ({
      ...curr,
      show_message: !curr.show_message
    }))
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { c, props, state } = this

    /* Assign classes */
    const classes = [c]
    if (props.className) classes.push(props.className)
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)
    if (state.show_message) classes.push(`${c}_show-message`)

    /* Passed props */
    const passedProps = removeObjectKeys(props, this.usedProps)

    return <div className={classes.join(' ')} {...passedProps}>
      <Paragraph
        className={`${c}__reloader`}
        small={props.small}
        big={props.big}
        huge={props.huge}>{
        props.children
          ? props.children
          : <span>Une erreur de chargement est survenue,<br />
            <a href={window.location}>recharger la page ?</a></span>
      }</Paragraph>
      <Annotation
        className={`${c}__message`}
        small={props.small}
        big={props.big}
        huge={props.huge}>
        {props.message}
      </Annotation>
      <Paragraph
        className={`${c}__glyph`}
        onClick={this.toggleShowMessage}
        small={props.small}
        big={props.big}
        huge={props.huge}>
        <LogoGlyph />
      </Paragraph>
    </div>
  }
}
