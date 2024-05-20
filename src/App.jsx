import "./App.css";
import  TextContextProvider  from "./context/text-context.jsx";
import Main from "./pages/Main/Main.jsx";

function App() {
  return (
    <>
      <TextContextProvider>
        <Main />
      </TextContextProvider>
    </>
  );
}

export default App;
