import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import classes from './ContactData.css'

class ContactData extends Component {
    
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: '',
                validation: {
                    required: true
               },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();

        this.setState({loading: true})
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    checkValidity = (value,rules) => {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const UpdatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...UpdatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched  = true;
        UpdatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in UpdatedOrderForm) {
            formIsValid = UpdatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            orderForm: UpdatedOrderForm,
            formIsValid: formIsValid
        })
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = ( 
            <form onSubmit={this.orderHandler} >
                    {formElementArray.map(formElement => (
                    <Input elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            key={formElement.id}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched = {formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            value={formElement.config.value} />
                    ))}
                    <Button disabled={!this.state.formIsValid} btnType="Success">Order</Button>
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