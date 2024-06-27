
import './App.css';
import RoutesComponent from './component/Routes';
import { AlertProvider } from './context/provider/AlertProvider';

function App() {
  return (
    <div className="App">
         <AlertProvider>
       <RoutesComponent/>
      </AlertProvider>
    </div>
  );
}

export default App;
