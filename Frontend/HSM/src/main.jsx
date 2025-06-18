import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export const context = createContext({isAuthenticated: false});

const AppWrapper = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [user, setUser] = useState({});

   return (
    <context.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>
   <App />
    </context.Provider>
   );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
