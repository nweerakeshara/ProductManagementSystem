import React, { Component } from "react";
//To keep backend and front end connectivity, we import axios
import axios from "axios";

import { Link } from "react-router-dom";

export default class CommentsView extends Component {
    state = {
            comments: [],

    };


    componentDidMount() {
        //type of request is 'get'


        console.log(this.props.productid);
        axios.get("http://localhost:5000/api/comments/get/"+this.props.productid)
            .then((response) => {
                this.setState({ comments: response.data });
                console.log(this.state.comments);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidUpdate() {
        //type of request is 'get'



        axios.get("http://localhost:5000/api/comments/get/"+this.props.productid)
            .then((response) => {
                this.setState({ comments: response.data });

            })
            .catch(function (error) {
                console.log(error);
            });
    }




    render() {
        return (
            <div>
                <h5>Comments :</h5>
                {this.state.comments.map((item) => (
                    <div>

                    <div className="border border-danger">

                        <div className="form-group">
                            <strong><label><p>{item.cusUn} :</p></label></strong>
                            <input type="text" className="form-control" value={item.commBody}  disabled/>

                        </div>


                    </div>
                    <br/>
                    </div>

                ))}
            </div>
        );
    }
}
