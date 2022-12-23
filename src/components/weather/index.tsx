import {useEffect} from "react";
import AMapLoader from '@amap/amap-jsapi-loader';

const Weather = ()=>{
    useEffect(()=>{
        let map:any = null;
        AMapLoader.load({
            "key": "7845d0f7ce84a59037976a1f37fe2218",              // 申请好的Web端开发者Key，首次调用 load 时必填
            "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{
            map = new AMap.Map('container',{
                zoom:12
            });
        }).catch(e => {
            console.log(e);
        })
        return ()=>{
            map && map.destroy()
        }
    },[AMapLoader])
    return (
        <div id='container' style={{height:'600px'}}></div>
    )
}
export default Weather
