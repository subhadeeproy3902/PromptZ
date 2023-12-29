import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Profile } from "../components";


const MyProfile = ({ currentUser }) => {
  const navigate = useNavigate();


  const [myPosts, setMyPosts] = useState([]);

  const node_env = import.meta.env.VITE_APP_NODE_ENV;
  const baseUrl = node_env === "production" ? "https://promptz-backend.vercel.app" : "http://localhost:8080";

  useEffect(() => {
    const getMyPosts = async () => {
      const response = await fetch(`${baseUrl}/api/getuserprompts/${currentUser?.email}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      setMyPosts(data.prompts);
    };

    getMyPosts();
  }, [baseUrl, currentUser]);

  const handleEdit = (post) => {
    navigate(`/update-prompt/${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`${baseUrl}/api/deleteprompt/${post._id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <>

      <Profile
        name='My'
        desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {myPosts.length === 0 && (
        <>
          <h1 className="text-3xl text-center mt-10">You haven't created any prompts yet!</h1>
          <p className="text-center mt-2">Click on the "Create Prompt" button to get started</p>
          <Link to="/create-prompt" className="violet_btn mt-4 sm:hidden mb-10">Create Prompt</Link>
        </>
      )}
    </>
  );
};

export default MyProfile;