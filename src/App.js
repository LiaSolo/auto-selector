import './App.css';
import './font/stylesheet.css'
import {
    HashRouter,
    Routes,
    Route,
} from "react-router-dom";
import Main from "./pages/Main";
import Final from "./pages/Final";
import Settings from "./pages/Settings";
import FinalSettings from "./pages/FinalSettings";



function App() {


    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/final" element={<Final/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/final-settings" element={<FinalSettings/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
