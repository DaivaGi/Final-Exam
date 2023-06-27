import { HashRouter, Route, Routes, Navigate,
  useNavigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { useReducer } from 'react';
import { FoodMenu } from './components/menu';
import { CreateNewBlogPost } from './pages/CreateNewBlogPost';
import { LoginPage } from './components/loginPage';
import AuthContext from './AuthContext';
import Authentication from './Authentication';
import { AdminPage } from './pages/AdminPage';
import { Container } from 'semantic-ui-react'
import { AdminMenuListPage } from './pages/AdminMenuListPage';
import { ViewMenu } from './pages/ViewMenu';
import { FirstPage } from './pages/FirstPage';
import { ForemenList } from './pages/ForemenListPage';
import { ServiceList } from './components/menuList';
import { AdminForemenList } from './pages/adminForemenList';

function App() {

  var initState = {
    isAuthenticated: false,
    username: null,
    role: null,
   }

   const auth = (appState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...appState,
          isAuthenticated: true,
          username: action.value.username,
          role: action.value.role
        }
        case "LOADING":
        return {
          ...appState,
          isLoading: action.value
        }
      case "LOGOUT":
        return {
          ...appState,
          isAuthenticated: false,
          username: null,
          role: null,
        }
      case "AUTHENTICATED":
        return {
          ...appState,
          isAuthenticated: true,
          admin: true
        }
      default:
        return appState
    }
  }
  const [appState, setAppState] = useReducer(auth, initState)


  return (
    <Container>
      <AuthContext.Provider value={{ appState, setAppState }}>
      
      <HashRouter>
      
        <FoodMenu />
        <div className='container'>
        <Routes>
        <Route path='/' element={<FirstPage />} />
        <Route path='/serviceList' element={<ServiceList/>} />
        <Route path='/foremenList' element={<ForemenList />} />
        <Route path='/login' element={<LoginPage/>} />
        <Route exact path="/admin" element={
                  <Authentication>
                    <AdminPage />
                  </Authentication>
                } />
        <Route path='/menus/create' element={
        <Authentication>
        <CreateNewBlogPost />
        </Authentication>} />
        <Route path='/menus/list' element={
        <Authentication>
        <AdminMenuListPage />
        </Authentication>} />
        <Route path='/menus/list/view/:id' element={
        <Authentication>
        <ViewMenu />
        </Authentication>} />
        <Route path='/foremen/list' element={
        <Authentication>
        <AdminForemenList />
        </Authentication>} />
                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>Puslapio nėra</p>
                    </main>
                  }
                />

        
          {/* 
          
          
          <Route path='/animals/update/:id' element={<UpdateAnimalPage />} /> */}
        </Routes>
        </div>
      </HashRouter> 
      </AuthContext.Provider>
    </Container>
  );
}

export default App;
