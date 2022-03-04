import "./App.css";
import Header from "./components/Header";
import Body from "./Body";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>
      <div className="app__body">
        <Body />
      </div>
      <div className="app__footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
