import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Layout from '../../components/Layout/Layout'
import ErrorPage from '../../components/ErrorPage/ErrorPage'
import { AuthProvider } from '../../context/AuthContext';

function App() {
    const [user, setUser] = useState({ loggedIn: false })
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout user={user} />}>
                        <Route index element={<Login />} />
                        <Route path="dashboard" element={<Dashboard setUser={setUser} user={user} />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
