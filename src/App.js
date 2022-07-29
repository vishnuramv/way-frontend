import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Feed from './pages/Feed';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './apiclient/userapi';
import { setUser } from './context/reducers/userReducer';
import Write from './pages/Write';
import Blog from './pages/Blog';


function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [isLoggedin, setIsLoggedin] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!!token) {
      setIsLoggedin(true)
      if (!user.token) {
        getUser(localStorage.getItem('username'), dispatch, setUser)
      }
    }
  }, [user])

  return (
    <div className="App">
      <Routes>
        {
          !isLoggedin ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route exact path="/" element={
                <>
                  <Header />
                  <Landing />
                </>
              } />
            </>
          ) : (
            <>
              <Route path="/write" element={<Write />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route exact path="/" element={<Feed />} />
            </>
          )
        }
      </Routes>
    </div>
  );
}

export default App;