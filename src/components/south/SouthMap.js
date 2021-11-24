import React, { useRef, useEffect,useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Header from '../HeaderComponent';
import Customer from '../../pages/south/Customer'
import Layerlist from "../../pages/south/widget/Layerlist";
import Realtime from "../../pages/Realtime";
import SearchWidget from "../../pages/south/widget/SearchWidget";
import DC from "../../pages/south/DC";
import SouthSelectGraphic from "../../pages/south/widget/SouthSelectGraphic";
import Gpondb from '../../pages/south/Gpondb'
import SouthViewMaps from './SouthViewMaps';
import SouthZone from '../../pages/south/SouthZone';
import SouthFeeder from '../../pages/south/SouthFeeder'
import SouthDistribution from '../../pages/south/SouthDistribution'
import FAT from '../../pages/south/FAT'
import Joint from '../../pages/south/Joint';
import POP from '../../pages/south/POP'
import AppWidgets from '../../pages/south/widget/AppWidgets';
import Tracking from "../../pages/Tracking";


function SouthMap(props) {

  const mapRef = useRef(null);

  const [view, setView] = useState(null)
  const [map, setMap] = useState(null)

  const[width, updateWidth] = useState('99vw')

  const [height, updateHeight] = useState('77vh')

  const[customer, updateCustomer] = useState(null)
  const[customerLoading, updateCustomerLoading] = useState(null)

  const[dc, updateDC] = useState(null)
  const[southZone , updateZone ] = useState(null)
  const[southFeeder, updateSouthFeeder] = useState(null)
  const[southDistribution, updateSouthDistribution] = useState(null)
  const[fat, updateFAT] = useState(null)
  const[southJoint, updateSouthJoint] = useState(null)
  const[southPOP, updateSouthPOP] = useState(null)

  const[southStatus, updateSouthStatus] = useState({})
  const southCPEstatus = (e) => {updateSouthStatus(e)}

  const [summary, summaryTable] = useState(false);
  const summaryTableFun = (e) => {summaryTable(e)}


  const [search, searchUpdate] = useState({})
  const searchUpdateFun = (e) => {searchUpdate(e)}

  useEffect(() => {
    
    updateCustomer(props.item)
    updateCustomerLoading(props.updateCustomerLoading)
    updateDC(props.dc_odb)
    updateZone(props.zone)
    updateSouthFeeder(props.southFeeder)
    updateSouthDistribution(props.southDistribution)
    updateFAT(props.fat)
    updateSouthJoint(props.southJoint)
    updateSouthPOP(props.southPOP)
  
   
    let myMap = new Map({
        basemap: 'satellite'
      });

      const view = new MapView({
        container: mapRef.current,
        center: [67.050987, 24.894766],
        scale: 577791,
        map: myMap,
        popup: {
          dockEnabled: true,
          dockOptions: {
             
              buttonEnabled: true,
          
              breakpoint: false,
              position: "bottom-left"
          }
      }, 
       ui: {
           components: ["zoom", "compass", "attribution"]
       }
       
      });

      view.when(() => {
        setView(view)
        setMap(myMap)

      })

      return () => view.destroy()
    
  }, []);

  return (
      <div>
      {view && map &&   (
        <Header 
          item = {customer}
          search= {search}
          map={map}  view={view} 
          
        />
      )}
     
        <div  ref={mapRef} style={{ paddingLeft:'0px', width: width, height:height }}>
             {view && map &&   (
              <>
                <Customer map={map}  view={view} item={customer} southCPEstatus={southCPEstatus} />

                <DC map={map} view={view} dc_odb={dc}/>

                <SouthZone map={map}  view={view}  zone = {southZone}  />

                <SouthFeeder map={map}  view={view}  item = {southFeeder} />

                <SouthDistribution map={map}  view={view}  item = {southDistribution} />

                <FAT map={map}  view={view}  item ={fat} />

                <Joint map={map}  view={view}  item ={southJoint} />

                <POP map={map}  view={view}  item = {southPOP}  />

                <Layerlist map={map} view={view} customerLabel={customer} dc_odb={dc}
                        southZone={southZone}
                        southPOP={southPOP} 
                        southFeeder = {southFeeder}
                        southDistribution = {southDistribution}
                        southDC ={dc}
                        southFAT ={fat}
                        southJoint ={southJoint}

         
                />

                <SearchWidget map={map} view={view} customerSearch={customer} 
                              customerLoading={customerLoading} dc_odb={dc}
                />
                <AppWidgets
                      map={map}  view={view} 
                      southZone = {southZone}
                      southPOP={southPOP} 
                      southFeeder = {southFeeder}
                      southDC ={dc}
                      southFAT ={fat}
                      southJoint ={southJoint}
                  />

                <SouthViewMaps
                    map={map} 
                    view={view}

                    item={customer} 
                />
              
              </>
            )}

        </div>
        
        { view && map && (
          <>
           {/*  <Realtime    
                    map={map} 
                    view={view} 
                    loginRole ={loginRole} 
                    item={customer} 

                    southCPEstatus={southCPEstatus}
                    
            /> 
            <Tracking  
                      map={map} 
                      view={view}
                      searchUpdateFun={searchUpdateFun}

            /> */}
            <SouthSelectGraphic 
                map={map} view={view} 
                item={customer}  changeMapHeight={updateHeight}
                summaryTableFun={summaryTableFun} 
            />

            <Gpondb  
              item = {customer}
              southStatus = {southStatus}
              summaryTableFun={summary}
                
            />
            
          </>
         
        )}
       
        
      </div>
  )
}

export default SouthMap;