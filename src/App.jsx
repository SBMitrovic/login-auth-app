import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { useAuth } from './components/AuthContext'; // Assuming userAuth is exported from AuthContext

function DebugAuth() {
  const context = useAuth();
  console.log('Auth Context:', context);
  console.log('User:', context.user);
  console.log('Login function:', context.login);
  console.log('Logout function:', context.logout);
  console.log('Is user authenticated?', !!context.user);
  console.log('User role:', context.user ? context.user.role : 'No user');
  return null;
}




export default function App() {
  
  return (
    <AuthProvider>
      <Router>
        <DebugAuth />
        <nav>
          <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/login">Login</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
