import React from "react";
import Image from "next/image";
import { Post } from "@/components/post-list";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export interface Props {
  post: Post;
}

function ChitChat({ post }: Props) {
  const { author, title, summary, publishDate, id , categories } = post;
  const { avatar } = author;
  const { push } = useRouter();
  return (
    <div
      onClick={() => push(`/post/${id}`)}
      className="cursor-pointer p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col space-x-4 "
    >
      <div className="flex items-center justify-between">
          <Image
          className="rounded-full"
          src={avatar}
          alt="ChitChat Logo"
          width={54}
          height={54}
        />  
        <span className=" text-slate-400 font-light text-sm ">
          {dayjs(publishDate).format("DD.MM.YYYY")}
        </span>
      </div>
      <div className="mt-4">
        <div className="text-lg font-medium text-black">{title}</div>
        <p className="text-slate-500 text-sm mt-2">{summary}</p>
        { categories.map(c =>(<Badge className=" : bg-cyan-200">{c.name}</Badge>) )}
      </div>
      
    </div>
  );
}

export default ChitChat;
