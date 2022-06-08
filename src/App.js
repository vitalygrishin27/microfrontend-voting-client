import './App.css';
import {ToastContainer} from "react-toastify";
import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Voting from "./components/Voting";

function App() {
    return (
        <div className="App">
            <ToastContainer position="bottom-left"/>
            <Navbar/>
            <Routes>
                <Route path="/*" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/voting" element={<Voting/>}/>
            </Routes>
        </div>
    );
}

export default App;
