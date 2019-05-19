import React, { Component } from 'react'
import { connect } from 'react-redux';
import { sendComment } from '../reducer/comment/action'
import Loading from '../components/loader'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            textarea: ''
        }
    }

    handleChange = (e) => {
        let value = e.currentTarget.textContent
        this.setState({
            textarea: value
        })
    }

    send = () => {
        this.state.textarea.length > 0 ? this.props.commentSend(this.state.textarea) : ''
    }

    render() {
         
        return (
            <div className='editor'>
                {this.props.commentStatus.loading ? <Loading/> : ''}
                <div className='editor-wrapper'>
                    <div className='editor-box__content'>
                        <div className='editor-box__content-item editor-box__content-item--center'>
                            <div className='editor-text'>
                                <div className='editor-title'>Свой текст коммента<br/> сюда и проверь</div>
                                <div className='editor-description'>Проверь свой коммент на токсичность и не будь мудаком в сети, следи за своей речью.</div>
                            </div>
                        </div>
                        <div className='editor-box__content-item' contentEditable={true} onInput={this.handleChange} dangerouslySetInnerHTML={{__html: this.props.commentStatus.data.length !== 0 ? this.props.commentStatus.data : '' }}>
                        </div>
                    </div>
                    <div className='editor-box__control'>
                        <div className='editor-box__control-item'>
                            <div className='btn' onClick={this.send}>Отправить</div>
                        </div>
                        <div className='editor-box__control-item'>
                            {this.props.commentStatus.level}
                        </div>
                    </div>
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
})(Home)