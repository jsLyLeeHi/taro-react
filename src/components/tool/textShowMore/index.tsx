import { Text } from '@tarojs/components'
import React, { useState } from 'react'
import './index.scss'

function Index(props: { text: string, maxlength: number }) {
  const [showRule, setShowRule] = useState(false)
  return (
    <>
      <Text>{showRule ? props.text : props.text.substr(0, props.maxlength)}</Text>
      {props.text.length > props.maxlength ? <>
        <Text className="c-main" onClick={() => setShowRule(!showRule)}>{showRule ? "...收起" : "...显示全部"}</Text>
      </> : null}
    </>
  )
}
export default React.memo(Index)