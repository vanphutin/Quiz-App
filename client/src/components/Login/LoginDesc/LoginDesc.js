import React from "react";
import { IoSettings } from "react-icons/io5";
import DescLogin from "../Describe/DescLogin";
import { SiBuildkite } from "react-icons/si";
import { BiSolidLike } from "react-icons/bi";
import { RiFunctionAddFill } from "react-icons/ri";

const LoginDesc = () => {
  return (
    <div>
      <DescLogin
        icon={<IoSettings />}
        describe="Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks."
        title="Adaptable performance

"
      />
      <DescLogin
        icon={<SiBuildkite />}
        describe="Experience unmatched durability that goes above and beyond with lasting investment."
        title="Built to last

"
      />
      <DescLogin
        icon={<BiSolidLike />}
        describe="Integrate our product into your routine with an intuitive and easy-to-use interface."
        title="Great user experience

"
      />
      <DescLogin
        icon={<RiFunctionAddFill />}
        describe="Stay ahead with features that set new standards, addressing your evolving needs better than the rest."
        title="Innovative functionality

"
      />
    </div>
  );
};

export default LoginDesc;
