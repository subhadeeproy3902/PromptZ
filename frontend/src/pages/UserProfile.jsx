import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Profile } from '../components';


const UserProfile = () => {

  const { id } = useParams();

  const [userPosts, setUserPosts] = useState([]);

  const node_env = import.meta.env.VITE_APP_NODE_ENV;
  const baseUrl = node_env === "production" ? "https://promptz-backend.vercel.app" : "http://localhost:8080";

  useEffect(() => {
    const getMyPosts = async () => {
      const response = await fetch(`${baseUrl}/api/getuserprompts/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      setUserPosts(data.prompts);
    };

    getMyPosts();
  }, [baseUrl]);



  return (
    <Profile
      name={userPosts[0]?.username}
      desc={`Welcome to ${userPosts[0]?.username}'s personalized profile page. Explore ${userPosts[0]?.username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
}

export default UserProfile