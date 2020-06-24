import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProductTableRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.product_id}
                </td>
                <td>
                    {this.props.obj.product_name}
                </td>
                <td>
                    {this.props.obj.product_price}
                </td>
                <td>
                    {this.props.obj.product_discount}
                </td>
                <td>
                    {this.props.obj.product_category}
                </td>
                <td>
                    {/*When clicks this, it goes to 'edit.component.js' file*/}
                    <Link to={"/edit/" +this.props.obj._id} className="btn btn-primary"> Change discount </Link>
                </td>
                {/*<td>*/}
                {/*    <button className="btn btn-primary"> Delete </button>*/}
                {/*</td>*/}
            </tr>
        );
    }
}

export default ProductTableRow;
