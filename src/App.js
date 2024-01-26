import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from './pages/UserPage';
import { PostPage } from './pages/PostPage';
import { AlbumPage } from './pages/AlbumPage';
import UserProfilePage from '../src/Profile-page/UserProfilePage'
import AddUserForm from './components/AddUserForm';
import PhotoAlbum from './Profile-page/Profile-Card/photoAlbum';
import PostComments from './Profile-page/Profile-Card/postComment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<UserPage />} />
          <Route path="/postpage" element={<PostPage />} />
          <Route path="/albumpage" element={<AlbumPage />} />
          <Route path="/adduserform" element={<AddUserForm />} />
          <Route path="/user/:id" element={<UserProfilePage />} />
          <Route path="/post/:postId" element={<PostComments />} />
          <Route path="/album/:albumId" element={<PhotoAlbum />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
