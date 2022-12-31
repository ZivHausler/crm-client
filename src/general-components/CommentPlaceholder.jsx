import React from "react";

const CommentPlaceholder = ({ amount }) => {
  return (
    <div className="flex p-1 flex-col justify-start items-center">
      {[...Array(amount)].map((placeholder, index) => {
        return (
          <div
            key={index}
            className={`animate-pulse flex w-[98%] h-20 items-center m-1 shadow rounded-xl p-2 bg-gray-900/50 backdrop-blur-lg`}
          >
            <div className="flex flex-col gap-2 w-full h-full">
              <p className={`w-32 h-1/3 rounded-full bg-gray-400`}></p>
              <p className={`w-full h-1/4 rounded-full bg-gray-400`}></p>
              <p className={`w-1/4 h-1/4 rounded-full bg-gray-400`}></p>
              <p className={`self-end w-32 h-1/5 rounded-full bg-gray-400`}></p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentPlaceholder;
