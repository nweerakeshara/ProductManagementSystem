import React, {Component} from 'react';

class OptionRow extends Component {
    render() {
        return (
            <option>{this.props.obj.productcategory_name}</option>
        );
    }
}

export default OptionRow;
