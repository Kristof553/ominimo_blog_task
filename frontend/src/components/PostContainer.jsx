import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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
            } catch (err) {
                console.error(err);
                setError("Failed to load posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts().then(r => console.log('success'));
    }, []);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return(
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        </div>
    )
}