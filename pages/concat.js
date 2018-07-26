import React from 'react'
import { withHandlers, withState } from 'recompose'
import { Html } from 'react-dream-web-builtins'
import ReactDream, { of } from 'react-dream'

const Title = ReactDream(props => <h1 {...props} />)
  .style(() => ({
    fontFamily: 'sans-serif',
    fontSize: 18,
  }))
  .contramap(({title}) => ({children: title}))
  .name('Title')

const Tagline = ReactDream(props => <p {...props} />)
  .style(() => ({
    fontFamily: 'sans-serif',
    fontSize: 13,
  }))
  .contramap(({tagline}) => ({children: tagline}))
  .name('Tagline')

const Header = Title
  .concat(Tagline.concat(Html.Hr))
  .name('Header')

export default () => (
  <Header.Component
    title="Hello World"
    tagline="Of Fantasy Land Types for React"
  />
)
