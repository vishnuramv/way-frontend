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
import Bookmarks from './pages/Bookmarks';
import UserBlog from './pages/UserBlog';
import { getMyFollow } from './apiclient/followapi';
import { setFollow } from './context/reducers/followReducer';


function App() {
  const user = useSelector((state) => state.user)
  const follow = useSelector((state) => state.follow)
  const dispatch = useDispatch()
  const [isLoggedin, setIsLoggedin] = useState(false)
  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem('token')
      if (!!token) {
        setIsLoggedin(true)
        getUser(localStorage.getItem('username'), dispatch, setUser).then(() => {
        })
        getMyFollow(dispatch, setFollow).then(() => {
        })
      }
    }
    getData()
  }, [user])


  return (
    <div className="App">
      <Routes>
        <Route path="/blog/:id" element={<Blog />} />
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
              <Route path="my-blog" element={<UserBlog />} />
              <Route path="saved-posts" element={<Bookmarks />} />
              <Route exact path="/" element={<Feed />} />
            </>
          )
        }
      </Routes>
    </div>
  );
}

export default App;