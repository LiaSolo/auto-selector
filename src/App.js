import './App.css';
import './font/stylesheet.css'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Main from "./pages/Main";
import Settings from "./pages/Settings";



function App() {


    return (
        <BrowserRouter basename="auto-selector">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/settings" element={<Settings/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
