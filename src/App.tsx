import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { SearchUsersPage } from './pages/SearchUsersPage';
import { DictionariesPage } from './pages/Dictionary/DictionariesPage';
import { DictionaryDetailPage } from './pages/Dictionary/DictionaryDetailPage';
import { NewDictionaryPage } from './pages/Dictionary/NewDictionaryPage';
import { NewEntryPage } from './pages/Dictionary/NewEntryPage';
import { ReadingModePage } from './pages/Dictionary/ReadingModePage';
import { GrammarPage } from './pages/Grammar/GrammarPage';
import { GrammarDetailPage } from './pages/Grammar/GrammarDetailPage';
import { NewGrammarPage } from './pages/Grammar/NewGrammarPage';
import { RoadmapsPage } from './pages/Roadmaps/RoadmapsPage';
import { RoadmapDetailPage } from './pages/Roadmaps/RoadmapDetailPage';
import { NewRoadmapPage } from './pages/Roadmaps/NewRoadmapPage';
import { ExplorePage } from './pages/ExplorePage';
import { useAppStore } from './store';

function App() {
  const { isAuthenticated } = useAppStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/home" replace />} />
        <Route path="/auth/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/home" replace />} />
        <Route path="/auth/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/home" replace />} />
        <Route path="/auth/forgot-password" element={!isAuthenticated ? <ForgotPasswordPage /> : <Navigate to="/home" replace />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        
        {/* Protected routes */}
        {isAuthenticated ? (
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="search/users" element={<SearchUsersPage />} />
            <Route path="dictionaries">
              <Route index element={<DictionariesPage />} />
              <Route path="new" element={<NewDictionaryPage />} />
              <Route path=":id" element={<DictionaryDetailPage />} />
              <Route path=":id/entry/new" element={<NewEntryPage />} />
              <Route path=":id/reading" element={<ReadingModePage />} />
            </Route>
            <Route path="grammar">
              <Route index element={<GrammarPage />} />
              <Route path="new" element={<NewGrammarPage />} />
              <Route path=":id" element={<GrammarDetailPage />} />
            </Route>
            <Route path="roadmaps">
              <Route index element={<RoadmapsPage />} />
              <Route path="new" element={<NewRoadmapPage />} />
              <Route path=":id" element={<RoadmapDetailPage />} />
            </Route>
            <Route path="explore" element={<ExplorePage />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/\" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;