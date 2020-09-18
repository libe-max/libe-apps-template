import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/fr'
import Annotation from '../../text-levels/Annotation'

/*
 *   Article meta component
 *   ------------------------------------------------------
 *
 *   DESCRIPTION
 *   Displays information about authors and publication and
 *   updation dates
 *
 *   PROPS
 *   authors, publishedOn, updatedOn, inline
 *
 *   PROPS STRUCTURE
 *   authors expects an array of object litterals,
 *   containing 3 fields: name, role, and link.
 *
 */

export default class ArticleMeta extends Component {
  /* * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'lblb-article-meta'
  }

  /* * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * */
  render () {
    const { props, c } = this

    // Group authors by role, ordered by first appearance
    // of a role member in authors list
    const roleGroups = {}
    props.authors.forEach(author => {
      const role = !author.role
        ? 'author'
        : author.role
      if (!roleGroups[role]) roleGroups[role] = []
      roleGroups[role].push(author)
    })
    // For each role list, convert each author object into
    // a text with a link and a comma before it if needed
    const roleGroupsJointWithCommas = {}
    for (let role in roleGroups) {
      roleGroupsJointWithCommas[role] = []
      roleGroups[role].forEach((author, i, src) => {
        const alphaNumRole = role.toLowerCase().replace(/[^a-z0-9]/g, '-')
        const isLast = (i === src.length - 1)
        const displayAuthor = author.link
          ? <span className={`${c}__person`} key={`${i}-${alphaNumRole}`}><a href={author.link}>{author.name}</a></span>
          : <span className={`${c}__person`} key={`${i}-${alphaNumRole}`}>{author.name}</span>
        const commaSeparator = <span className={`${c}__label`} key={`${i}-${alphaNumRole}-sep`}>, </span>
        const andSeparator = <span className={`${c}__label`} key={`${i}-${alphaNumRole}-sep`}> et </span>
        if (i !== 0 && !isLast) roleGroupsJointWithCommas[role].push(commaSeparator, displayAuthor)
        else if (i !== 0 && isLast) roleGroupsJointWithCommas[role].push(andSeparator, displayAuthor)
        else roleGroupsJointWithCommas[role].push(displayAuthor)
      })
    }
    // Convert timestamps into readable dates
    const displayPublishedOn = props.publishedOn
      ? moment(props.publishedOn, 'x') > 31
        ? moment(props.publishedOn, 'x').format('D MMMM YYYY à HH:mm')
        : moment(props.publishedOn, 'DD/MM/YYYY HH:mm').format('D MMMM YYYY à HH:mm')
      : undefined
    const displayUpdatedOn = props.updatedOn
      ? moment(props.updatedOn, 'x') > 31
        ? moment(props.updatedOn, 'x').format('D MMMM YYYY à HH:mm')
        : moment(props.updatedOn, 'DD/MM/YYYY HH:mm').format('D MMMM YYYY à HH:mm')
      : undefined

    // Join all roles in a single line
    const fullDisplay = []

    // Inline display
    if (props.inline) {
      if (roleGroupsJointWithCommas.author) {
        fullDisplay.push(
          <span className={`${c}__label`} key='label-0'>Par </span>,
          ...roleGroupsJointWithCommas.author
        )
        delete roleGroupsJointWithCommas.author
      }
      if (Object.keys(roleGroupsJointWithCommas).length) {
        fullDisplay.push(<span className={`${c}__label`} key='label-1'> (</span>)
        for (let role in roleGroupsJointWithCommas) {
          const roleLine = roleGroupsJointWithCommas[role]
          fullDisplay.push(
            <span className={`${c}__label`} key={`label-${role}`}>{role}&nbsp;:&nbsp;</span>,
            ...roleLine,
            <span className={`${c}__label`} key={`label-${role}-sep`}>, </span>
          )
        }
        fullDisplay.pop()
        fullDisplay.push(<span className={`${c}__label`} key='label-last'>)</span>)
      }
      // Add dates
      if (displayPublishedOn) {
        fullDisplay.push(
          <span className={`${c}__label`} key='role-date-sep'> — </span>,
          <span className={`${c}__date`} key='publish-date'>{displayPublishedOn}</span>
        )
      }
      if (displayPublishedOn && displayUpdatedOn) {
        fullDisplay.push(
          <span className={`${c}__label`} key='update-label'> (modifié le </span>,
          <span className={`${c}__date`} key='update-date'>{displayUpdatedOn}</span>,
          <span className={`${c}__label`} key='update-label-end'>)</span>
        )
      }
    // Block display
    } else {
      if (roleGroupsJointWithCommas.author) {
        fullDisplay.push(
          <span className={`${c}__line`} key='author'>
            <span className={`${c}__label`}>Textes : </span>
            {roleGroupsJointWithCommas.author}
          </span>
        )
        delete roleGroupsJointWithCommas.author
      }
      if (Object.keys(roleGroupsJointWithCommas).length) {
        for (let role in roleGroupsJointWithCommas) {
          const roleLine = roleGroupsJointWithCommas[role]
          const upCasedRole = role.charAt(0).toUpperCase() + role.slice(1)
          fullDisplay.push(
            <span className={`${c}__line`} key={role}>
              <span className={`${c}__label`}>{upCasedRole} : </span>
              {roleLine}
            </span>
          )
        }
      }
      // Add dates
      if (displayPublishedOn) {
        fullDisplay.push(
          <span className={`${c}__line`} key='published-on'>
            <span className={`${c}__label`}>Publié le </span>
            <span className={`${c}__date`}>{displayPublishedOn}</span>
          </span>
        )
      }
      if (displayPublishedOn && displayUpdatedOn) {
        fullDisplay.push(
          <span className={`${c}__line`} key='updated-on'>
            <span className={`${c}__label`}>Modifié le </span>
            <span className={`${c}__date`}>{displayUpdatedOn}</span>
          </span>
        )
      }
    }

    /* Assign classes */
    const classes = [c]
    if (props.inline) classes.push(`${c}_inline`)
    if (props.small) classes.push(`${c}_small`)
    if (props.big) classes.push(`${c}_big`)
    if (props.huge) classes.push(`${c}_huge`)

    return <div className={classes.join(' ')}>
      <Annotation
        small={props.small}
        big={props.big}
        huge={props.huge}>
        {fullDisplay}
      </Annotation>
    </div>
  }
}

/* * * * * Prop types * * * * */

ArticleMeta.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  publishedOn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  updatedOn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  small: PropTypes.bool,
  big: PropTypes.bool,
  huge: PropTypes.bool,
  inline: PropTypes.bool
}

ArticleMeta.defaultProps = {
  authors: []
}
