/**
 * @file Provides a `profile` page
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import marked from 'marked'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faList from '@fortawesome/fontawesome-free-solid/faList'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'

import Loading from './loading'
import Error from './error'
import { ListStyle } from '../utils/style'

import * as queries from '../graphql/queries'

import { Connect } from "aws-amplify-react"
import { graphqlOperation } from "aws-amplify"

export default class GlossaryEntryDetail extends React.Component {

  render() {
    const vars = {
      id: this.props.match.params.id,
      title: this.props.match.params.title
    }
    return (
      <Connect
        query={ graphqlOperation(queries.getGlossaryEntry, vars) }
        variables={ vars }>
        {({ data, loading, errors }) => {
          if (loading) return <Loading />
          if (errors.length) return <Error data={ errors } />

          return (
            <Fragment>
              <ul className="list fr" style={ ListStyle }>
                <li className="dib mr2">
                  <Link
                    className="f6 f5-ns b db link dim"
                    to={ `/glossary/` }>
                    <FontAwesomeIcon icon={ faList } color="navy" />
                  </Link>
                </li>
                <li className="dib mr2">
                  <Link
                    className="f6 f5-ns b db link dim"
                    to={ `/glossary/${ this.props.match.params.id }/${ this.props.match.params.title }/edit` }>
                    <FontAwesomeIcon icon={ faEdit } color="navy" />
                  </Link>
                </li>
                <li className="dib mr2">
                  <Link
                    className="f6 f5-ns b db link dim"
                    to={ `/glossary/${ this.props.match.params.id }/${ this.props.match.params.title }/delete` }>
                    <FontAwesomeIcon icon={ faTrashAlt } color="navy" />
                  </Link>
                </li>
                <li className="dib mr2">
                  <Link
                    className="f6 f5-ns b db link dim"
                    to={ `/glossary/create` }>
                    <FontAwesomeIcon icon={ faPlus } color="red" />
                  </Link>
                </li>
              </ul>
              <h1 className="navy">{ data.getGlossaryEntry.title }</h1>
              <p className="f8 dark-gray i">{ data.byline }</p>
              <div
                className="f8 dark-gray i"
                dangerouslySetInnerHTML={{ __html: marked(data.getGlossaryEntry.byline) }} />
              <div
                dangerouslySetInnerHTML={{ __html: marked(data.getGlossaryEntry.content) }} />
              <div className="small-caps">
                <span>created: </span>
                <span className="f6">{ new Date(data.getGlossaryEntry.ctime).toLocaleString() }</span>
              </div>
              <div className="small-caps">
                <span>last modified: </span>
                <span className="f6">{ new Date(data.getGlossaryEntry.mtime).toLocaleString() }</span>
              </div>
            </Fragment>
          )
        }}
      </Connect>
    )
  }
}
