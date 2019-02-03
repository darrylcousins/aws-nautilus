/**
 * @file Provides an `Update Glossary Entry` form component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Form, Text } from 'react-form'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faList from '@fortawesome/fontawesome-free-solid/faList'
import faEye from '@fortawesome/fontawesome-free-solid/faEye'

import Message from './form/message.js'
import Style from './form/style'
import Loading from './loading'
import Error from './error'
import { ListStyle } from '../utils/style'

import * as queries from '../graphql/queries'
import * as mutations from '../graphql/mutations'

import { Connect } from "aws-amplify-react"
import { API, graphqlOperation } from "aws-amplify"

export default class GlossaryEntryDelete extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  async onSubmit(data, e, formApi) {

    try {
      const Entry = await API.graphql(graphqlOperation(mutations.deleteGlossaryEntry, {input: data}))
      console.log("Result: ", Entry)
    } catch (error) {
      console.log("caught error: ", error)
    }
  }

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
              <div className="fr">
                <ul className="list" style={ ListStyle }>
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
                      to={ `/glossary/${ this.props.match.params.id }/${ this.props.match.params.title }` }>
                      <FontAwesomeIcon icon={ faEye } color="navy" />
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
              </div>
              <h1 className="navy">Delete { data.getGlossaryEntry.title }</h1>
              <Form onSubmit={ this.onSubmit }
                validate={ this.validate }
                defaultValues={
                  {
                    id: this.props.match.params.id,
                    title: data.getGlossaryEntry.title
                  }
                }
                  >
                {formApi => (
                  <form
                    onSubmit={ formApi.submitForm }
                    id="glossary-entry-update-form"
                    className={ Style.form }>
                    <div>{ formApi.errors && <Message name="__all__" type="error" messages={ formApi.errors }/> }</div>
                    <Text
                      type="hidden"
                      name ="id"
                    />
                    <Text
                      type="hidden"
                      name = "title"
                    />
                    <div className="fr">
                      <button
                        type="submit"
                        className={ Style.buttonDefault }
                      >Delete
                      </button>
                    </div>
                  </form>
                )}
              </Form>
            </Fragment>
          )
        }}
      </Connect>
    )
  }
}
