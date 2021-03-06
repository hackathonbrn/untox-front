import { SEND_COMMENT } from './actiontypes'
import { SEND_COMMENT_LOAD } from './actiontypes'
import { API } from '../../constants'
export const sendComment = (data) => (dispatch) => {
    dispatch({
        type   : SEND_COMMENT_LOAD,
        payload: { loading: true }
    })
    $.ajax({
        url     : API,
        data    : {text: data},
        method  : 'POST',
        dataType: 'json',
        success : (res) => {
            let text = data
        
            res.wordToxicity.map((item, i) => {
                var expr = new RegExp(item.word, 'gi');
                if (item.toxicity < 0) {
                    text = text.replace(expr, '<b class="detect">' + item.word + '</b>')
                } else {
                    if (item.is_bad == 1) {
                        text = text.replace(expr, '<b class="detect detect-bad">' + item.word + '</b>')
                    } else if (item.is_filthy == 1) {
                        text = text.replace(expr, '<b class="detect detect-filthy">' + item.word + '</b>')
                    }
                }
            })
            
            let level = res.wordToxicity.length > 0 ? (res.commToxicity / res.wordToxicity.length).toFixed() : 0

            dispatch({
                type   : SEND_COMMENT,
                payload: { loading: false, level: level, data: text }
            });
        },
        error: () => {
            dispatch({
                type   : SEND_COMMENT,
                payload: { loading: false, level: 0, data: '' }
            });
        }
        

    })

/*    fetch(API, {
        method: 'POST',
        data  : {text: data}
    }).then((res) => {
        return res.json()
    }).then((res) => {
        
        let text = data
        
        res.wordToxicity.map((item, i) => {
            var expr = new RegExp(item.word, 'gi');
            text = text.replace(expr, '<b class="detect">' + item.word + '</b>')            
        })

        console.log(res.commToxicity)
        console.log(res)
        
        dispatch({
            type   : SEND_COMMENT,
            payload: { loading: false, level: 0, data: text }
        });

    }).catch(() => {
        dispatch({
            type   : SEND_COMMENT,
            payload: { loading: false, level: 0, data: {} }
        });
    })*/
}
