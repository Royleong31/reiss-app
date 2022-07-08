import { Routes, Route, useLocation } from "react-router-dom";
import Home from "pages/Home";

import { useAuthState } from "react-firebase-hooks/auth";
import ProtectedRoute from "components/ProtectedRoute";
import { auth } from "config/firebase";
import ViewItem from "pages/item/ViewItem";
import SignIn from "pages/auth/SignIn";
import SignUp from "pages/auth/SignUp";
import EditPost from "pages/item/EditPost";
import NotFound from "pages/NotFound";
import CreatePost from "pages/item/CreatePost";
import Layout from "components/Layout";

function App() {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);

  return (
    <Layout>
      <Routes location={location}>
        {/* Accessible to all */}
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ViewItem />} />

        {/* Accessible to NOT logged in users */}
        <Route
          path="/signIn"
          element={
            <ProtectedRoute isAllowed={loading || !user}>
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signUp"
          element={
            <ProtectedRoute isAllowed={loading || !user}>
              <SignUp />
            </ProtectedRoute>
          }
        />

        {/* Accessible to logged in users */}
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute isAllowed={loading || !!user}>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute isAllowed={loading || !!user}>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
