import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { receiveFeedItems } from './actions';
const awsS3Url = "https://s3.amazonaws.com/inasfleamarket";

class LoggedInHome extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.dispatch(receiveFeedItems());
    }

    render() {

        if (!this.props.feedItems) {
            return null;
        }

        console.log(this.props.feedItems);

        const feedItems = (
            <div id='loggedInHome-items-container'>
                {this.props.feedItems.map((item) =>
                    <div className='loggedInHome-item-container'>
                        <img className='loggedInHome-image' src={awsS3Url + '/' + item.image} alt='hello' />
                        <p className='loggedInHome-item-title'>{item.title}</p>
                        <p>{item.price + ' €'}</p>
                    </div>
                )}
                <div id='clearing-div'></div>
            </div>
        )

        return (
            <div>
                {feedItems}
            </div>
        )
    }

}

const mapStateToProps = function(state) {
    return {
        feedItems: state.feedItems
    }
}

export default connect(mapStateToProps)(LoggedInHome);
