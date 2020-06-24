import React, {Component} from 'react';
import axios from 'axios';
import swal from "sweetalert";


export default class ProductCategory extends Component{
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            productcategory_name : '',
        }
    }

    onChangeName(e){
        this.setState({
            productcategory_name: e.target.value
        });
    }


    onSubmit(e){
        e.preventDefault();
        const obj = {
            productcategory_name : this.state.productcategory_name
        };

        axios.post('http://localhost:5000/api/productcategory/add', obj)
            .then(res => {
                if(res.data.success){
                    swal("Good job!", "Product category successfully added to the database", "success");
                }
            })
            .catch((err) => {
                swal("Unsuccessful", "Error while adding product category to the database", "error");
            });


        this.setState({
            productcategory_name : ''
        })

        //this.props.history.push('/guest');
    }

    render() {
        return(
            <div style={{marginTop: 10}}>
                <h3>Add Product Category : </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product Category Name :</label>
                        <input type="text" className="form-control"
                               value={this.state.productcategory_name}
                               onChange={this.onChangeName}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add Product Category" className= "btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
