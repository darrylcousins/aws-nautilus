/**
 * @file Provides root of the App
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import App from './App'
import './index.css'

// Global amplify configure!!
import Amplify from "aws-amplify"
import aws_config from "./aws-exports"

Amplify.configure(aws_config);

// Configure the GraphQL endpoint and authorization api key
Amplify.configure({
  API: {
    graphql_endpoint: 'https://vtzt5nufwzdi5pppcbditlg63y.appsync-api.us-east-1.amazonaws.com/graphql',
    graphql_headers: async () => ({
      'x-api-key': 'da2-vixpv4m6cfg3visusqwskpmqfa'
    })
  }
})

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
