import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../components";
import { auth } from "../firebase"

const CreatePrompt = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/")
    }
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);


  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const node_env = import.meta.env.VITE_APP_NODE_ENV;
  const baseUrl = node_env === "production" ? "https://promptz-backend.vercel.app" : "http://localhost:8080";

  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${baseUrl}/api/createprompt`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userUid: currentUser?.uid,
          username: currentUser?.displayName.replace(" ", "").toLowerCase(),
          useremail: currentUser?.email,
          userpic: currentUser?.photoURL,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;