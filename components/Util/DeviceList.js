import React, { useState } from "react";
import SellingForm from "../Util/SellingForm";
import DeviceCard from "../Cards/DeviceCard";
import { Devices } from "../../data/Devices";

function DeviceList({ id }) {
  const [model, setModel] = new useState();
  const [clickable, setClickable] = new useState(true);

  const handleModelClick = (model) => {
    setClickable(false);
    setModel(model);
  };

  return (
    <div className="tm24formgrid">
      {!model && clickable ? (
        Object.values(Devices[id]).map((val, i) => {
          return (
            <>
              {i > 3 ? (
                <div key={i} onClick={() => handleModelClick(val)}>
                  <DeviceCard device={val} />
                </div>
              ) : (
                <></>
              )}
            </>
          );
        })
      ) : (
        <SellingForm id={id} name={Devices[id].name} model={model} />
      )}
      <style jsx>{`
        .tm24formgrid {
          width: 100%;
          max-width: 1000px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}

export default DeviceList;
