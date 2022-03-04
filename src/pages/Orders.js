import React from "react"
import "../styles/Orders.css"
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

function Orders(){
    return(
        <div className="Orders">
            <h1>Orders</h1>
            <div className="Orders__SingleOrder">
                <CheckCircleIcon/> Delivered
                <p>On Tue, 16 June 2020</p>
                <button>details</button>
                <button>Exchange/Return</button>
                <div className="Orders__Products">
                    <img src="https://picsum.photos/200/200"></img>
                    <h3>Red Round Neck </h3>
                    <p>Size: </p>
                    <button>M</button>
                </div>
                <div className="Orders__Products">
                    <img src="https://picsum.photos/200/200"></img>
                    <h3>Red Round Neck </h3>
                    <p>Size: </p>
                    <button>M</button>
                </div>
                <div className="Orders__Products">
                    <img src="https://picsum.photos/200/200"></img>
                    <h3>Red Round Neck </h3>
                    <p>Size: </p>
                    <button>M</button>
                </div>
            </div>


            <div className="Orders__SingleOrder">
                <FlightTakeoffIcon/> On the way
                <p>On Tue, 16 June 2020</p>
                <button>details</button>
                <button>Exchange/Return</button>
                <div className="Orders__Products">
                    <img src="https://picsum.photos/200/200"></img>
                    <h3>Red Round Neck </h3>
                    <p>Size: </p>
                    <button>M</button>
                </div>
                <div className="Orders__Products">
                    <img src="https://picsum.photos/200/200"></img>
                    <h3>Red Round Neck </h3>
                    <p>Size: </p>
                    <button>M</button>
                </div>
                <div className="Orders__Products">
                    <img src="https://picsum.photos/200/200"></img>
                    <h3>Red Round Neck </h3>
                    <p>Size: </p>
                    <button>M</button>
                </div>
            </div>
            
        </div>
    )
}

export default Orders