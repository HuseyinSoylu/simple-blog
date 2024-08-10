import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostDetail from "./components/PostDetail";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
