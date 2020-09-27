import React, { useEffect, useRef, useState } from "react"
import "./App.css"

const App = () => {
  const [loading, setLoading] = useState(true);
  const [likesSent, setLikesSent] = useState(false);
  const [post, setPost] = useState();

  const imageRef = useRef(null);

  const fetchPost = async () => {
    setLoading(true)

    fetch("/.netlify/functions/getPost/1")
      .then(response => response.json())
      .then(json => {
        setPost(json)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchPost();
  }, [])

  const handleClapAnimation = () => {
    imageRef.current.classList.add('clapping')
    imageRef.current.timer = setTimeout(() => {
      imageRef.current.classList.remove('clapping')
    }, 200)
  }

  const handleLikeClick = () => {
    if(likesSent >= 50) {
      window.alert('You can only send 50 likes per post!')
      return
    }

    handleClapAnimation();
    setLikesSent((prev) => prev+1);
    setPost(prev => ({
      ...prev,
      likes: prev.likes + 1
    }))
    fetch("/.netlify/functions/like/1")
      .catch(() => {
        setLikesSent(prev => prev-1);
        setPost(prev => ({
          ...prev,
          likes: prev.likes - 1
        }))
      })
  }

  return (
    <div className="container">
      {loading ? (
        <div className="loading"/>
      ) : (
        <>
          <div className="content">
            <p>Post {post.name}</p>
            <button onClick={() => handleLikeClick('like')}>
              <img ref={imageRef} src={require(`./assets/${likesSent ? 'filled-clap.png' : 'clap.png'}`)}/>
            </button>
            <p>{post?.likes} likes</p>
          </div>
          <div className="footer">
            Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
          </div>
        </>
      )}
    </div>
  )
}

export default App
