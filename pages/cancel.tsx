import React from 'react'
import { ImSad } from "react-icons/im";

const cancel = () => {
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <ImSad size={100} />
        </p>
        <h2 className='description'>
          Something went wrong please try again later
        </h2>
      </div>
    </div>
  );
}

export default cancel
