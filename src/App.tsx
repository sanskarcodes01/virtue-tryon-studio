/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthProvider';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { ProductSelection } from './pages/ProductSelection';

import { PhotoUpload } from './pages/PhotoUpload';
import { TryOnResult } from './pages/TryOnResult';
import { AdminPanel } from './pages/AdminPanel';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/auth" />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="auth" element={<AuthPage />} />
            
            {/* Protected Routes */}
            <Route path="products" element={
              <ProtectedRoute>
                <ProductSelection />
              </ProtectedRoute>
            } />
            <Route path="upload" element={
              <ProtectedRoute>
                <PhotoUpload />
              </ProtectedRoute>
            } />
            <Route path="try-on" element={
              <ProtectedRoute>
                <TryOnResult />
              </ProtectedRoute>
            } />
            <Route path="admin" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
