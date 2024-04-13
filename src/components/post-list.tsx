"use client";
import React, { useEffect, useState } from "react";
import { createServer } from "miragejs";
import data from "../mock/data.json";
import ChitChat from "../components/post-card";
import { Button } from "./ui/button";

createServer({
  routes() {
    this.get("/api/posts", () => {
      return data;
    });
  },
});
type Author = {
  name: string;
  avatar: string;
};

type Category = {
  id: string;
  name: string;
};

export type Post = {
  id: string;
  title: string;
  publishDate: string; // Assuming this is always in ISO 8601 format
  author: Author;
  summary: string;
  categories: Category[];
};

const categories = [
  "Surveys and Forms",
  "Digital Marketing",
  "Platform News and Updates",
  "Tips and Best Practise",
  "Data Management",
  "Marketing Analytics",
  "Ecommerce",
  "Landing Pages",
];

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);

  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = (categoryName: string) => {
    setPage(0);
    if (activeCategories.includes(categoryName)) {
      const newActiveCategories = activeCategories.filter(
        (el) => el !== categoryName
      );
      setActiveCategories(newActiveCategories);
    } else {
      setActiveCategories([...activeCategories, categoryName]);
    }
  };

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((json) => {
        console.log(json.posts);
        setPosts(json.posts);
        setFilteredPosts(json.posts);
        setLoading(false);
      });
    // All data is coming because we fetch all the posts from an API
  }, []);

  useEffect(() => {
    if (activeCategories.length === 0) {
      setLoading(true);
      setFilteredPosts(posts);
      setTimeout(() => {
        setLoading(false);
      }, 700);
    } else {
      setLoading(true);
      setFilteredPosts(
        posts.filter((post) => {
          return activeCategories.some((category) =>
            post.categories.some((el) => el.name === category)
          );
        })
      );
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [activeCategories]);

  const handlePagination = (pageIndex: number) => {
    if (pageIndex === -1) return;
    setLoading(true);
    setPage(pageIndex);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  return (
    <div className="container mx-auto">
      <div className="space-x-4 my-10">
        {categories.map((category, index) => (
          <Button
            onClick={() => handleCategoryClick(category)}
            key={index}
            style={{
              fontSize: 13,
            }}
            variant={activeCategories?.includes(category) ? "ghost" : "default"}
          >
            {category}
          </Button>
        ))}
      </div>
      {loading ? (
        <div className="h-[calc(100vh-250px)] w-full flex justify-center items-center">
          <svg
            className="w-[250px] h-[250px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 700 150"
          >
            <path
              fill="none"
              stroke="#FF156D"
              strokeWidth="15"
              strokeLinecap="round"
              strokeDasharray="700 385"
              strokeDashoffset="0"
              d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
            >
              <animate
                attributeName="stroke-dashoffset"
                calcMode="spline"
                dur="2"
                values="685;-685"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
              ></animate>
            </path>
          </svg>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-5">
          {filteredPosts
            .slice(0 + page * 8, 8 + page * 8)
            .map((post, index) => (
              <ChitChat key={index} post={post} />
            ))}
        </div>
      )}

      <div className="mt-10 flex justify-center gap-4">
        {Array.from({ length: filteredPosts.length / 8 }, (_, index) => (
          <button
            className={`w-10 h-10 border border-gray-200 rounded-full  text-black ${
              page === index ? "bg-blue-500" : "bg-white"
            }`}
            key={index}
            onClick={() => handlePagination(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PostList;
