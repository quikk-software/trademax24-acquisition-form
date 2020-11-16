import ModelCard from "../components/Cards/ModelCard";
import ButtonCard from "../components/Cards/ButtonCard";
import { Devices } from "../data/Devices";

export default function Home() {
  return (
    <div className="container">
      <main className="main">
        <div className="landing">
          <h1>Willkommen bei TradeMax24!</h1>
          <p>
            Verkaufen Sie Ihr altes Apple-Gerät in nur wenigen, einfachen
            Schritten.
          </p>
        </div>
        <div className="tm24formgrid">
          {Object.values(Devices).map((model, i) => {
            if (!Array.isArray(model))
              return (
                <ModelCard
                  key={i}
                  image={model.image}
                  name={model.name}
                  reflink={model.reflink}
                  id={model.id}
                />
              );
          })}
        </div>

        <div className="grid">
          <ButtonCard
            link="/dashboard"
            title="Admin-Dashboard"
            text="Admin-Dashboard nur für Mitarbeiter"
          />
          <ButtonCard
            link="https://www.trademax24.de"
            title="Zurück"
            text="Hier geht's zurück zur Startseite von TradeMax24"
          />
        </div>
      </main>
      <style jsx>{`
        .container {
          min-height: calc(100vh - 180px);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          margin-top: 80px;
        }

        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .main h1 {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .main h1,
        .main p {
          text-align: center;
        }

        .landing {
          margin: 2em;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }

        .tm24formgrid {
          width: 100%;
          max-width: 1000px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }

          .main h1 {
            margin: 0;
            line-height: 1.15;
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}
