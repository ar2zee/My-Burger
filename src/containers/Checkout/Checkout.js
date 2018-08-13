import React, { Component } from "react";
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    // state = {
    //     ingredients: null,
    //     price: null
    // }

    // componentWillMount () {
    //     // console.log(new URLSearchParams(this.props.location.search), this.props.location.search);
    //     const query = new URLSearchParams(this.props.location.search);
    //     // console.log(query.entries())
    //     const ingredients = {};
    //     let price = null;
    //     for (let param of query.entries()) {
    //         // ['salad' = 1]
    //         if(param[0] === 'price'){
    //             price = param[1]
    //         } else {
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: price})
    // }


    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        let summary = <Redirect to="/" />
        let purchasedRedirect = '';
        if(this.props.ings) {
            purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null ;
        }

        if(this.props.ings) {
            summary = (
            <div>
                    {purchasedRedirect}
                <CheckoutSummary 
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                    ingredients={this.props.ings}/>
                    {/* ingredients={this.props.location.state}/> Second Option*/ }
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                    {/* render={(props) => (<ContactData ingredients={this.props.ingredients} price={this.props.price} {...props}/>)}/> */ }
            </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
        // price: state.totalPrice
    }
}




export default connect(mapStateToProps)(Checkout);