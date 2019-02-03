/**
 * @file Provides an `Create Glossary Entry` form component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'react-form'
import { toast } from 'react-toastify'
import UUID from 'uuid'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faList from '@fortawesome/fontawesome-free-solid/faList'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'

import Input from './form/input.js'
import TextArea from './form/textarea.js'
import Message from './form/message.js'
import Style from './form/style'
import { ListStyle } from '../utils/style'

import * as mutations from '../graphql/mutations'

import { API, graphqlOperation } from "aws-amplify"

export default class GlossaryEntryCreate extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  validate(data) {
    // test for empty fields do it here rather than at field level
    let required = {
      title: "Title",
      byline: "Byline",
      content: "Content",
    }
    let ret = Object()
    for (var key in required) {
      if (required.hasOwnProperty(key) && data.hasOwnProperty(key)) {
        if (!data[key] || data[key].trim() === '') {
          ret[key] = Object()
          ret[key]["error"] = `${ required[key] } is a required field`
          ret[key]["warning"] = `Please enter a ${ required[key].toLowerCase() }`
        } else {
          ret[key] = Object()
          ret[key]["success"] = true
        }

      }
    }
    return ret
  }

  async onSubmit(data, e, formApi) {

    const now = new Date()

    data.id = UUID.v4()
    data.ctime = now
    data.mtime = now

    const Toast = ({ entry }) => (
        <Fragment>
          <span>{ entry.title }</span> created. <FontAwesomeIcon icon={ faCheck } />
        </Fragment>
    )

    try {
      const result = await API.graphql(graphqlOperation(mutations.createGlossaryEntry, {input: data}))
      const entry = result.data.createGlossaryEntry
      console.log("Result: ", entry)
      toast.success(<Toast entry={ entry } />, {
        onClose: () =>  this.props.history.push(`/glossary/`)
      })
    } catch (error) {
      console.log("Caught error: ", error)
      toast.error("Update failed")
    }
  }

  render() {
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
          </ul>
        </div>
        <h1 className="navy">Create Entry</h1>
        <Form onSubmit={ this.onSubmit }
          validate={ this.validate }
          >
          {formApi => (
            <form
              onSubmit={ formApi.submitForm }
              id="glossary-entry-update-form"
              className={ Style.form }>
              <div>{ formApi.errors && <Message name="__all__" type="error" messages={ formApi.errors }/> }</div>
              <Input
                formApi={ formApi }
                name="title"
                title="Title"
                help_text="Glossary entry title."
              />
              <TextArea
                formApi={ formApi }
                name="byline"
                title="Byline"
                help_text="Searchable summary of the entry."
              />
              <TextArea
                formApi={ formApi }
                name="content"
                title="Content"
                help_text="Full entry content,"
                rows="4"
                cols="20"
              />
              <div className="fr">
                <button
                  type="submit"
                  className={ Style.buttonDefault }
                >Save
                </button>
              </div>
            </form>
          )}
        </Form>
      </Fragment>
    )
  }
}
