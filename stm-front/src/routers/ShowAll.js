import React from "react";
import Base from "../components/Base";

const ShowAll = () => {
  return (
    <>
      <Base></Base>
      <ul>
        <li>
          09/10 지출 0원
          <button>수정</button>
          <button>❌</button>
        </li>
      </ul>
    </>
  );
};

export default ShowAll;