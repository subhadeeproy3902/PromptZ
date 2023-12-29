import { Nav } from "./components"
import { Routes, Route, useNavigate } from "react-router-dom"
import { auth } from "./firebase"
import { Home, CreatePrompt, MyProfile, UpdatePrompt, UserProfile } from "./pages"
import { useEffect, useState } from "react"


function App() {
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

  return (
    <>
    <div className="fixed right-2 bottom-2 font-medium z-10 mx-auto flex w-auto items-center justify-center rounded border py-1.5 px-2.5 text-xs border-zinc-200 bg-purple-300/50 backdrop-blur text-zinc-800 sm:right-8 sm:bottom-6">Made by<a href="https://github.com/subhadeeproy3902" className="ml-1 font-semibold text-zinc-900" target="_blank" rel="noopener noreferrer">Subhadeep</a></div>
      <div className='main'>
        <div className='gradient' />
      </div>
      <main className='app'>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-prompt' element={<CreatePrompt />} />
          <Route path='/myprofile' element={<MyProfile currentUser={currentUser} />} />
          <Route path='/update-prompt/:id' element={<UpdatePrompt />} />
          <Route path='/profile/:id' element={<UserProfile />} />
        </Routes>
      </main>
    </>
  )
}

export default App
