import { Routes, Route, useLocation } from "react-router-dom";
import Home from "pages/home";

import { useAuthState } from "react-firebase-hooks/auth";
import ProtectedRoute from "components/ProtectedRoute";
import { auth } from "config/firebase";
import ViewItem from "pages/item/viewItem";
import SignIn from "pages/auth/signin";
import SignUp from "pages/auth/signup";
import EditItem from "pages/item/editItem";
import NotFound from "pages/NotFound";
import AddItem from "pages/item/AddItem";

function App() {
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <Routes location={location}>
        {/* Accessible to all */}
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ViewItem />} />

        {/* Accessible to NOT logged in users */}
        <Route
          path="/signIn"
          element={
            <ProtectedRoute isAllowed={!user}>
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signUp"
          element={
            <ProtectedRoute isAllowed={!user}>
              <SignUp />
            </ProtectedRoute>
          }
        />

        {/* Accessible to logged in users */}
        <Route
          path="/item/edit/:id"
          element={
            <ProtectedRoute isAllowed={!!user}>
              <EditItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addItem"
          element={
            <ProtectedRoute isAllowed={!!user}>
              <AddItem />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
