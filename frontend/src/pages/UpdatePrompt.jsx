import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "../components";
import { auth } from "../firebase"




const UpdatePrompt = () => {

  const { id } = useParams();
  const promptId = id;


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


  const [post, setPost] = useState({ prompt: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  const node_env = import.meta.env.VITE_APP_NODE_ENV;
  const baseUrl = node_env === "production" ? "https://promptz-backend.vercel.app" : "http://localhost:8080";

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`${baseUrl}/api/getpromptbyid/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt.prompt,
        tag: data.prompt.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`${baseUrl}/api/updateprompt/${promptId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: post.prompt,
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
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;