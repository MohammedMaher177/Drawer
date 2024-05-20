import "./App.css";
import MainContextProvider from "./context/main-context.jsx";
import Main from "./pages/Main/Main.jsx";

function App() {
  return (
    <>
      <MainContextProvider>
        <Main />
      </MainContextProvider>
    </>
  );
}

export default App;
