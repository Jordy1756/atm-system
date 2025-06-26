import "./App.css";
import { CashierContext } from "./context/CashierContext";
import Home from "./pages/Home";

const App = () => {
    return (
        <CashierContext.Provider value={undefined}>
            <Home />
        </CashierContext.Provider>
    );
};

export default App;
