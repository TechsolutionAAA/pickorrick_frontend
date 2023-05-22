import * as React from "react";
import style from "./Tokenomics.module.scss";
import pot0 from "../../assets/png/B6_Tokenomics/pot0.png";
import pot1 from "../../assets/png/B6_Tokenomics/pot1.png";
import group from "../../assets/png/B3_About/group.png";

export const Tokenomics = () => {
    return (
        <div className={style.tokenomics}>

            <img src={group} alt="" className={style.mobile1}/>
            {/*<img src={group} alt="" className={style.mobile2}/>*/}
            {/*<img src={group} alt="" className={style.mobile3}/>*/}

            <h2 className={style.title}>Tokenomics</h2>

            <div className={style.pots}>
                {
                    [
                        {src: pot0, label: "90 % LIQUIDITY"},
                        {src: pot1, label: "10 % for cex listing"},
                    ].map(({src, label}, key) => (
                        <div className={style.pot} key={key}>
                            <img src={src} alt=""/>
                            <p className={style.label}>{label}</p>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}
