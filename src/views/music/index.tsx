import styles from './index.module.less'
import Audio from '@/assets/music/EYAir Jami Soul Mr. Bang 시나에 - She纯音乐(Splice Version).mp3'
import XZQ from '@/assets/music/薛之谦 - 演员.mp3'
import React, {useEffect, useRef} from 'react'
// let clear:any
export default function Music() {
    const audioEle = useRef<HTMLAudioElement>(null)
    const cvs = useRef<HTMLCanvasElement>(null)
    const isInit = useRef<boolean>(false)
    const clear = useRef<number>()
    let analyser: AnalyserNode, dataArray: Uint8Array, audCtx: AudioContext, source: MediaElementAudioSourceNode
    useEffect(() => {

        const ctx = (cvs.current as HTMLCanvasElement).getContext('2d')
        if (cvs.current) {
            initCvs()
        }

        if (audioEle.current) {
            const play = () => {
                console.log('该我了')
                if (isInit.current) {
                    return;
                }
                if (!audCtx && !source) {
                    audCtx = new AudioContext();//创建一个音频上下文
                    source = audCtx.createMediaElementSource(audioEle.current as HTMLAudioElement)//创建一个音频源节点
                    analyser = audCtx.createAnalyser();
                    analyser.fftSize = 512//必须为2的n次幂
                    //创建数组，用于接受分析器节点的分析数据
                    dataArray = new Uint8Array(analyser.frequencyBinCount)
                    source.connect(analyser);
                    analyser.connect(audCtx.destination);

                }
                isInit.current = true;
                draw()
            }

            function draw() {

                //新函数 看下
                clear.current = requestAnimationFrame(draw)
                if (cvs.current) {
                    const {width, height} = cvs.current;
                    if (ctx) {
                        ctx.clearRect(0, 0, width, height)
                        if (!isInit.current) {
                            return;
                        }
                        analyser.getByteFrequencyData(dataArray)
                        let len = dataArray.length / 2.5;
                        const barWidth = width / len / 2;

                        for (let i = 0; i < len; i++) {
                            const data = dataArray[i]// <256
                            const barHeight = data / 255 * height;
                            const x1 = i * barWidth + width / 2;
                            const x2 = width / 2 - (i + 1) * barWidth;
                            const y = height - barHeight;
                            // ctx.fillStyle = getRandomColor()
                            ctx.fillStyle = "#d0ebff"

                            ctx.fillRect(x1, y, barWidth - 2, barHeight)
                            ctx.fillRect(x2, y, barWidth - 2, barHeight)
                        }
                    }
                }


            }

            audioEle.current.addEventListener('play', play, false)
            audioEle.current.addEventListener('pause', () => {
                console.log('我执行了')
                if (clear.current) {
                    cancelAnimationFrame(clear.current)
                    isInit.current = false;
                }
            })

        }

    }, [cvs, audioEle])

    function getRandomColor(): string {
        let r = Math.random() * 256;
        let g = Math.random() * 256;
        let b = Math.random() * 256;
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    function initCvs() {
        if (cvs.current) {
            cvs.current.width = 0;
            cvs.current.height = 0;
            let c_width = (cvs.current.parentNode as HTMLElement).clientWidth;
            let c_height = (cvs.current.parentNode as HTMLElement).clientHeight;
            cvs.current.width = c_width;
            cvs.current.height = c_height;
        }
    }

    useEffect(() => {
        const win_resize = () => {
            initCvs()
            console.log(123456)
        }
        window.addEventListener('resize', win_resize, false)
        return () => {
            window.removeEventListener('resize', win_resize)
        }
    }, [])
    return (
        <div className={styles.music_box}>
            <div className={styles.music_canvas}>
                <canvas ref={cvs}></canvas>
            </div>
            <div className={styles.music}>
                <audio ref={audioEle} controls src={Audio}></audio>
            </div>
        </div>
    )
}
