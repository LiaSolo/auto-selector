import './App.css';
import './font/stylesheet.css'
import {
    HashRouter,
    Routes,
    Route,
} from "react-router-dom";
import Main from "./pages/Main";
import Settings from "./pages/Settings";



function App() {


    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/settings" element={<Settings/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
