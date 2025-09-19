import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Post from "./Post.jsx";

export default function PostContainer(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
                    withCredentials: true
                });

                const token = Cookies.get("XSRF-TOKEN");

                const res = await axios.get("http://localhost:8000/api/posts", {
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": token
                    }
                });
                setPosts(res.data);
                console.log(res.data)
            } catch (err) {
                console.error(err);
                setError("Failed to load posts");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts().then(r => console.log('done'));
    }, []);

    const renderPost = () => {
        const postCards = []
        for (let index in posts){
            postCards.push(
                <Post
                    title={posts[index].title}
                    content={posts[index].content}
                    comments={posts[index].comments}
                />
            )
        }
        return postCards;
    }

    if (loading) return <p>Loading...</p>;

    return(
        <div className="mt-2">
            {renderPost()}
        </div>
    )
}