"use client";

import { Post } from "@/components/post-list";
import { createServer } from "miragejs";
import data from "../../../mock/data.json";

import React, { useEffect, useState } from "react";
import ChitChat from "../../../components/post-card";

createServer({
  routes() {
    this.get("/api/posts", () => {
      return data;
    });
  },
});

const Index = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState<Post | undefined>(undefined);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((json) => {
        console.log(params.slug);
        const _data = json.posts.find((el: Post) => el.id === params.slug);
        setData(_data);
      });
  }, []);

  if (!data)
    return (
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
    );

  return (
    <div className=" flex justify-center items-center h-screen">
      <ChitChat post={data} />
    </div>
  );
};

export default Index;
