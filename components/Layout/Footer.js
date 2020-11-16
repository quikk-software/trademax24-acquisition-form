const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerwrapper">
        <div className="footercontentleft">
          <a href="https://quikk.de" target="_blank">
            Powered by QUIKK
          </a>
        </div>
        <div className="footercontentright">
          <a href="https://www.trademax24.de/impressum" target="_blank">
            Impressum
          </a>
          <a
            href="https://www.trademax24.de/datenschutzerklaerung"
            target="_blank"
          >
            Datenschutz
          </a>
        </div>
      </div>
      <style jsx>{`
        .footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .footerwrapper {
          width: 100%;
          max-width: 1000px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        .footer img {
          margin-left: 0.5rem;
        }

        .footer a {
          margin: 1em;
        }

        .footercontentleft {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          width: 50%;
        }

        .footercontentright {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          width: 50%;
        }

        @media (max-width: 600px) {
          .footerwrapper {
            flex-direction: column-reverse;
            flex-wrap: flex-reverse;
          }

          .footercontentleft {
            justify-content: center;
            width: 100%;
          }

          .footercontentright {
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
