import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-orders';
import classes from './ContactData.css'

class ContactData extends Component {
    
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zip: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();

        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Artur',
                address: {
                    street: '12222 test street',
                    zipCode: '77040',
                    country: 'USA'
                },
                email: 'test@email.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                // console.log(response)
                this.setState({loading: false})
                this.props.history.push('/');
            })
            .catch(error => {
                // console.log(error)
                this.setState({loading: false})
            })
    }

    render() {
        let form = ( 
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                    <input className={classes.Input} type="text" name="email" placeholder="Your Street" />
                    <input className={classes.Input} type="text" name="zip" placeholder="ZIP" />
                    <Button clicked={this.orderHandler} btnType="Success">Order</Button>
                </form>
                )
            if(this.state.loading){
                form = <Spinner />
            }
        
        return (
            <div className={classes.ContactData}>
                <h4> Enter your Contact data </h4>    
                    {form}
            </div>
        )
    }

}

export default ContactData;