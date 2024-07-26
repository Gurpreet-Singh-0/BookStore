import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar.jsx';
import AddBooks from './pages/AddBooks';
import Home from './pages/Home.jsx';
import Books from './pages/Books.jsx';
import "./App.css";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom"
import Footer from './components/Footer.jsx';



function App() {


  return (
    <>
    <Router>
    <NavBar/>
      <Routes>
        <Route exact path="/" element={  <Home/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/addBooks" element={<AddBooks/>}/>
      </Routes>
      <Footer/>
    </Router>
    
   
    </>
  )
}

export default App
