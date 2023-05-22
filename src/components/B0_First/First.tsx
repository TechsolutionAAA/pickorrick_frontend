import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "./First.module.scss";
import mainMobile from "../../assets/png/B0_First/main-mobile.png";
import mainDesktop from "../../assets/png/B0_First/main-desktop.png";
import cucumber0 from "../../assets/png/B0_First/cucumber_0.png";
import cucumber1 from "../../assets/png/B0_First/cucumber_1.png";
import group from "../../assets/png/B0_First/cucumbers.png";
import { useNavigate } from "react-router-dom";
import { saveWalletStatus } from "../../actions/walletActions";

const First = (props: any) => {
  const navigate = useNavigate();

  const [isMetamaskInstalled, setIsMetamaskInstalled] =
    useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = () => {
    //check if Metamask wallet is installed
    if ((window as any).ethereum) {
      setIsMetamaskInstalled(true);

      (window as any).ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts: string[]) => {
          setAccount(accounts[0]);
          props.saveWalletStatus("connected");
        })
        .catch((error: any) => {
          alert(`Something went wrong: ${error}`);
        });
    } else {
      alert("Please install Metamask wallet!");
    }
  };

  const disconnectWallet = () => {
    alert("helo");
  };

  useEffect(() => {
    if (props.walletstatus.status === "connected") {
      if ((window as any).ethereum) {
        setIsMetamaskInstalled(true);
        (window as any).ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then((accounts: string[]) => {
            setAccount(accounts[0]);
          })
          .catch((error: any) => {
            alert(`Something went wrong: ${error}`);
          });
      } else {
        alert("Please install Metamask wallet!");
      }
    }
  }, [props.walletstatus]);

  const stakingJarFunc = () => {
    if (account) {
      navigate("/staking");
    } else {
      alert("Please connect wallet");
    }
  };

  return (
    <div className={style.first}>
      <img src={mainMobile} alt="" className={style.mainMobile} />
      <img src={mainDesktop} alt="" className={style.mainDesktop} />

      <img src={cucumber0} alt="" className={style.cucumber0} />
      <img src={cucumber1} alt="" className={style.cucumber1} />
      <img src={group} alt="" className={style.group} />

      <button className={style.stakingBtn} onClick={() => stakingJarFunc()}>
        <p>Staking Jar</p>
      </button>

      <button
        className={style.pickleBtn}
        onClick={() => navigate("/dashboard")}
      >
        <p>Pickle Jar</p>
      </button>

      {account ? (
        <button className={style.connectBtn} onClick={() => disconnectWallet()}>
          <p>Disconnect</p>
        </button>
      ) : (
        <button className={style.connectBtn} onClick={() => connectWallet()}>
          <p>Connect</p>
        </button>
      )}

      <p className={style.subtitle}>[ get it pickle rick...]</p>

      <p className={style.label}>$Rick Coin</p>

      <p className={style.text}>The No1 Vote to Earn Crypto</p>
    </div>
  );
};

First.propTypes = {
  saveWalletStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
  walletstatus: state.walletstatus,
});

export default connect(mapStateToProps, { saveWalletStatus })(First);
