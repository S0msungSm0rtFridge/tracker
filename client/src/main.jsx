import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Homepage } from './components/Pages/HomePage'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Authpage } from "./components/Pages/Authpage";
import { AuthProvider } from "./components/wrappers/AuthProvider";
import { ExerciseProvider } from './components/wrappers/ExerciseSelector';
import ProtectedRoute from "./components/Protection";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ExerciseProvider>
        <Router>
          <Routes>
            <Route path="/auth/*" element={<Authpage />} />
            <Route
              path="/home/*"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </Router>
        </ExerciseProvider>
    </AuthProvider>
  </StrictMode>
)
