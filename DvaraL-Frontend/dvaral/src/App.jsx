import {Routes, Route}  from 'react-router-dom';
import LandingPage from './Pages/user-pages/LandingPage';
import ExplorePage from './Pages/user-pages/ExplorePage';
import UserDashboard from './Pages/user-pages/UserDashboard';
import HallView from './Pages/user-pages/HallView';
import ReservedHall from './Pages/user-pages/ReservedHalls';
import Favourites from './Pages/user-pages/Favourites';
import About from './Pages/user-pages/About';
import { Toaster } from 'react-hot-toast';
import RequestManagement from './Pages/admin-pages/RequestManagement';
import ManagerDashboard from './Pages/manager-pages/ManagerDashboard';
import HallBookingRequests from './Pages/manager-pages/HallBookingRequests';
import HallDetailsForm from './Pages/manager-pages/HallDetailsForm';
import HallEditForm from './Pages/manager-pages/HallEditForm';
import HallManagerRegistration from './Pages/manager-pages/HallManagerRegistration';
import HallImages from './Pages/manager-pages/HallImages';


function App() {

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore-page" element={<ExplorePage/>} />
        <Route path = "/dashboard" element = {<UserDashboard/>}/>
        <Route path = "/hall-view/:hallID" element = {<HallView/>}/>
        <Route path = "/reserved-halls" element = {<ReservedHall/>}/>
        <Route path = "/favourite-halls" element = {<Favourites/>}/>
        <Route path = "/about" element = {<About/>}/>
        <Route path = "/request-management" element = {<RequestManagement/>}/>
        <Route path = "/manager-dashboard" element = {<ManagerDashboard/>} />
        <Route path = "/hall-requests" element = {<HallBookingRequests/>} />
        <Route path = "/add-hall" element = {<HallDetailsForm/>} />
        <Route path = "/edit-hall" element = {<HallEditForm/>} />
        <Route path = "/hall-images" element = {<HallImages/>} />
        <Route path = "/hall-owner-registration" element = {<HallManagerRegistration/>} />
      </Routes>

    </>
  )
}

export default App;
