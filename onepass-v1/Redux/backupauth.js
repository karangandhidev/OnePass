export const defaultState  ={
    user:null
}

export const reducer = (state=defaultState,action)=>{
    switch (action.type){      
        case "LOGIN":
            return{
                ...state,
                user:action.data
            }
        case "LOGOUT":
            return{
                ...state,
                user:null
            }
        default:
            return{
                ...state
            }
    }
}