import {useDispatch,useSelector} from 'react-redux'
import { Dispatch } from 'redux'
import { getControlData, getGameState } from '../Store/selectors'
import {startGame, updateMatrix} from '../Store/actions'
import {InitialState} from '../Store/types'


export const usePadController = () =>{

    const dispatch = useDispatch()
    const controlData = useSelector(getControlData,(left,right)=>{
        for(let i = 0; i< left.matrix.length; i++){
            for(let j = 0; j< left.matrix[0].length;j++)
            if(left[i][j] === right[i][j]){
                return true
            }else {
                return false
            }
        }
    })
    const gameState = useSelector(getGameState)

    const move = () =>{
        if(gameState === 'PLAYING'){
            let direction = 'right'
            const movingRow = controlData.matrix[controlData.padRow];
            const padPositon = [movingRow.indexOf(1),movingRow.indexOf(1) + controlData.padSize]
            const matrix = [...controlData.matrix]
            if(direction === 'right'){
                matrix[controlData.padRow][padPositon[0]] = 0
                matrix[controlData.padRow][padPositon[1]] = 1
            }else if(direction === 'left'){
                matrix[controlData.padRow][padPositon[1]] = 0
                matrix[controlData.padRow][padPositon[0]] = 1
            }
            if (padPositon[0] === 0){
                direction = 'right'
            }else if (padPositon[1] === matrix.length){
                direction = 'left'
            }
            setTimeout(()=>dispatch(updateMatrix(matrix)),1000)
        }
        
    }

    const clickHandler = () =>{
        if(gameState === 'INITIALIZED'){
            dispatch(startGame())
        }
    }
    const bounce = () =>{
    
    }
    
    const levelUp = () =>{
    
    }

    return {
        move,
        clickHandler,
        matrix: controlData.matrix
    }

}