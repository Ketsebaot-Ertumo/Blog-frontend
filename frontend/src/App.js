import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import LogIn from './pages/LogIn';
import Singlepost from './pages/Singlepost';
import Register from './pages/Register' ;
import { Provider } from 'react-redux';
import store from './redux/store';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import Layout from './admin/global/Layout';
import AdminDashboard from './admin/AdminDashboard';
import EditPost from './admin/EditPost';
import UserProfile from './user/userProfile';
import CreatePost from './admin/CreatePost';



//HOC
const AdminDashboardHOC = Layout(AdminDashboard);
const CreatePostHOC = Layout(CreatePost);
const EditPostHOC = Layout(EditPost);
const UserProfileHOC = Layout(UserProfile);


const App = () => {
  return (
    <>
        <ToastContainer />
        <Provider store={store}>
          <ProSidebarProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/register' element={<Register />} />
                <Route path='/post/:id' element={<Singlepost />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
                <Route path='/admin/post/create' element={<AdminRoute><CreatePostHOC /></AdminRoute>} />
                <Route path='/admin/post/edit/:id' element={<AdminRoute><EditPostHOC /></AdminRoute>} />
                <Route path='/user/profile' element={<UserRoute><UserProfileHOC /></UserRoute>} />
                <Route path='/user/post/create' element={<UserRoute><CreatePostHOC /></UserRoute>} />
                <Route path='/user/post/edit/:id' element={<UserRoute><EditPostHOC /></UserRoute>} />
              </Routes>
            </BrowserRouter>
          </ProSidebarProvider>
        </Provider>
        
    </>
  );
}

export default App;
