import React, { Component } from 'react'
import { connect } from 'react-redux';
import Popup from '../components/popup'
import { sendComment } from '../reducer/comment/action'

class Comments extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            popup: false
        }
    }

    handleChange = (e) => {
        let text = e.currentTarget.value
        this.setState({
            value: text 
        })
    }

    check = () => {
        this.state.value.length > 0 ? this.props.commentSend(this.state.value) : ''
        this.setState({
            popup: true 
        })
    }

    renderPopup = () => {
        return  this.props.commentStatus.data.length !== 0 && this.state.popup ? <Popup close={() => { this.setState({popup: false})}} /> : ''
    }

    render() {
        return (
            <div className='comments'>
                <div className='comments-field'>
                    <textarea onChange={this.handleChange} value={this.state.value}></textarea>
                    <div className='comments-field__btns'>
                        <div className='btn' onClick={this.check}> Проверить </div>
                        <div className='btn'> Отправить </div>
                    </div>
                </div>
                {this.renderPopup()} 
            </div>
        )
    }
}

export default connect((state) => {
    return { 
        commentStatus: state.comment
    }
}, (dispatch) => {
    return { commentSend: (data) => dispatch(sendComment(data)) }
})(Comments)