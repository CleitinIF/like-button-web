import React, { Component, useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.css"

const App = () => {
  const [post, setPost] = useState();

  const fetchPost = async () => {
    fetch("/.netlify/functions/getPost")
      .then(response => response.json())
      .then(json => setPost(json))
  }

  useEffect(() => {
    fetchPost();
  }, [])

  const handleLikeClick = (state) => {
    fetch("/.netlify/functions/" + state)
      .then(response => response.json())
      .then(json => setPost(prev => ({
        ...prev,
        likes: json.likes
      })))
  }

  return (
    <div className="App">
      <p>Artigo: {post?.likes} likes</p>
      <button onClick={() => handleLikeClick('like')}>Like</button>
    </div>
  )
}

export default App
