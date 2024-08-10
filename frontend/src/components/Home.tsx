import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <Link to="/new" className="mb-4 inline-block">
        <Button>Add New Post</Button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="border shadow-lg">
            <CardHeader className="text-xl font-semibold">
              {post.title}
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {post.content.substring(0, 100)}...{" "}
              </p>
            </CardContent>
            <CardFooter>
              <Link to={`/posts/${post.id}`}>
                <Button variant="link" className="text-blue-500">
                  Read More
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
