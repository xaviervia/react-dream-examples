import React from 'react'
import ReactDream from 'react-dream'
import elegir from 'elegir'
import Color from 'fantasy-color'
import { withKeyboardFocusProps, withHoverProps, withPressedProps } from '@klarna/higher-order-components'

const getIds = ({ id }) => ({
  ids: id
      ? {
          root: id,
          text: `${id}__text`,
        }
      : {},
})

const baseBackgroundColor = '#4499FF'
const hoveredBackgroundColor = '#3399EE'
const pressedBackgroundColor = '#2288DD'
const keyboardFocusedColor = '#66BBFF'
const disabledBackgroundColor = Color.of(0x44, 0x99, 0xFF, 0.5).toString()
const baseTextColor = '#ffffff'
const disabledTextColor = 'rgba(255, 255, 255, 0.5)'

const getDefaultStyleSheet = ({
  disabled,
  keyboardFocused,
  hovered,
  isSmall,
  isMedium,
  pressed
}) => ({
  styleSheet: {
    buttonStyle: {
      backgroundColor: 'rgba(0,0,0,0)',
      border: 'none',
      cursor: disabled ? 'auto' : 'pointer',
      outline: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    },
    viewStyle: {
      display: 'flex',
      backgroundColor: elegir(
        // disabled
        disabled,
        disabledBackgroundColor,
        // pressed
        pressed,
        pressedBackgroundColor,
        // hovered
        hovered,
        hoveredBackgroundColor,
        // default
        true,
        baseBackgroundColor
      ),
      borderRadius: 3,
      height: elegir(
        // small
        isSmall,
        30,
        // medium
        isMedium,
        40,
        // default
        true,
        50
      ),
      padding: 4,
      position: 'relative',
      transition: 'background-color .2s ease, border-color .2s ease',
    },
    overlayStyle: {
      display: 'flex',
      backgroundColor: keyboardFocused ? keyboardFocusedColor : 'rgba(0,0,0,0)',
      borderRadius: 3,
      bottom: -1,
      left: -1,
      opacity: keyboardFocused ? 0.4 : 1,
      position: 'absolute',
      right: -1,
      top: -1,
      transition: 'background-color .2s ease, opacity .2s ease',
      zIndex: 1,
    },
    innerViewStyle: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: keyboardFocused ? baseBackgroundColor : 'rgba(0,0,0,0)',
      borderRadius: 3,
      height: '100%',
      justifyContent: 'center',
      paddingBottom: 0,
      paddingLeft: elegir(
        // small
        isSmall,
        12,
        // medium
        isMedium,
        17,
        // default
        true,
        21
      ),
      paddingRight: elegir(
        // small
        isSmall,
        12,
        // medium
        isMedium,
        17,
        // default
        true,
        21
      ),
      paddingTop: 0,
      position: 'relative',
      transition: 'background-color .2s ease, border-color .2s ease, color .2s ease',
      zIndex: 2,
    },
    textStyle: {
      color: elegir(
        // disabled
        disabled,
        disabledTextColor,
        // default
        true,
        baseTextColor
      ),
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: isSmall || isMedium ? 14 : 16,
      transition: 'color .2s ease',
    },
  },
})

const Button = ReactDream(({
  children,
  ids,
  onClick,
  onPress,
  styleSheet: {
    buttonStyle,
    viewStyle,
    overlayStyle,
    innerViewStyle,
    textStyle,
  },
  ...props
}) => (
  <button
    id={ids.root}
    style={buttonStyle}
    onClick={onClick}
    {...props}
  >
    <div style={viewStyle}>
      <div style={overlayStyle} />
      <div style={innerViewStyle}>
        <span id={ids.text} style={textStyle}>
          {children}
        </span>
      </div>
    </div>
  </button>
))
  .removeProps('hovered', 'pressed', 'keyboardFocused', 'isSmall', 'isMedium')
  .addProps(getIds)
  .addProps(getDefaultStyleSheet)
  .addProps(({ size }) => ({
    isSmall: size === 'small',
    isMedium: size === 'medium',
  }))
  .name('InnerButton')
  .map(withKeyboardFocusProps({ keyboardFocused: true }))
  .map(withHoverProps({ hovered: true }))
  .map(withPressedProps({ pressed: true }))
  .name('Button')

export default () => (
  <main>
    <Button.Component>
      Click me
    </Button.Component>
    <hr />
    <Button.Component disabled>
      Click me
    </Button.Component>
    <hr />
    <Button.Component size='small'>
      Click me
    </Button.Component>
  </main>
)
