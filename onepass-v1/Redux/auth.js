export const defaultState  ={
    details:{},
    user:null
}

export const reducer = (state=defaultState,action)=>{
    switch (action.type){
        case "REGISTER":
        return {
            ...state,
            details:action.data
        }
        
        
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