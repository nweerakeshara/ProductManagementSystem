import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import DefaultImg from './assets/default-img.jpg';
import OptionRow from "./optionRow";
import swal from 'sweetalert';

let imageFormObj = new FormData();

export default class AddProduct extends Component{
    constructor(props) {
        super(props);
        this.onChangeProductId = this.onChangeProductId.bind(this);
        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductDiscount = this.onChangeProductDiscount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_id : '',
            product_name : '',
            product_price : '',
            product_discount : '',
            product_category : '',
            multerImage: DefaultImg,
            Categories : []
        }
    }

    componentDidMount() {
        //type of request is 'get'
        axios.get('http://localhost:5000/api/productcategory/')
            .then(response => {
                this.setState({Categories : response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    optionRow(){
        return this.state.Categories.map(function(object, i){
            return <OptionRow obj = {object} key = {i}/>;
        });
    }

    onChangeProductId(e){
        this.setState({
            product_id: e.target.value
        });
    }

    onChangeProductName(e){
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeProductPrice(e){
        this.setState({
            product_price: e.target.value
        });
    }

    onChangeProductDiscount(e){
        this.setState({
            product_discount: e.target.value
        });
    }

    handleChangeCategory = (event) => {
        this.setState({ product_category: event.currentTarget.value })
    }

    setDefaultImage(uploadType) {
        if (uploadType === "multer") {
            this.setState({
                multerImage: DefaultImg
            });
        }
    }

    // function to upload image once it has been captured
    // includes multer method
    setImage(e, method) {
        if (method === "multer") {
            // imageFormObj.append("imageName", "multer-image-" + Date.now());
            imageFormObj.append("imageName", "multer-image-" + Date.now());
            imageFormObj.append("imageData", e.target.files[0]);

            console.log(imageFormObj.get("imageName"));
            console.log(imageFormObj.get("imageData"));

            // stores a readable instance of
            // the image being uploaded using multer
            this.setState({
                multerImage: URL.createObjectURL(e.target.files[0])
            });
        }
    }

    onSubmit(e){
        e.preventDefault();

        imageFormObj.append("product_id", this.state.product_id);
        imageFormObj.append("product_name", this.state.product_name);
        imageFormObj.append("product_price", this.state.product_price);
        imageFormObj.append("product_discount", this.state.product_discount);
        imageFormObj.append("product_category", this.state.product_category);

        axios.post('http://localhost:5000/api/product/add', imageFormObj)
            .then((data) => {
                if (data.data.success) {
                    swal("Good job!", "Product successfully added to the database", "success");
                    this.setDefaultImage("multer");
                }
            })
            .catch((err) => {
                swal("Unsuccessful", "Error while adding product to the database", "error");
                this.setDefaultImage("multer");
            });

        this.setState({
            product_id : '',
            product_name : '',
            product_price : '',
            product_discount : '',
            product_category : '',
        })

        //this.props.history.push('/guest');
    }

    render() {
        return(
            <div style={{marginTop: 10}}>
                <h3>Add New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Product ID :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_id}
                               onChange={this.onChangeProductId}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Product Name :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_name}
                               onChange={this.onChangeProductName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Product Price :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_price}
                               onChange={this.onChangeProductPrice}
                        />
                    </div>

                    <div className="form-group">
                        <label>Add Product Discount :</label>
                        <input type="text" className="form-control"
                               value={this.state.product_discount}
                               onChange={this.onChangeProductDiscount}
                        />
                    </div>

                    <div className="form-group">
                        <label>Select Category :</label>
                        <div style={{width:"25px", display:"inline-block"}} />
                        <select onChange={this.handleChangeCategory}>
                            {this.optionRow()}
                        </select>


                    </div>

                    <div className="form-group">
                        <label>Add Product Photo :</label>
                        <div className="main-container">
                            <div className="image-container">
                                <div className="process">
                                    {/*onChange={(e) => this.uploadImage(e, "multer")}*/}
                                    <input type="file" className="process__upload-btn" onChange={(e) => this.setImage(e, "multer")}/>
                                    <img src={this.state.multerImage} alt="upload-image" className="process__image" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add Product" className= "btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
