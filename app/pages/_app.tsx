import React from 'react'
import App from 'next/app'

//For FontAwesome icons
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import { GlobalState } from '../State/globalState'
import { initialState } from '../State/initialState'
import { reducer } from '../State/reducers'
import Layout from '../components/Layout'

import Amplify from '@aws-amplify/core'
import awsExports from '../src/aws-exports'
import AWSAuth from '../components/AWSAuth'
import NextStyledNavBar from '../components/NavBar/NextStyledNavBar'

Amplify.configure(awsExports)

class MyApp extends App {

  render() {
    const { Component, pageProps } = this.props
    return (

      <Layout>


        <GlobalState initialState={initialState} reducer={reducer}>
          <AWSAuth>
            <NextStyledNavBar siteTitle="Bullionix" logo={<img src="/bullionix.png" />} />
            <Component {...pageProps} />
          </AWSAuth>
        </GlobalState>
      </Layout>


    )
  }
}

export default MyApp