import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    axios
      .get(`${import.meta.env.VITE_API_URL}/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
        title,
        content,
      });
      setEditing(false);
      setPost({ id: post!.id, title, content });
    } catch (error) {
      console.error("Error updating the post:", error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>{editing ? "Edit Post" : post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="space-y-4">
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-40"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => setEditing(false)}
                  variant="secondary"
                  className="bg-gray-200"
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdate} variant="default">
                  Update
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="mb-4">{post.content}</p>
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="bg-blue-200"
                >
                  Edit
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  className="bg-red-200"
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PostDetail;
