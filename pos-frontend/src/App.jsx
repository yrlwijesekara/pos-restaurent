import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Auth, Orders, Tables, Menu, More } from "./pages";
import Headers from "./components/shared/HeadersTailwind";
import BottomNav from "./components/shared/BottomNav";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Headers />
        <main className="pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/more" element={<More />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;