
export function openIndexReducer(state,action){
    switch(action.type){
        case 'OPEN_INDEX':
            if(!state.open){
                return {
                    open:true,
                    indexOpen:action.indexOpen,
                    isPaying:state.isPaying,
                    indexPaying:state.indexPaying
                }
            }else{
                if(state.indexOpen === action.indexOpen){
                    return {
                        open:false,
                        indexOpen:-1,
                        isPaying:state.isPaying,
                        indexPaying:state.indexPaying
                    }
                }else{
                    // cuando estoy pagango en uno y abro otro 
                    console.log("cuando estoy en uno y abro otro");
                    if(action.indexOpen !== state.indexOpen){
                        return {
                            open:true,
                            indexOpen:action.indexOpen,
                            isPaying:(state.indexPaying === action.indexOpen),
                            indexPaying:state.indexPaying
                        }
                    }
                    // return {
                    //     open: true,
                    //     indexOpen: action.indexOpen,
                    //     isPaying:state.isPaying,
                    //     indexPaying:state.indexPaying
                    // }
                }
            }
        case 'OPEN_TO_PAY':
            if(!state.open){
                // cuando todos estan cerrados y doy pagar en uno
                console.log("cuando todos estan cerrados y doy pagar en uno");
                return {
                    open:true,
                    indexOpen:action.indexOpen,
                    isPaying:true,
                    indexPaying:action.indexOpen
                }
            }else{
                // cuando estoy pagando en uno y doy pagar en otro
                console.log("cuando estoy pagando en uno y doy pagar en otro 2");
                return {
                    open:true,
                    indexOpen:action.indexOpen,
                    isPaying:true,
                    indexPaying:action.indexOpen
                }
            }
        case 'CANCEL_OR_FINISH_PAY':
            return {
                open:false,
                indexOpen:-1,
                isPaying:false,
                indexPaying:-1
            }
    }

}