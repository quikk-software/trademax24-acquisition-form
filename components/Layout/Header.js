import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header>
        <div className="headerwrapper">
          <div className="tm24logo">
            <a href="/">
              <img
                alt="TradeMax24"
                src="https://www.trademax24.de/media/image/fb/g0/be/TradeMax24-LogoKDXsGMH3zglvq.png"
              />
            </a>
          </div>
        </div>
      </header>
      <style jsx>{`
        header {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          background-color: #ffffff;
          position: fixed;
          width: 100%;
          height: 80px;
          z-index: 99;
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        }
        .headerwrapper {
          width: 100%;
          max-width: 1000px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }
        .tm24logo img {
          margin: 1em;
          width: 200px;
        }
      `}</style>
    </>
  );
};

export default Header;
