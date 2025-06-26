import "./App.css";
import { CashierProvider } from "./context/CashierContext";
import Home from "./pages/Home";

const App = () => {
    return (
        <CashierProvider>
            <Home />
        </CashierProvider>
    );
};

export default App;
