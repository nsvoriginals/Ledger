
import { Navbar } from "./components/Navbar";
import { Landing } from "./landing/Landing";
import { Transaction } from "./transactions/Transaction";
import { BrowserRouter,Routes,Route } from "react-router-dom";
export default function App() {  // Change to `export default`
  return (
    <div id="main" className="h-screen w-screen p-0 box-border">
      <Navbar />
      <BrowserRouter>
      <Routes>
<Route path="/home" Component={Landing}/>
<Route path="/transactions" Component={Transaction}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
