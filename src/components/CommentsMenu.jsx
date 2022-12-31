import React, { useEffect, useState } from "react";
import { useGetTokenFromLocalStorage } from "../customHooks/useGetTokenFromLocalStorage";
import CommentPlaceholder from "../general-components/CommentPlaceholder";

const CommentsMenu = ({ showComments, setShowComments, stompClient }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useGetTokenFromLocalStorage();

  useEffect(() => {
    if (showComments?.itemId === -1) return;
    setIsLoading(true);
    setTimeout(() => {
      fetchComments();
      setIsLoading(false);
    }, 1000);
    fetchComments();
  }, [showComments]);

  const fetchComments = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("BoardId", showComments?.boardId);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://localhost:8081/comment/all-in-item/${showComments.itemId}?sectionId=${showComments?.sectionId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode !== 200) {
          alert(result.message);
          return;
        }
        setComments([...result.data]);
      })
      .catch((error) => console.log("error", error));
  };

  const addComment = () => {
    const name = prompt(
      "Please insert a title for your comment (not required)"
    );
    const description = prompt("Please insert a content for your comment");
    if (!description || description.length <= 0) return;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("BoardId", showComments?.boardId);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      parentItemId: showComments?.itemId,
      sectionId: showComments?.sectionId,
      name,
      description,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8081/comment", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode !== 201) {
          alert(result.message);
          return;
        }
        setComments([...result.data]);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (showComments?.itemId === -1) return;
    // subscribe to comment changes (e.g. status delete, type creation, etc...)
    let commentsSubscribe = stompClient.subscribe(
      `/comment/${showComments?.itemId}/${showComments?.boardId}`,
      (response) => {
        console.log(
          `Comments list have been changed on item:${showComments?.itemId}. Fetching new comments.`
        );
        fetchComments();
      }
    );
    return () => commentsSubscribe.unsubscribe();
  }, [showComments?.itemId]);

  return (
    <div
      style={{
        transition: "all 0.2s ease-in-out",
        right: showComments.itemId > -1 ? "1%" : "-35%",
      }}
      className={`min-w-[300px] w-1/3 h-[85.5vh] fixed top-32 z-40 overflow-hidden rounded-[20px]`}
    >
      <div
        className={`rounded-2xl overflow-auto h-full pb-14 bg-gray-400/30 shadow-lg backdrop-blur-sm `}
      >
        {!isLoading && (
          <div
            className={`w-full sticky py-2 top-0 z-10 bg-gray-500 shadow-xl flex gap-3 items-center justify-center`}
          >
            <button
              onClick={() => setShowComments({ itemId: -1 })}
              className={`bg-white shadow text-black text-light border rounded-lg py-1 px-2 hover:font-bold w-[150px]`}
            >
              Close menu
            </button>
            <button
              onClick={addComment}
              className={`bg-white shadow text-black text-light border rounded-lg py-1 px-2 hover:font-bold w-[150px]`}
            >
              + Add Comment
            </button>
          </div>
        )}
        {isLoading ? (
          <CommentPlaceholder amount={3} />
        ) : comments?.length > 0 ? (
          comments?.map((comment, index) => (
            <div
              key={index}
              className={`flex items-center m-2 shadow rounded-xl p-2 bg-gray-900 backdrop-blur-lg`}
            >
              <div className="text-gray-200 w-full">
                <p className={`underline text-lg font-bold`}>
                  {comment?.title}
                </p>
                <p className={`font-thin`}>{comment?.description}</p>
                <p className={`text-right font-thin text-sm mt-2`}>
                  {comment?.user?.email}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="my-4 mt-9 flex justify-center items-center flex-col font-light">
            <p>This item has no comments.</p>
            <p>Maybe consider create a new one?</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsMenu;
