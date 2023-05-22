import React, { useEffect, useState } from "react";
import style from "./Timer.module.scss";
import WertWidget from "@wert-io/widget-initializer";
import { v4 as uuidv4 } from "uuid";
import buttonloading from "../../assets/png/button-loading.gif";
import SwapModal from "./SwapModal/SwapModal";

declare const window: Window;

export const getDays = (ms: number) => {
  return Math.trunc(ms / (60000 * 60 * 24));
};

export const getHours = (ms: number) => {
  const min = ms / 60000;
  const days = Math.trunc(min / (60 * 24));
  return Math.trunc((min - days * 24 * 60) / 60);
};

export const getMins = (ms: number) => {
  const min = ms / 60000;
  const days = Math.trunc(min / (60 * 24));
  const hours = Math.trunc((min - days * 24 * 60) / 60);
  return Math.trunc(min - days * 24 * 60 - hours * 60);
};

export const getSecs = (ms: number) => {
  const secs = ms / 1000;
  const days = Math.trunc(secs / (60 * 60 * 24));
  const hours = Math.trunc((secs - days * 24 * 60 * 60) / (60 * 60));
  const minutes = Math.trunc(
    (secs - days * 24 * 60 * 60 - hours * 60 * 60) / 60
  );
  return Math.trunc(
    secs - days * 24 * 60 * 60 - hours * 60 * 60 - 60 * minutes
  );
};

const dateEnd = new Date(2023, 7, 14, 5, 55, 30); // дата окончания
export const convertToTwoDigit = (num: number): string =>
  num > 9 ? String(num) : `0${num}`;

const Timer = (props: any) => {
  const [timeIsOver, setTimeIsOver] = useState(false);
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [buycardload, setBuycardload] = useState(false);
  const [open, setOpen] = useState(false);

  const options = {
    partner_id: "default",
    click_id: uuidv4(), // unique id of purhase in your system
    origin: "https://sandbox.wert.io", // this option needed only in sandbox
    currency: "USD",
    commodity: "ETH",
    network: "goerli",
    commodities: JSON.stringify([
      {
        commodity: "ETH",
        network: "goerli",
      },
      {
        commodity: "BTC",
        network: "testnet",
      },
      {
        commodity: "MATIC",
        network: "mumbai",
      },
    ]),
    // currency_amount: 100,
    listeners: {
      loaded: () => {
        setBuycardload(false);
        console.log("loaded");
      },
    },
  };

  const wertWidget = new WertWidget(options);

  useEffect(() => {
    const time = new Date(dateEnd.getTime() - new Date().getTime()).getTime();
    if (time > 0 && !timeIsOver) {
      setTime(time);
      setStart(true);
    }
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (start) {
        if (time <= 60000) {
          setTimeIsOver(true);
          clearTimeout(timeId);
        } else {
          setTime((time) => time - 1000);
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timeId);
    };
  }, [time]);

  const buywithcard = () => {
    wertWidget.mount();
    setBuycardload(true);
  };

  return (
    <div className={style.timer}>
      <div className={style.card}>
        <p className={style.title}>Time To Launch</p>
        <p className={style.subtitle}>ON CENTRAL EXCHANGES IN...</p>

        <div className={style.items}>
          <div className={style.item}>
            <p className={style.value}>{getDays(time)}</p>
            <p className={style.label}>days</p>
          </div>

          <p className={style.separate}>:</p>

          <div className={style.item}>
            <p className={style.value}>{convertToTwoDigit(getHours(time))}</p>
            <p className={style.label}>hours</p>
          </div>

          <p className={style.separate}>:</p>

          <div className={style.item}>
            <p className={style.value}>{convertToTwoDigit(getMins(time))}</p>
            <p className={style.label}>minutes</p>
          </div>

          <p className={style.separate}>:</p>

          <div className={style.item}>
            <p className={style.value}>{convertToTwoDigit(getSecs(time))}</p>
            <p className={style.label}>seconds</p>
          </div>
        </div>

        <p className={style.text}>Or.. Buy Now on Dex!</p>

        <button className={style.etnBtn} onClick={() => setOpen(true)}>
          <p>BUY $Rick WITH ETH</p>
        </button>

        <button className={style.cardBtn} onClick={() => buywithcard()}>
          {buycardload ? (
            <img height="100%" src={buttonloading} alt="buycardload" />
          ) : (
            <p>BUY $Rick WITH card</p>
          )}
        </button>

        <a
          href="https://app.uniswap.org/#/swap"
          target="_blank"
          className={style.nowBtn}
        >
          <p>BUY now</p>
        </a>
      </div>

      <SwapModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Timer;
