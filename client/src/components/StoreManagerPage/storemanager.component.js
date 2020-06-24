import React, {Component} from "react";
import ButtonRow from "./buttonrow2.component";

export default class StoreManager extends Component{
    render() {
        return(
            <div>
                <ButtonRow></ButtonRow>
                <div style={{height:"102px"}} />
            </div>
        )
    }
}
