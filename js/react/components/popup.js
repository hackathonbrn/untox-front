import React, { Component } from 'react'
import { connect } from 'react-redux';
import { sendComment } from '../reducer/comment/action'

class Popup extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            text: ''
        }
    }

    handleChange = (e) => {
        let value = e.currentTarget.textContent
        this.setState({
            text: value
        })
    }

    check = () => {
        this.state.text.length > 0 ? this.props.commentSend(this.state.text) : ''
    }

    render() {
        console.log(this.props.commentStatus)
        return (
            <div className='widget'>
                <div className='widget-close' onClick={this.props.close}> </div>
                <div className='widget-title'>!! Сообщение токсично !!</div>
                <div className='widget-description'>Рекомендуем дважды подумать, прежде чем такое писать.</div>
                <div className='widget-text' contentEditable={true} onInput={this.handleChange} dangerouslySetInnerHTML={{__html: this.props.commentStatus.data.length !== 0 ? this.props.commentStatus.data : ''}}/>
                <div className='widget-controls'>
                    <div className='btn btn--widget' onClick={this.check}>Перепроверить</div>
                    <div className='btn btn--widget'>Отправить</div>
                </div>
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
})(Popup)