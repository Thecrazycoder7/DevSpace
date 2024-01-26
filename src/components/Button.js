import React from 'react'
import './Style/button.css'

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {}

const Button = (props:Props) => {
  return (
    <button className='btn-style'{...props} />
  )
}

export default Button