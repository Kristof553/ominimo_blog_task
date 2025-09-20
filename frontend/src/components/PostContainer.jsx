import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Post from "./Post.jsx";

export default function PostContainer(){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
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
                    id={posts[index].id}
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