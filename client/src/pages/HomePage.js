import React from "react";
import { toast } from "react-toastify";

const HomePage = () => {
  return (
    <div>
      Hello , welcome{" "}
      <a href="">
        <p>{"vanphutin"}</p>
      </a>
      <button
        onClick={() => {
          toast.success("success");
        }}
      >
        {" "}
        Click me --------------
      </button>
      <div className="card">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat unde
        ducimus, exercitationem corrupti sunt ipsam adipisci accusantium dolores
        porro amet recusandae debitis ullam quibusdam laboriosam. Impedit ad
        quas et architecto?
      </div>
      <div className="alert-success">.alert-success</div>
      <div className="alert-warning">.alert-warning </div>
      <div className="selected">a</div>
    </div>
  );
};

export default HomePage;
