import React from "react";
import invite from "../icons/invite.png";
import updateUsers from "../icons/updateUsers.png";

const CreateAttributes = ({
  createNew,
  updateUserPermission,
  setShowUserPermissions,
}) => {
  return (
    <div className="flex flex-1 justify-end items-center gap-1">
      <div className="flex flex-col gap-1">
        <img
          src={invite}
          onClick={() => updateUserPermission(1)}
          alt=""
          className={`w-8 cursor-pointer`}
        />
        <img
          src={updateUsers}
          onClick={() => setShowUserPermissions(true)}
          alt=""
          className={`w-8 cursor-pointer`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <button
          onClick={() => createNew("section")}
          className={`bg-sky-700 text-gray-100 text-light border rounded-lg py-1 px-2 hover:font-bold w-[245px]`}
        >
          + Add section
        </button>
        <div className="flex gap-1">
          <button
            onClick={() => createNew("status")}
            className={`bg-sky-700 text-gray-100 text-light border rounded-lg py-1 px-2 hover:font-bold w-[120px]`}
          >
            + Add status
          </button>
          <button
            onClick={() => createNew("type")}
            className={`bg-sky-700 text-gray-100 text-light border rounded-lg py-1 px-2 hover:font-bold  w-[120px]`}
          >
            + Add type
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAttributes;
