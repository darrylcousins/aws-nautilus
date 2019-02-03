/**
 * @file Provides a `GlossaryEntries` page view
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import marked from 'marked'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

import Loading from './loading'
import Error from './error'
import * as queries from '../graphql/queries'

import { Connect } from "aws-amplify-react"
import { graphqlOperation } from "aws-amplify"

export default class GlossaryEntryList extends React.Component {

  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = { searchTerm: "" }
    this.searchInput = React.createRef()
  }

  __componentDidUpdate() {
    console.log(this.searchInput)
    if (this.searchInput.current) {
      console.log("focus?")
      this.searchInput.current.focus()
    }
  }

  handleSearch(e) {
    if (e.target.value !== this.state.searchTerm) {
      this.setState({ searchTerm : e.target.value })
    }
  }

  render() {
    var vars
    if (this.state.searchTerm) {
      vars = {
        title: {
          contains: this.state.searchTerm
        }
      }
    }
    const variables = {
      filter: vars
    }

    const SummaryList = ({ items }) => (
      items.map((entry, idx) => (
        <Fragment key={ idx }>
          <Link
            className="link db dim mb1"
            to={ `/glossary/${ entry.id }/${ entry.title }` }>
            <div className="pa1 grow">
              <h3 className="mv0 navy">
                { entry.title }
              </h3>
              <div
                className="near-black mb0"
                dangerouslySetInnerHTML={{ __html: marked(entry.byline) }} />
              <div className="small-caps dark-gray">
                <span>last modified: </span>
                <span className="f6">{ new Date(entry.mtime).toLocaleString() }</span>
              </div>
            </div>
          </Link>
          <Link
            className="f6 f5-ns b db link dim fr"
            to={ `/glossary/${ entry.id }/${ entry.title }/edit` }>
            <FontAwesomeIcon icon={ faEdit } color="navy" />
          </Link>
          <Link
            className="mr2 f6 f5-ns b db link dim fr"
            to={ `/glossary/${ entry.id }/${ entry.title }/delete` }>
            <FontAwesomeIcon icon={ faTrashAlt } color="navy" />
          </Link>
          <div className="cf mb2"></div>
        </Fragment>
      ))
    )

    return (
      <Fragment>
        <Link
          className="f6 f5-ns b db link dim orange fr"
          to={ `/glossary/create` }>
          <FontAwesomeIcon icon={ faPlus } color="red" />
        </Link>
        <h1 className="navy">Glossary</h1>
        <label className="absolute pa0 ma0 o-0" htmlFor="searchTerm">Search term</label>
        <div className="relative mv3 dt dib w-100">
          <div className="b--black-20 bb bt bl pa2 br2 br--left dtc dib">
            <FontAwesomeIcon icon={ faSearch } />
          </div>
          <input
            autoFocus={ true }
            id="searchTerm"
            ref={ this.searchInput }
            type="text"
            onChange={ this.handleSearch }
            className="input-reset dtc pa2 b--black-20 dib bt bb bw1 w-100 br--right"
            value={ this.state.searchTerm }
            placeholder="Search..." />
        </div>
        <Connect
          query={ graphqlOperation(queries.listGlossaryEntries, variables) }
          >
          {({ data, loading, errors }) => {
            if (loading) return <Loading />
            if (errors.length) return <Error data={ errors } />
            return (
              <SummaryList items={ data.listGlossaryEntries.items } />
            )
          }}
        </Connect>
      </Fragment>
    )
  }

}
