import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [likesSent, setLikesSent] = useState(false);
  const [post, setPost] = useState();

  const imageRef = useRef(null);

  const fetchPost = async () => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/getpost/1`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setPost(json);
        setLoading(false);
      })
      .catch(() => {
        window.alert("An error occurred while making the request");
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleClapAnimation = () => {
    imageRef.current.classList.add("clapping");
    imageRef.current.timer = setTimeout(() => {
      imageRef.current.classList.remove("clapping");
    }, 200);
  };

  const handleLikeClick = () => {
    if (likesSent >= 50) {
      window.alert("You can only send 50 likes per post!");
      return;
    }

    handleClapAnimation();
    setLikesSent((prev) => prev + 1);
    setPost((prev) => ({
      ...prev,
      likes: prev.likes + 1,
    }));
    fetch(`${process.env.REACT_APP_API_URL}/like/1`).catch(() => {
      setLikesSent((prev) => prev - 1);
      setPost((prev) => ({
        ...prev,
        likes: prev.likes - 1,
      }));
      window.alert("An error occurred while making the request");
    });
  };

  return (
    <div className="container">
      {loading ? (
        <div className="loading" />
      ) : (
        <>
          <div className="content">
            <p>{post.name}</p>
            <button onClick={() => handleLikeClick("like")}>
              <img
                ref={imageRef}
                src={require(`./assets/${
                  likesSent ? "filled-clap.png" : "clap.png"
                }`)}
                alt="Clap button"
              />
            </button>
            <p>{post?.likes} likes</p>
          </div>
          <div className="footer">
            Icons made by{" "}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              {" "}
              www.flaticon.com
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
