
import Interface from "./components/Interface"
import {Routes,Route,useNavigate} from "react-router-dom"
import Tableau from "./components/Tableau"
//import './App.css'
function App() {
  return (
    <>
 <Routes>
  <Route path="/" element={<Interface/>} />
<Route path="/Tableau" element={<Tableau/>} />
 </Routes>
   </>
  )
}

export default App;
