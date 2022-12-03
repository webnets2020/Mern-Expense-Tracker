import React,{useEffect,useState} from 'react';
import ButtonAppBar from "./component/ButtonAppBar";
import {Outlet} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { getUser } from './store/auth';
import Cookies from "js-cookie";

const App = () => {

  // const auth = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const [isLoading,setIsLoading]=useState(true);
  const token = Cookies.get("token");
    

  
  const fetchUser = async()=>{

    setIsLoading(true)

    const res = await fetch("http://localhost:5000/user",{
         headers:{
             Authorization:`Bearer ${token}`,
         },
         "Content-Type" : "Application/json",
     });

     if(res.ok){

      const user = await res.json();

      console.log(user)

      dispatch(getUser(user))

     }

     setIsLoading(false)
  
  }

  useEffect(()=>{

    fetchUser();

  },[]);

  if(isLoading){
    return <p>Loading...</p>
  }

  
  
  return (
    <>
      <ButtonAppBar />
       <Outlet />
    </>
  );
};

export default App;
