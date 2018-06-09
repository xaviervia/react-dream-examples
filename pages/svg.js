import React from 'react'
import { withHoverProps } from '@klarna/higher-order-components'
import ReactDream, { of } from 'react-dream'

const withChild = Child => Parent => ({ child = {}, parent = {}, ...props }) =>
  <Parent {...{ ...props, ...parent }}>
    <Child {...{ ...props, ...child }} />
  </Parent>

const Triangle = ReactDream(props => <path {...props} />)
  .addProps(() => ({
    d: 'M 50,5 95,97.5 5,97.5 z',
  }))
  .removeProps('hovered')
  .style(({ hovered }) => ({
    fill: hovered ? 'blue' : 'purple',
  }))
  .name('Triangle')
  .map(withHoverProps({ hovered: true }))

const Layer = ReactDream(props => <g {...props} />)
  .style(({ displacement }) => ({
    transform: `translateX(${displacement}px)`,
  }))
  .name('Layer')

const Figure = of(withChild)
  .ap(Triangle)
  .ap(Layer)

const Picture = ReactDream(props => <svg {...props} />)
  .addProps(({ width, height }) => ({
    viewBox: `0 0 ${width} ${height}`,
  }))
  .name('Picture')

const App = of(withChild)
  .ap(Figure)
  .ap(Picture)
  .contramap(() => ({
    width: 640,
    height: 480,
    displacement: 50,
  }))

export default () => <App.Component />
