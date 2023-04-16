import React from 'react'
import {cls} from "../libs/utils"

export default function ErrorMessage({condition,message}) {
  return (
    <span className={cls("text-xs text-orange-300",condition ? "visible":"invisible" )}>{message} </span>)
}
