import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { supabase } from "../../supaBaseClient";
import NewPost from "../components/NewPost";
import SearchPosts from "../components/SearchPosts";
import PostList from "../components/PostList";
import Comments from "../components/Comments";

const Blog = () => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [showPosts, setShowPosts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  //comments
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");



  const buttonText = showNewPost ? (
    <div className="flex flex-col m-2">
      <Icon icon="ic:baseline-edit-off" />
    </div>
  ) : (
    <div className="flex flex-col m-2">
      <Icon icon="material-symbols:edit" />
    </div>
  );

  useEffect(() => {
    const postList = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, body, created_at, updated_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Error fetching posts:", error.message);
      } else {
        setPosts(data);
      }
      setIsLoading(false);
    };
    setTimeout(() => {
      postList();
    }, 1000);
  }, []);

  const handlePostButton = () => {

    setShowNewPost(!showNewPost);
    setShowPosts(!showPosts);
  };



  return (
    <div className="flex h-screen overflow-scroll bg-secondary">
    <div className="flex-1 flex flex-col">
        <div className="header flex nm-concave-primary-sm p-5 flex-col">
          <span className="flex items-center">
            <Icon
              icon="carbon:blog"
              className="stroke-1 stroke-red-400 text-accent m-2 w-10 h-10 align-middle"
            />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm">
              Blog
            </h1>
          </span>
          <div className="flex-1 flex text-sm">
            <p className="mt-1 text-orange-600 w-2/3 opacity-80">
              The SteamSearch Blog is a place to share our thoughts on
              the latest news and updates in the world of gaming on Steam.
            </p>
          </div>
        </div>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary">
          <div className="flex flex-col md:flex-row md:gap-3 m-5">
            <div className="flex flex-col w-2/3 sm:w-full md:w-2/3 lg:w-2/3 p-5">

            <div className="flex flex-col w-full sm:w-full md:w-full lg:w-full p-5 ">
            <span className="flex items-center">
         
  
          
            <button
              className="m-5 text-center w-20 justify-center inline-flex  border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-br from-orange-400 to-red-600 drop-shadow-sm hover:from-orange-600 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              onClick={handlePostButton}
            >
              {buttonText}
            </button>

            <h3 className="text-md font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-300 to-red-600 drop-shadow-sm">
            Create a new post
          </h3>

            </span>

            <div
              className={`p-5 transition-transform duration-500 ease-in-out  ${showNewPost
                ? "transform translate-x-0"
                : "transform translate-y-full"
                } ${showNewPost
                  ? "opacity-100 pointer-events-auto max-h-auto"
                  : "opacity-0 pointer-events-none max-h-0"
                }`}
            >
              <NewPost />
            </div>
          </div>
              <div className="text-relative rounded-md mb-20 w-full position relative lg:w-full p-5 mx-auto">
                {isLoading ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <Icon
                        icon="svg-spinners:gooey-balls-1"
                        className="mx-auto w-40 h-40 text-accent drop-shadow-md"
                      />
                    </div>
                  </div>
                ) : (
                  <PostList posts={posts} />
                )}
              </div>

             
                

              
              

            </div>

            {/* SEARCH CONTAINER *RIGHT SIDE* */}
            <div className="flex flex-col w-1/3 sm:w-full md:w-1/3 lg:w-1/3 p-5 ">
              <SearchPosts />
              <div className="flex flex-col w-full sm:w-full md:w-full lg:w-full p-5 ">
                <div className="text-relative rounded-md w-full position relative lg:w-full p-5 mx-auto">
                  <div className="flex flex-row gap-3">


                  </div>
                </div>
              </div>
            </div>
          </div>

         
        </main>
      </div>
    </div>
  );
};

export default Blog;