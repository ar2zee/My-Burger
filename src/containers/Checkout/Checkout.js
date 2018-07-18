import React, { Component } from "react";
import {Route} from 'react-router-dom';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: null,
        price: null
    }

    componentWillMount () {
        // console.log(new URLSearchParams(this.props.location.search), this.props.location.search);
        const query = new URLSearchParams(this.props.location.search);
        // console.log(query.entries())
        const ingredients = {};
        let price = null;
        for (let param of query.entries()) {
            // ['salad' = 1]
            if(param[0] === 'price'){
                price = param[1]
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price})
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        // console.log(this.props)
        return (
            <div>
                <CheckoutSummary 
                checkoutCancelled={this.checkoutCancelled}
                checkoutContinued={this.checkoutContinued}
                ingredients={this.state.ingredients}/>
                {/* ingredients={this.props.location.state}/> Second Option*/ }

                <Route path={this.props.match.path + '/contact-data'} 
                       render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        )
    }
}

export default Checkout;