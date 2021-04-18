import React from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import {browserHistory} from 'react-router';
import validator from 'validator';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirm_password : '',
      invalid_auth : '',
      register_message : '',
      errors: {
        firstName : '',
        lastName : '',
        email: '',
        phone : '',
        password : '',
        confirm_password : ''
      },
    };
  }
  
  handleChange = event => {
      const { name, value } = event.target; 
      let errors = this.state.errors;
      this.setState({ errors, [name]: value });
  };

  handleSubmit = event => {
      event.preventDefault();
      const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      const validEmailRegex = 
           RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
      let data = this.state;
      let errors = this.state.errors;
      if(data.firstName === ''){
        errors.firstName= 'First Name is required!'
      } else {
         if(data.firstName.length < 5 ){
          errors.firstName= 'First Name should at least 5-charactor long!'
         } else {
           errors.firstName= ''
         }
      }
      if(data.lastName === ''){
        errors.lastName = 'Last Name is required!'
      }
      else {
        if(data.lastName.length < 5 ){
         errors.lastName= 'Last Name should at least 5-charactor long!'
        } else {
          errors.lastName= ''
        }
     }

   
      if(data.email === ''){
        errors.email= 'Email is required!'
      } else {
        if(!validEmailRegex.test(data.email)) {
          errors.email= 'Invalid email'
        }else {
          errors.email = '';
        } 
      } 

      if(data.password === ''){
        errors.password = 'Password is required!'
      }
      else {
        if(! strongRegex.test(data.password)) {
          errors.password= 'The password must contain at least 1 lowercase,at least 1 uppercase,at least 1 numeric character,at least one special character and must be eight characters or longer'
        } else {
          errors.password= ''
        }
     }
      
     if(data.confirm_password === ''){
       errors.confirm_password = 'Confirm Password is required!'
     }
      else {
          errors.confirm_password= ''
      }

      if(data.phone === ''){
        errors.phone= 'Phone is required!'
      }
      else {
        var phoneno = /^\d{10}$/;
        if(!data.phone.match(phoneno)) {
          errors.phone= 'phone should integer value & at least 10-charactor long!'
        }
        else {
          errors.phone= ''
        }
     }


      if (typeof data.password !== "undefined" && typeof data.confirm_password !== "undefined" && data.password!=='' && data.confirm_password!== '') {  
        if (data.password !== data.confirm_password) {
            errors.password= 'Password does not match!'
        }
      } 
      this.setState({ errors });
      
      if(this.state.errors.firstName === '' && this.state.errors.firstName === '' && this.state.errors.email === '' && this.state.errors.phone === '' && this.state.errors.password === '' && this.state.errors.confirm_password) {
          const userObject = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
          }
          axios.post(`${process.env.REACT_APP_URL}/api/users`, userObject)
          .then((response) => {
              this.setState({register_message : 'User registered successfully!!,please login '});
              this.setState({invalid_auth: ''});
              // browserHistory.push('/login');
              // setTimeout(function(){ window.location.reload(false) }, 500);
            }).catch((error) => {
            let invalid_auth  = this.state.invalid_auth;
            invalid_auth = error.response.data; 
            this.setState({register_message: ''});
            if(invalid_auth === 'User already registered.'){
               this.setState({invalid_auth : invalid_auth});
            } else {
              this.setState({invalid_auth: ''});
            }
            return false;
          });
      } else {
        console.log('Invalid form');
      }
  }

  render() {
    return (
      <div>
          <span className='error' style={{color: "red"}}>{this.state.register_message !=='' && this.state.register_message}</span>
          <span className='error' style={{color: "red"}}>{this.state.invalid_auth !=='' && this.state.invalid_auth}</span>

          <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicFirstName">          
                  <Form.Control type="text" placeholder="Enter First Name" name="firstName" onChange={this.handleChange} />
                  <span className='error' style={{color: "red"}}>{this.state.errors.firstName}</span>
                  </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formBasicLastName">
                    <Form.Control type="text" placeholder="Enter Last Name" name="lastName" onChange={this.handleChange} />
                    <span className='error' style={{color: "red"}}>{this.state.errors.lastName}</span>
                    </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Enter email" name="email" onChange={this.handleChange} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                    <span className='error' style={{color: "red"}}>{this.state.errors.email}</span>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange}/>
                  <span className='error' style={{color: "red"}}>{this.state.errors.password}</span>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Confirm Password" name="confirm_password" onChange={this.handleChange}/>
                  <span className='error' style={{color: "red"}}>{this.state.errors.confirm_password}</span>
                  </Form.Group>
                </Col>
              </Row>       
              <Row>
                <Col>
                  <Form.Group controlId="formBasicPhone">     
                    <Form.Control type="text" placeholder="Enter phone Number" name="phone" onChange={this.handleChange} />
                      <span className='error' style={{color: "red"}}>{this.state.errors.phone}</span>
                  </Form.Group>
                </Col>
              </Row>      
          
              <Button style={{background: '#3e3434'}} type="submit">
                  Submit
              </Button>
          </Form>
      </div>
    );
  } 
}

export default Register;