import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import Loader from './common/Loader';
import routes from './routes';
import AdminProtectedRoute from './ProtectedRoute';
import SignIn from './pages/Authentication/SignIn';
import ForgotPassword from './pages/Authentication/ForgotPassowrd';
import NormalRoute from './NormalRoute';
import Policy from './pages/Policy';
import { getLocalStorageItem } from './utils/localStorageUtil';

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    const isLogin = getLocalStorageItem<boolean>('isloggedIn');
    if (!isLogin) {
      navigate('/');
    }
  }, [navigate]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <NormalRoute>
              <SignIn />
            </NormalRoute>
          }
        />
 

        <Route
          path="/forgot-password"
          element={
            <NormalRoute>
              <ForgotPassword />
            </NormalRoute>
          }
        />
        <Route path="/" element={<DefaultLayout />}>
          {routes?.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                // <AdminProtectedRoute>
                <Suspense fallback={<Loader />}>
                  <route.component />
                </Suspense>
                // </AdminProtectedRoute>
              }
            />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default App;
