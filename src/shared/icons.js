import React from 'react'
import './style.scss'
import ClubesIconSvg from '../assets/icons/clubes_icon_svg'
import DiamondsIconSvg from '../assets/icons/diamonds_icon_svg'
import HeartsIconSvg from '../assets/icons/hearts_ico_svg'
import SpadesIconSvg from '../assets/icons/spades_icon_svg'
import './icons_animation.scss'

const Icons = {
  CLUBES: <ClubesIconSvg />,
  DIAMONDS: <DiamondsIconSvg />,
  HEARTS: <HeartsIconSvg />,
  SPADES: <SpadesIconSvg />,
}

const Icon = (props) => {
  const style = props.style
  const size = props.size ? `_${props.size}` : ''
  const color = [Icons.HEARTS, Icons.DIAMONDS].includes(
    Icons[props.type.toLocaleUpperCase()],
  )
    ? 'card_symbol_color'
    : ''
  return (
    <div>
      <div style={style} className={`card_container${size} ${props.className}`}>
        <div className={`icon_top${size}`}>
          <div className={`card_symbol${size} ${color}`}>{props.symbol}</div>
          {Icons[props.type.toLocaleUpperCase()]}
        </div>
        <div className={`icon_center${size}`}>
          {Icons[props.type.toLocaleUpperCase()]}
        </div>
        <div className={`icon_bottom${size}`}>
          <div className={`card_symbol${size} ${color}`}>{props.symbol}</div>
          {Icons[props.type.toLocaleUpperCase()]}
        </div>
      </div>
    </div>
  )
}

const IconCards = (props) => {
  const style = props.style
  return (
    <div className="icons_cards_container">
      <Icon type="clubes" className="Q" style={style} symbol={'Q'} />
      <Icon type="hearts" className="A" style={style} symbol={'A'} />
      <Icon type="diamonds" className="num" style={style} symbol={'10'} />
      <Icon type="spades" className="K" style={style} symbol={'K'} />
    </div>
  )
}

const IconsRandomApear = () => {
  const animatedIconsArr = []
  const classNameList = [
    'topright',
    'bottomright',
    'topleft',
    'bottomleft',
    'up',
    'down',
    'left',
    'right',
  ]
  const iconsArr = Object.keys(Icons)
  for (let j = 0; j < classNameList.length; j++) {
    animatedIconsArr.push(
      <div key={j}
      className={`${iconsArr[
          Math.floor(Math.random() * iconsArr.length)
        ].toLowerCase()} animate-${classNameList[j]}`}
      ></div>,
    )
  }

  return <div className="animation-box">{animatedIconsArr}</div>
}

export { IconCards, Icon, IconsRandomApear }
