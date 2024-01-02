/*Importes*/
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LogInForm } from './features/login_form/LoginForm';
import { SignUpForm } from './features/signup_form/SignUpForm';
import { Home } from './features/home/Home';
import { Chat } from './features/chat/chat';
import { ProfilePage } from './features/profilepage/profilepage';
// import { NavBar } from './features/nav_bar/Navbar';
// import { Suggestions } from './features/suggestions/Suggestions';
// import { Feed } from './features/feed/Feed';
// import { Profile } from './features/profile/Profile';
// import { Quick_Thought } from './features/quick_thought/Quick_thought';
import { PrivateRoute } from './features/private_route/PrivateRoute';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import GetQuicker from './features/get_quicker/GetQuicker';

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user == null ? false : user);
    });
  }, [])


  return (
    <div>
      {/*Navegacion por las rutas de la pagina*/}
      {user != null &&
        <BrowserRouter>
          <UserContext.Provider value={{ user: user, setUser: setUser }}>
            <Routes>
              <Route path="/" element={
                <PrivateRoute isAllowed={user} redirectTo='/login'>
                  <Home />
                </PrivateRoute>
              } />
              <Route path="/dms" element={
                <PrivateRoute isAllowed={user} redirectTo='/login'>
                  <Chat />
                </PrivateRoute>
              } />
              <Route path="/login" element={
                // Change user to !user to make the route private
                <PrivateRoute isAllowed={!user} redirectTo='/'>
                  <LogInForm />
                </PrivateRoute>
              } />
              <Route path="/signup" element={
                // Change user to !user to make the route private
                <PrivateRoute isAllowed={!user} redirectTo='/'>
                  <SignUpForm />
                </PrivateRoute>
              } />
              <Route exact path="/profile" element={
                // Change user to !user to make the route private
                <PrivateRoute isAllowed={user} redirectTo='/'>
                  <ProfilePage />
                </PrivateRoute>
              } />
              <Route exact path="/subscriptions/quicker" element={
                // Change user to !user to make the route private
                <PrivateRoute isAllowed={user} redirectTo='/'>
                  <GetQuicker />
                </PrivateRoute>
              } />
            </Routes>
          </UserContext.Provider>
        </BrowserRouter>
      }

      {/*Usuario Prueba*/}
      {/* <p>Test account: a@gmail.com | a123456</p> */}
    </div>
  )
}

export default App;