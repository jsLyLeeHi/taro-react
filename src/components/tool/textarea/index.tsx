import { Textarea, View, Text } from '@tarojs/components'
import React from "react"
import './index.scss'

function Index(props: { placeholder?: string, onChange?: (v: string) => void, maxlength?: number, value?: string }) {
  function onInput(ev) {
    if(props.onChange instanceof Function){
      props.onChange(ev.detail.value)
    }
  }
  return (
    <View className="yz-textarea-box">
      <Textarea placeholder={props.placeholder} onInput={onInput} value={props.value} className="yz-textarea"
        maxlength={props.maxlength}>
      </Textarea>
      {Number(props.maxlength || -1) > 0 ? (
        <View className="yz-textarea-lable c-gray-6 s-xs">
          <Text className="c-main">{props?.value?.length || 0}</Text>/{props.maxlength}
        </View>
      ) : null}
    </View>
  )
}
export default React.memo(Index)
