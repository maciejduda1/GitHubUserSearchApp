
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: [],
      areResults: false
    };
  }

  onChangeHandle(event) {
    this.setState({searchText: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({areResults:true});
    const {searchText} = this.state;
    if (this.state.searchText != '') {
      const url = `https://api.github.com/search/users?q=${searchText}`;
      fetch(url)
        .then(response => response.json())
        .then(responseJson => this.setState({users: responseJson.items}));
    }
    else {
      this.setState({areResults:false, users:[]});
      console.log({searchText});
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.onSubmit(event)}>
          <label htmlFor="searchText">Search by user name:  </label>
          <input
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}/>
        </form>
        <UsersList users={this.state.users} results={this.state.areResults}  />
      </div>
    );
  }
}

class UsersList extends React.Component {

  get users() {
    return this.props.users.map(user => <User key={user.id} user={user}/>);
  }

  render() {
    if (this.props.users.length > 0){
      return (
        <div className='userList'>
          {this.users}
        </div>
      );
    } else if (this.props.results === true) { 
      return (
        <div className='noUserList'>
          Nic Nie znaleziono!
        </div>
      );  
    } else {
      return (
        <div className='noUserList'>
          Czekam na zapytania o Użytkowników!
        </div>
      );
    }
  }
}

class User extends React.Component {
  render() {
    return (
      <div className='userInfo'>
        <img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
        <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);