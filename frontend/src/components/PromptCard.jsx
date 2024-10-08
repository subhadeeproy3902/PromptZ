import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {auth} from "../firebase";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);


  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {

    if (post.userUid === currentUser?.uid) return navigate("/myprofile");

    navigate(`/profile/${post.useremail}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <img
            src={post.userpic}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi break-all font-semibold text-gray-900'>
              {post.username}
            </h3>
            <p className='font-inter break-all text-sm text-gray-500'>
              {post.useremail}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <img
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm break-all text-gray-700'>{post.prompt.length > 200 ? `${post.prompt.substring(0, 200)}......` : post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag.length > 40 ? `${post.tag.substring(0, 40)}......` : post.tag}
      </p>

      {currentUser?.uid === post.userUid && pathname === "/myprofile" && (
        <div className='mt-5 flex items-end justify-end font-semibold gap-6 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm text-green-600 cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm text-red-600 cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;