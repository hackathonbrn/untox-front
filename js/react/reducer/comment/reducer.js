import { SEND_COMMENT } from './actiontypes'
import { SEND_COMMENT_LOAD } from './actiontypes'

const initialState = {
    data   : [],
    loading: false
}

export const comment = (state = initialState, action) => {
    const { payload } = action
    switch (action.type) {
    case SEND_COMMENT:
        return Object.assign({}, {
            ...payload, 
            loading: false
        })
        
    case SEND_COMMENT_LOAD:
        return Object.assign({}, {
            ...state, 
            loading: true
        })

    default:
        return state
    }
}