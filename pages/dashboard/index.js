import Head from "next/head";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import cookie from "js-cookie";
import RequestTable from "../../components/Tables/RequestTable";
import { CircularProgress } from "@material-ui/core";

const Dashboard = () => {
  const { data, revalidate } = useSWR("/api/auth/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <CircularProgress />;
  let loggedIn = false;
  if (data.email) {
    console.log(data);
    loggedIn = true;
  }
  return (
    <>
      <Head>
        <title>Admin-Dashboard - TradeMax24</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {data ? (
        <>
          {loggedIn ? (
            <div className="container">
              <p>
                Angemeldet als <span>{data.email}</span>
              </p>
              <RequestTable />
              <div className="grid">
                <a
                  className="card"
                  onClick={() => {
                    cookie.remove("token");
                    revalidate();
                  }}
                >
                  <h3>Logout &rarr;</h3>
                  <p>Vergesse nicht, dich auszuloggen</p>
                </a>
              </div>
            </div>
          ) : (
            <div className="logincontainer">
              <div className="grid">
                <a href="/dashboard/login" className="card">
                  <h3>Login &rarr;</h3>
                  <p>Logge dich ein für eine Detailübersicht</p>
                </a>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="logincontainer">
          <CircularProgress />
        </div>
      )}
      <style jsx>{`
        .container,
        .logincontainer {
          min-height: calc(100vh - 180px);
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 80px;
          padding: 0 2em 2em 2em;
        }

        .container {
          justify-content: flex-start;
        }

        .container p {
          text-align: center;
        }

        .logincontainer {
          justify-content: center;
        }

        .container span {
          font-weight: bold;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #f03c4d;
          border-color: #f03c4d;
          cursor: pointer;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
