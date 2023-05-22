import * as React from "react";
import style from "./Video.module.scss";
import video from "../../assets/png/B5_Video/video.png";
import {svgIcons} from "../../assets/svgIcons";
import group from "../../assets/png/B3_About/group.png";
import ReactPlayer from 'react-player';
// @ts-ignore
import src from "../../assets/mp4/src.mp4";
import {useState} from "react";

const text = "The King of all meme coins backed by the biggest degens in the world... Rick & Morty community!";

export const Video = () => {
    const [playing, setPlaying] = useState(false)
    const onClick = () => {
        setPlaying(true)
    }

    return (
        <div className={style.video}>

            <img src={group} alt="" className={style.mobile}/>
            <img src={group} alt="" className={style.desktop}/>

            <div className={style.videoWrapper}>
                <img src={video} alt="" className={style.preview}/>
                <ReactPlayer playing={playing}
                             url={src}
                             height="100%"
                             onEnded={() => setPlaying(false)}

                />

                {
                    !playing && (
                        <button className={style.btn}
                                onClick={onClick}
                        >
                            {svgIcons.play}
                        </button>
                    )
                }

            </div>

            <p className={style.text}>{text}</p>
        </div>
    )
}
