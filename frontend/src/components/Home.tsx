import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      <Link to="/new">Add New Post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
