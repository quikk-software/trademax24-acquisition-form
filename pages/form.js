import { useRouter } from "next/router";
import { CircularProgress } from "@material-ui/core";
import DeviceList from "../components/Util/DeviceList";
0;
const Form = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="container">
      {id ? (
        <DeviceList id={id} />
      ) : (
        <div className="loadingwrapper">
          <CircularProgress />
        </div>
      )}
      <style jsx>
        {`
          .container {
            min-height: calc(100vh - 180px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 80px;
          }

          .loadingwrapper {
            width: 100vw;
            height: 100vh;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
};

export default Form;
