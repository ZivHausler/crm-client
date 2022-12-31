import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTokenFromLocalStorage } from "../customHooks/useGetTokenFromLocalStorage";
import PrioritiesList from "../general-components/PrioritiesList";
import StatusesList from "../general-components/StatusesList";
import TypesList from "../general-components/TypesList";

const Filter = ({ types, statuses, setFilters, filters, userPermission }) => {
  const [editAttributes, setEditAttributes] = useState(false);
  const token = useGetTokenFromLocalStorage();
  const { boardId } = useParams();

  const removeAttribute = (attributeId, type) => {
    if (!editAttributes) return;

    var myHeaders = new Headers();
    myHeaders.append("BoardId", boardId);
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:8081/${type}/${attributeId}`, requestOptions);
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch((error) => console.log("error", error));
  };

  return (
    <div className={` h-full flex items-center justify-center gap-2`}>
      {!(
        (types?.length === 0 && statuses.length === 0) ||
        userPermission < 3
      ) && (
        <button
          className="border text-sm rounded-xl"
          onClick={() => setEditAttributes(!editAttributes)}
        >
          Edit Attributes
        </button>
      )}
      <div
        className={`max-w-[550px] flex select-none shadow rounded-lg flex-col w-full justify-center items-start max-h-24 gap-1 overflow-y-auto py-1 px-2`}
      >
        <StatusesList
          editAttributes={editAttributes}
          removeAttribute={removeAttribute}
          statuses={statuses}
          setFilters={setFilters}
          filters={filters}
        />
        <TypesList
          editAttributes={editAttributes}
          removeAttribute={removeAttribute}
          types={types}
          setFilters={setFilters}
          filters={filters}
        />
        <PrioritiesList setFilters={setFilters} filters={filters} />
      </div>
    </div>
  );
};

export default Filter;
