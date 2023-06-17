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
import AdminDashboard from './admin/AdminDashboard';
import CreatePost from './admin/CreatePost';
import EditPost from './admin/EditPost';
import AdminRoute from './components/AdminRoute';
import Layout from './admin/global/Layout';


//HOC
const AdminDashboardHOC = Layout(AdminDashboard);

const App = () => {
  return (
    <>
        <ToastContainer />
        <Provider store={store} >
          <ProSidebarProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
                <Route path='/admin/post/create' element={<AdminRoute><CreatePost /></AdminRoute>} />
                <Route path='/admin/post/edit:id' element={<AdminRoute><EditPost /></AdminRoute>} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ProSidebarProvider>
        </Provider>
        
    </>
  );
}

export default App;
