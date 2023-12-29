import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { signInWithGoogle, auth } from '../firebase'
import { signOut } from "firebase/auth";


const Nav = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getout = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => getout();
  }, []);

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
  };




  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link to="/" className='flex flex-center gap-2'>
        <img src="/assets/images/logo.svg" width={30} className='object-contain' height={30} style={{ filter: "hue-rotate(250deg)" }} alt="" />
        <p className='logo_text'>PromptZ</p>
      </Link>

      <div className='sm:flex hidden'>
        {user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link to="/create-prompt" className='violet_btn'>
              Create Prompt
            </Link>
            <button type="button" onClick={handleSignOut} className='outline_btn'>
              Sign Out
            </button>

            <Link to="/myprofile" className='flex gap-2'>
              <img src={user.photoURL} width={37} className='rounded-full object-contain' height={37} alt="" />
            </Link>
          </div>
        )
          : (
            <>
              <button type="button" onClick={signInWithGoogle} className='violet_btn'>
                Sign In
              </button>
            </>
          )}
      </div>


      {/*Mobile Nav*/}
      <div className='sm:hidden flex relative'>
        {user ? (
          <div className='flex gap-2'>
            <h1 className="text-md mt-[0.3rem] animate-ping">👉</h1> <img src={user.photoURL} width={37} className='rounded-full object-contain' height={37} alt="" onClick={() => setToggleDropdown((prev) => !prev)} />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link to="/myprofile"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link to="/create-prompt"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>

                <button type='button' onClick={() => {
                  setToggleDropdown(false)
                  handleSignOut()
                }}
                  className='mt-5 w-full violet_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )
          : (
            <>
              <button type="button" onClick={signInWithGoogle} className='violet_btn'>
                Sign In
              </button>
            </>
          )}
      </div>
    </nav>
  )
}

export default Nav