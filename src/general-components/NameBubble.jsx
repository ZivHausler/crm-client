import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

export const NameBubble = ({ user }) => {
  const [userPicture, setUserPicture] = useState();

  const randomInt = () => {
    return Math.floor(Math.random() * (5 - 99 + 1) + 5);
  };

  useEffect(() => {
    fetch(`https://fakeface.rest/face/json?minimum_age=${randomInt()}`)
      .then((response) => response.json())
      .then((result) => {
        setUserPicture(result);
      });
  }, []);

  return (
    <>
      <ReactTooltip
        effect="solid"
        type="light"
        place="left"
        padding="5px 10px"
        border
        multiline
        textColor="black"
      />
      <div className={`overflow-hidden h-9 w-9 rounded-full flex justify-end`}>
        <div data-tip={user?.fullName + "<br />" + user?.email}>
          {userPicture && (
            <img src={userPicture?.image_url} alt="random-person" />
          )}
        </div>
      </div>
    </>
  );
};
