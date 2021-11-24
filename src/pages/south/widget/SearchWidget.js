import React from 'react';
import Search from "@arcgis/core/widgets/Search";
import Expand from "@arcgis/core/widgets/Expand";

export default class SearchWidget extends React.Component{

    componentDidMount() {

        let customerLayer
        let customerLoading = this.props.customerLoading
        let dc_odb = this.props.dc_odb.dc
        let vehicle = this.props.tracking
        
        console.log(vehicle)

        if(customerLoading){
            return null
        }
        else{
            customerLayer = this.props.customerSearch.customer
        }

        let view = this.props.view
        let map = this.props.map

        let source = [
            {
                layer: customerLayer,
                searchFields: ["id", "name"],
                displayField: "name",
                exactMatch: false,
                outFields: ["*"],
                name: "Customer",
                placeholder: "210305138",
                scale: 10,
                maxResults: 6,
                maxSuggestions: 6,
                minSuggestCharacters: 0,
                resultSymbol: {
                    type: "simple-marker",
                    color: [239, 25, 25],
                    size: 10,
                    width: 30,
                    height: 30,
                    xoffset: 0,
                    yoffset: 0
                }
            },
            {
                layer: dc_odb,
                searchFields: ["id", "name"],
                displayField: "name",
                exactMatch: false,
                outFields: ["*"],
                name: "DC/ODB",
                placeholder: "210101",
                scale: 10,
                maxResults: 6,
                maxSuggestions: 6,
                minSuggestCharacters: 0,
                resultSymbol: {
                    type: "simple-marker",
                    color: [239, 25, 25],
                    size: 10,
                    width: 30,
                    height: 30,
                    xoffset: 0,
                    yoffset: 0
                }
            }
        ]
        var searchWidget = new Expand({
            content: new Search({
                view: view,
                popupEnabled: true,
                includeDefaultSources: true,
                searchAllEnabled: false,
                sources: [],
            }),
            view: view,
            group: "bottom-right",
            expanded: false
        });

        view.ui.add(searchWidget, "top-right");
        searchWidget.content.sources = source
            
    }
    render(){

        return null
    }
}