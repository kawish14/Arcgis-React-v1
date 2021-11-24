import React from 'react';
import Main from './components/MainComponent';
import { BrowserRouter, Router } from 'react-router-dom';
import './App.css'
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import history from './history'


const store = ConfigureStore();

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="App">
            <Main />
          </div>
        </Router>
      </Provider>

       
    );
  }
}

export default App;


















/* import React, { useRef, useEffect,useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";

import Graphics from "./Graphics";
import Customers from "./Customers";

function App() {

  const mapRef = useRef(null);

  const [view, setView] = useState(null)
  const [map, setMap] = useState(null)

  const[width, updateWidth] = useState('100vw')

  const [height, updateHeight] = useState('100vh')

  useEffect(() => {
   
    let myMap = new Map({
        basemap: 'satellite'
      });

      const view = new MapView({
        container: mapRef.current,
        center: [67.050987, 24.894766],
        scale: 577791,
        map: myMap
      });

      view.when(() => {
        setView(view)
        setMap(myMap)
      })

      return () => view.destroy()
    
  }, []);

  return <div className="mapDiv" ref={mapRef} style={{ paddingLeft:'0px', width: width, height:height }}>
            {view && map &&   (
              <>
                <Graphics view={view} />
                <Customers map={map}/>
              
              </>
            )
              
              
            }
        </div>;
}

export default App; */