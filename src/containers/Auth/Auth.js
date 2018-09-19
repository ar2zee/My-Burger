import React, { Component } from 'react';
import {connect} from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state= {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.isEmail) {
            const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
            isValid = pattern.test(value) && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            } 
        };
        this.setState({ controls: updatedControls})
    }

    submitHandler = (event) => {
        const updatedControls = {
            ...this.state.controls,
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        };
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
        this.setState({ controls: updatedControls })
    }

    swithAuthHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp}
        })
    }

  render() {

      const formElementArray = [];
      for (let key in this.state.controls) {
          formElementArray.push({
              id: key,
              config: this.state.controls[key]
          })
      }

      let form = formElementArray.map(formElement => (
              <Input
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  changed={(event) => this.inputChangedHandler(event, formElement.id)}
                  value={formElement.config.value}/>
        ));
        if (this.props.loading) {
            form = <Spinner />
            }

        let errorMsg = null;

      if (this.props.error) {
          errorMsg = (<p>{this.props.error.message}</p>)
      }


    return (
      <div className={classes.Auth}>
            {errorMsg}
            <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
                <Button clicked={this.swithAuthHandler}
                btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    }
}

const mapStateToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapDispatchToProps, mapStateToProps)(Auth);