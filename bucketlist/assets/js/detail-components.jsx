import React, {Component} from 'react';

export default class BucketListContainer extends Component {
  sendUpdate() {
    fetch(this.props.source, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(this.fetchBucketList());
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      const new_item = {description: event.target.value, id: undefined};
      this.setState({items: this.state.items.concat(new_item)}, this.sendUpdate);
      event.target.value = '';
    }
  }
  handleRemove(id) {
    let new_items = [];
    this.state.items.forEach((item) => {
      if (item.id !== id) {
        new_items.push(item);
      }
    });
    this.setState({items: new_items}, this.sendUpdate);
  }
  componentDidMount() {
    this.fetchBucketList();
  }
  fetchBucketList() {
    fetch(this.props.source)
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({name: responseJSON.name, id: responseJSON.id, items: responseJSON.items});
      })
      .catch((error) => {
        console.warn(error);
      });
  }
  render() {
    return (
      <div className="bucketlist-container col-md-4">
        {this.state ? <BucketListHeader name={this.state.name} /> : null}
        {this.state ? <BucketListItemWrapper
                        items={this.state.items}
                        handleRemove={this.handleRemove.bind(this)}
                      /> : null}
        <AddBucketListItem onKeyPress={this.handleKeyPress.bind(this)} />
        <hr />
        <BucketListControls handleRemove={this.handleRemove.bind(this)} />
      </div>
    );
  }
}

class BucketListControls extends Component {
  render() {
    return (
      <div className="bucketlist-controls">
        <button type="submit" className="btn btn-sm btn-primary">Done</button>
      </div>
    );
  }
}

class BucketListHeader extends Component {
  render() {
    return (
      <div className="bucketlist-header">
        <span className="bucketlist-title">{this.props.name}</span>
      </div>
    );
  }
}

class BucketListItemWrapper extends Component {
  render() {
    return (
      <div className="bucketlist-items">
        {this.props.items.map((item, i) => {
          return (
            <BucketListItem
              id={item.id}
              description={item.description}
              handleRemove={this.props.handleRemove}
              key={i}
            />
            );
        })}
      </div>
    );
  }
}

class BucketListItem extends Component {
  render() {
    return (
      <div className="bucketlist-item">
        <button
          type="button"
          className="btn btn-xs btn-danger"
          onClick={this.props.handleRemove.bind(this, this.props.id)}>
          x
        </button>
        {' '}
        {this.props.description}
      </div>
    );
  }
}

class AddBucketListItem extends Component {
  render() {
    return (
      <div className="add-bucketlist-item">
        <input type="text" placeholder="Add an item..." onKeyPress={this.props.onKeyPress} />
      </div>
    );
  }
}