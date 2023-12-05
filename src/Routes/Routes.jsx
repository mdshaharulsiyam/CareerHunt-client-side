import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from "../Layout/Pages/Home/Home";
import SignUp from "../Layout/Pages/SignUp/SignUp";
import Login from "../Layout/Pages/Login/Login";
import Dashboard from "../DashboardLayout/Dashboard/Dashboard";
import useAxiosrequest from "../Hooks/useAxiosrequest";
import Root from "../Layout/Pages/Root/Root";
import TeachOn from "../Layout/Pages/TeachOn/TeachOn";
import TeacherRequest from "../DashboardLayout/TeacherRequest/TeacherRequest";
import StudentRoute from "../PrivetRoutes/StudentRoute"
import Details from "../Layout/Pages/Details/Details";
import Payment from "../Layout/Pages/Payment/Payment";
import Profile from "../DashboardLayout/Profile/Profile";
import AdminRoute from "../PrivetRoutes/AdminRoute";
import AllUsers from "../DashboardLayout/AllUsers/AllUsers";
import TeacherRoute from "../PrivetRoutes/TeacherRoute";
import AddClasses from "../DashboardLayout/AddClasses/AddClasses";
import PrivetRoute from "../PrivetRoutes/PrivetRoute";
import LoginRoute from "../PrivetRoutes/LoginRoute";
import AllClasses from "../DashboardLayout/AllClasses/AllClasses";
import MyClasses from "../DashboardLayout/MyClasses/MyClasses";
import UpdateClass from "../DashboardLayout/UpdateClass/UpdateClass";
import MyClassDetails from "../DashboardLayout/MyClassDetails/MyClassDetails";
import MyEnrollment from "../DashboardLayout/MyEnrollment/MyEnrollment";
import Assignments from "../DashboardLayout/Assignments/Assignments";
import Courses from "../Layout/Pages/Courses/Courses";
import ClassFeedBack from "../DashboardLayout/ClassFeedBack/ClassFeedBack";
import ContactUs from "../Layout/Pages/ContactUs/ContactUs";
import Messages from "../DashboardLayout/Messages/Messages";
const Routes = () => {
  const axiosrequest = useAxiosrequest()
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/contact",
          element: <PrivetRoute><ContactUs></ContactUs></PrivetRoute>,
        },
        {
          path: "/signup",
          element: <LoginRoute> <SignUp></SignUp></LoginRoute>,
        },
        {
          path: "/login",
          element: <LoginRoute><Login /> </LoginRoute>,
        },
        {
          path: "/Classes",
          element: <Courses></Courses>,
        },
        {
          path: "/teachon",
          element: <PrivetRoute><StudentRoute><TeachOn></TeachOn></StudentRoute></PrivetRoute>,
        },
        {
          path: "/details/:id",
          element: <PrivetRoute> <StudentRoute><Details></Details></StudentRoute></PrivetRoute>,
        },
        {
          path: "/payment/:id",
          element: <PrivetRoute><StudentRoute><Payment></Payment></StudentRoute></PrivetRoute>,
        },
      ]
    },
    {
      path: 'dashboard',
      element: <PrivetRoute><StudentRoute><Dashboard /></StudentRoute></PrivetRoute>,
      children: [
        {
          path: '/dashboard',
          element: <PrivetRoute><StudentRoute><Profile /></StudentRoute></PrivetRoute>
        },
        {
          path: 'dashboard',
          element: <PrivetRoute><StudentRoute><Profile /></StudentRoute></PrivetRoute>
        },
        {
          path: 'myenrollment',
          element: <PrivetRoute><StudentRoute><MyEnrollment /></StudentRoute></PrivetRoute>
        },
        {
          path: 'assignments/:id',
          element: <PrivetRoute><StudentRoute><Assignments /></StudentRoute></PrivetRoute>
        },
        {
          path: 'request',
          element: <PrivetRoute><AdminRoute> <TeacherRequest /></AdminRoute></PrivetRoute>,
        },
        {
          path: 'classrogress/:id',
          element: <PrivetRoute><AdminRoute> < ClassFeedBack /></AdminRoute></PrivetRoute>,
        },
        {
          path: 'users',
          element: <PrivetRoute><AdminRoute> <AllUsers /></AdminRoute></PrivetRoute>,
        },
        {
          path: 'classes',
          element: <PrivetRoute><AdminRoute> <AllClasses /></AdminRoute></PrivetRoute>,
        },
        {
          path: 'Messages',
          element: <PrivetRoute><AdminRoute> <Messages /></AdminRoute></PrivetRoute>,
        },
        {
          path: 'addclasst',
          element: <PrivetRoute><TeacherRoute> <AddClasses /></TeacherRoute></PrivetRoute>,
        },
        {
          path: 'myclasses',
          element: <PrivetRoute><TeacherRoute> <MyClasses /></TeacherRoute></PrivetRoute>,
        },
        {
          path: 'updateclasses/:id',
          element: <PrivetRoute><TeacherRoute> <UpdateClass /></TeacherRoute></PrivetRoute>,
        },
        {
          path: 'myclass/:id',
          element: <PrivetRoute><TeacherRoute> <MyClassDetails /></TeacherRoute></PrivetRoute>,
        },
      ]
    }
  ]);
  return <RouterProvider router={router} />
}

export default Routes
