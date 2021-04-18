import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';
import PieChart from './PieChart';
import axios from 'axios';

class Dashboard extends React.Component {

  state = {sentiments : [''] }

  componentDidMount() {
      const user = getUser();
      var obj = JSON.parse(user);
      const user_id = obj._id;
      const config = {
          method: 'get',
          url: 'http://127.0.0.1:8080/api/users/getSentiments/'+user_id,
          headers: { 'x-auth-token': sessionStorage.getItem('token') }
      }
      axios(config)
      .then(res => {
          const data = res.data;
          this.setState({sentiments: data.sentiment});
      })
      .catch((error) => {
          console.log(error)
      })
  } 

  // handle click event of logout button
  handleLogout = () => {
    removeUserSession();
    this.props.history.push('/login');
    setTimeout(function(){ window.location.reload(false) }, 500);
  }
  render(){
    const user = getUser();
    const obj = JSON.parse(user);

    if(obj == null) {
       this.props.history.push('/login');
       return false;
    } else {
        return (
          <div>
            Welcome {obj.firstName}!<br /><br />
            <PieChart sentiments={this.state.sentiments} />
          </div>
        );
    }
  }
}
export default Dashboard;
