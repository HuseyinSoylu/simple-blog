import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md mb-4">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="text-black hover:text-blue-500">
            My Blog
          </Link>
        </h1>
        <nav>
          <Link to="/" className="mr-4">
            <Button variant="link" className="text-black hover:text-blue-500">
              Home
            </Button>
          </Link>
          <Link to="/new">
            <Button variant="link" className="text-black hover:text-blue-500">
              Add New Post
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
