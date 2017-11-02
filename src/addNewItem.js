import React from 'react';
import { LoggedInNavBar } from './loggedInHome';
import { connect } from 'react-redux';
import { uploadNewItem, hideThankYouMessage } from './actions';


class AddNewItem extends React.Component {
    constructor() {
        super();
        this.state = {
            imageFile: '',
            imagePreviewUrl: '',
            title: '',
            price: '',
            description: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {

        if(this.props.showThankYouMessage) {
            this.props.dispatch(hideThankYouMessage());
        }
    }


    handleImageChange(e) {

        var file = e.target.files[0];
        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imageFile: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
  }


    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {

        e.preventDefault();

        var userId = this.props.user.id;
        var title = this.state.title;
        var price = this.state.price;
        var description = this.state.description;
        var imageFile = this.state.imageFile;

        var formData = new FormData();

        formData.append('file', imageFile);
        formData.append('userId', userId);
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);

        this.props.dispatch(uploadNewItem(formData));
    }


    render() {


        if(!this.props.user) {
            return null;
        }

        console.log(this.props);


        return(
            <div id='add-new-item-container'>
                {this.props.showThankYouMessage ?
                     <ThankYouMessage />
                 : this.state.imagePreviewUrl ?
                     <div id='item-upload-container'>
                         <img id='uploaded-item-pic' src={this.state.imagePreviewUrl} />
                     </div>
                     : <ItemPicUpload handleImageChange={(e) => this.handleImageChange(e)} />}
                 {this.props.showThankYouMessage || <AddNewItemForm title={this.state.title} price={this.state.price} description={this.state.description} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} />}
            </div>
        );
    }
}


const mapStateToProps = function(state) {
    return {
        user: state.user,
        showThankYouMessage: state.showThankYouMessage
    }
}

export default connect(mapStateToProps)(AddNewItem);



function ItemPicUpload(props) {
    return (
        <div id='item-upload-container'>
            <div>
                <label htmlFor='item-upload-input'>
                    <img src="../images/camera.png" id='item-upload-camera' />
                </label>
                <input type="file" id="item-upload-input" onChange={props.handleImageChange} />
            </div>
            <p id='item-pic-upload-text'>Select a picture</p>
        </div>
    )
}


function AddNewItemForm(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <input className='add-item-input' type='text' name='title' placeholder='Title' value={props.title} onChange={props.handleInputChange} required /><br />
            <input className='add-item-input' type='number' min="0" step="1" name='price' placeholder='Price €' value={props.price} onChange={props.handleInputChange} required /><br />
            <input className='add-item-input' type='text' name='description' placeholder='Description' value={props.description} onChange={props.handleInputChange} required /><br />
            <input className='add-item-button' type='submit' value='Submit' />
        </form>
    )
}


function ThankYouMessage() {
    return (
        <div id='thank-you-container'>
            <p> Thank you for your post!</p>
        </div>
    )
}
