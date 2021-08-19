// containers/Home.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHomeList } from './store/actions'

class Home extends Component {
  componentDidMount() {
   
    if (!this.props.list||!this.props.list.length) {
      this.props.getHomeList()
    }
  }

  getList() {
    const { list=[] } = this.props
    return list.map(item => <div key={item.id}>{item.title}</div>)
  }
  render() { 
    return (
      <>
        <div className="test">
          <div>这个是主页</div>
          {
            this.getList()
          }
        </div>
      </>
     
    )
  }
}

//连接store
const mapStateToProps = state => ({
  list: state.home.newsList,
});

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList())
  }
});
const exportHome = connect(mapStateToProps, mapDispatchToProps)(Home);

exportHome.loadData = (store) => {
  return store.dispatch(getHomeList())
};
export default exportHome;