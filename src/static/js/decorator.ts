import { debounce, throttle } from './until'


/** 
 * 防抖装饰器
 * @interval 防抖时长
*/
export function DecoratorDebounce(interval: number) {
    return function (target, name, descriptor) {
        // descriptor.value = debounce(descriptor.value, interval)
        descriptor.value = debounce(target[name], interval)
    }
}


/** 
 * 节流装饰器
 * @interval 节流时长
*/
export function DecoratorThrottle(interval: number) {
    return function (target, name, descriptor) {
        // descriptor.value = debounce(descriptor.value, interval)
        descriptor.value = throttle(target[name], interval)
    }
}