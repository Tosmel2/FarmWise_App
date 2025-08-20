import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';

// Import all pages
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import Weather from './pages/Weather';
import Landing from './pages/Landing';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Forum from './pages/Forum';

import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Landing />} />

          {/* Protected dashboard routes */}
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="weather" element={<Weather />} />
            <Route path="community" element={<Forum />} />
            <Route path="resources" element={<Resources />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;


// import './App.css'
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Layout from './Layout';

// // Import all pages
// import Dashboard from './pages/Dashboard';
// import Recommendations from './pages/Recommendations';
// import Weather from './pages/Weather';
// import Landing from './pages/Landing';
// import Resources from './pages/Resources';
// import Profile from './pages/Profile';

// // Import error boundary and loading components
// import { ErrorBoundary } from './components/ErrorBoundary';
// // import { LoadingSpinner } from './components/LoadingSpinner';

// function App() {
//   return (
//     <ErrorBoundary>
//       <Router>
//         <Routes>
//           {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
//           <Route path="/" element={<Landing/>} />
//           <Route 
//             path="/dashboard" 
//             element={
//               <Layout currentPageName="Dashboard">
//                 <Dashboard />
//               </Layout>
//             } 
//           />
//           <Route 
//             path="/recommendations" 
//             element={
//               <Layout currentPageName="Recommendations">
//                 <Recommendations />
//               </Layout>
//             } 
//           />
//           <Route 
//             path="/weather" 
//             element={
//               <Layout currentPageName="Weather">
//                 <Weather />
//               </Layout>
//             } 
//           />
//           {/* <Route 
//             path="/forum" 
//             element={
//               <Layout currentPageName="Forum">
//                 <Forum />
//               </Layout>
//             } 
//           /> */}
//           <Route 
//             path="/resources" 
//             element={
//               <Layout currentPageName="Resources">
//                 <Resources />
//               </Layout>
//             } 
//           />
//           <Route 
//             path="/profile" 
//             element={
//               <Layout currentPageName="Profile">
//                 <Profile />
//               </Layout>
//             } 
//           />
          
//           {/* Catch all route */}
//           <Route path="*" element={<Navigate to="/dashboard" replace />} />
//         </Routes>
//       </Router>
//     </ErrorBoundary>
//   );
// }

// export default App;

// import './App.css'
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Layout from './Layout';

// // Import all pages
// import Dashboard from './pages/Dashboard';
// import Recommendations from './pages/Recommendations';
// import Weather from './pages/Weather';
// import Resources from './pages/Resources';
// import Profile from './pages/Profile';
// // import Forum from './pages/Forum';

// import { ErrorBoundary } from './components/ErrorBoundary';

// function App() {
//   return (
//     <ErrorBoundary>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
//           {/* Layout wraps all these routes */}
//           <Route element={<Layout />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/recommendations" element={<Recommendations />} />
//             <Route path="/weather" element={<Weather />} />
//             {/* <Route path="/forum" element={<Forum />} /> */}
//             <Route path="/resources" element={<Resources />} />
//             <Route path="/profile" element={<Profile />} />
//           </Route>

//           {/* Catch all */}
//           <Route path="*" element={<Navigate to="/dashboard" replace />} />
//         </Routes>
//       </Router>
//     </ErrorBoundary>
//   );
// }

// export default App;
