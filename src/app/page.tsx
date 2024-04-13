import { ModeToggle } from "@/components/mode-toggle";
import PostList from "@/components/post-list";

export default function Home() {
  return (
      <div className=" parent-div relative ">
        <div className=" p-6 mr-auto"  >
          <ModeToggle />
        </div>
        <PostList />
      </div>

  );
}
