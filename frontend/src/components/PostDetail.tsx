import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`).then((response) => {
      setPost(response.data);
      setTitle(response.data.title);
      setContent(response.data.content);
    });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/posts/${id}`).then(() => {
      navigate("/");
    });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5000/api/posts/${id}`, { title, content })
      .then(() => {
        setEditing(false);
        setPost({ id: post!.id, title, content });
      });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      {editing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
