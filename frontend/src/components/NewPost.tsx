import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/posts", { title, content })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div>
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default NewPost;
