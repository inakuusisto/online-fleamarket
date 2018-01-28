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
            <div id='feed-items-container'>
                {this.props.feedItems.map((item) =>
                    <img src={awsS3Url+'/'+item.image} alt='hello' />
                )}
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
