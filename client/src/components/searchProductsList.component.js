import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "react-notifications/lib/notifications.css";



class SearchProductsListComponent extends Component {
    state = {
        pager: {},
        pageOfItems: [],
        query : ""
    };



    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object.isRequired,
    };

    setSearch = (e) => {
        this.setState({
            query: e.target.value,
            pager: {},
            pageOfItems: []
        });
    }

    loadPage = (e) => {
        // get page details and items from api
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get("page")) || 1;
        if (page !== this.state.pager.currentPage) {
            //Request to api
            fetch(`http://localhost:5000/api/products/get/all/paginate/search?page=${page}&sitem=${this.state.query}`, {
                method: "GET",
            })
                .then((response) => response.json())
                .then(({ pager, pageOfItems }) => {
                    this.setState({ pager, pageOfItems });
                });
        }

    };

    render() {

        const { pager, pageOfItems } = this.state;
        return (
            <div>


                <div style={{height:"50px"}} />
                {/*--------------------------------------------------------------------------------------------------*/}

                <form onSubmit={this.loadPage}>

                    <div className="form-group">
                        <label>Advanced Search :</label>
                        <input type="text" className="form-control"  value={this.state.query} onChange={this.setSearch}/>

                    </div>



                    <div className="form-group">

                        <input type="submit" value="Search" className="btn btn-primary"/>

                    </div>
                </form>
                <br/>

                {/*--------------------------------------------------------------------------------------------------*/}


                <div className="card text-center m-3">
                    <h3 className="card-header font-weight-bold">Product List</h3>


                    <div className="card-body ">
                        {pageOfItems.map((item) => (
                            <div key={item._id}>
                                <div className="container rounded-0 border border-info ">
                                    <div className="container ">
                                        <div className="row">
                                            <div className="col-sm">
                                                <br />
                                                <h4 className="font-weight-bold text-center">
                                                    Name : {item.name}
                                                </h4>
                                                <br />
                                            </div>
                                            <div className="col-sm">

                                                <br />
                                                <h4 className="font-weight-bold text-center">
                                                    Qty : {item.qty}
                                                </h4>
                                                <br />

                                            </div>

                                            <div className="col-sm">
                                                <br />

                                                <Link
                                                    style={{ margin: "0", padding: "0" }}
                                                    to={"/view/" + item._id}
                                                    className="nav-link"
                                                >
                                                    <button className="btn btn-success btn-block">
                                                        View Product
                                                    </button>
                                                    <br/>
                                                </Link>




                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                        ))}
                    </div>

                    {/*Used for pagination*/}
                    <div className="card-footer pb-0 pt-3">
                        {pager.pages && pager.pages.length && (
                            <ul className="pagination">
                                <li
                                    className={`page-item first-item ${
                                        pager.currentPage === 1 ? "disabled" : ""
                                    }`}
                                >
                                    <Link to={{ search: `?page=1` }} className="page-link">
                                        First
                                    </Link>
                                </li>

                                <li
                                    className={`page-item previous-item ${
                                        pager.currentPage === 1 ? "disabled" : ""
                                    }`}
                                >
                                    <Link
                                        to={{ search: `?page=${pager.currentPage - 1}` }}
                                        className="page-link"
                                    >
                                        Previous
                                    </Link>
                                </li>

                                {pager.pages.map((page) => (
                                    <li
                                        key={page}
                                        className={`page-item number-item ${
                                            pager.currentPage === page ? "active" : ""
                                        }`}
                                    >
                                        <Link
                                            to={{ search: `?page=${page}` }}
                                            className="page-link"
                                        >
                                            {" "}
                                            {page}{" "}
                                        </Link>
                                    </li>
                                ))}
                                <li
                                    className={`page-item next-item ${
                                        pager.currentPage === pager.totalPages ? "disabled" : ""
                                    }`}
                                >
                                    <Link
                                        to={{ search: `?page=${pager.currentPage + 1}` }}
                                        className="page-link"
                                    >
                                        {" "}
                                        Next{" "}
                                    </Link>
                                </li>

                                <li
                                    className={`page-item last-item ${
                                        pager.currentPage === pager.totalPages ? "disabled" : ""
                                    }`}
                                >
                                    <Link
                                        to={{ search: `?page=${pager.totalPages}` }}
                                        className="page-link"
                                    >
                                        Last
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

    isAuthenticated: state.user.isAuthenticated,
    user: state.user,
});

export default connect(mapStateToProps, null)(SearchProductsListComponent);
