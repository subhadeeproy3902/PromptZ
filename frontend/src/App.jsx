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
