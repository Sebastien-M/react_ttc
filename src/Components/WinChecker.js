// import ee from "./Emitter";

class WinChecker{

    static checkIfEquality(board){
        return (board.includes(null) ? false: 'Draw');
    }

    static toMultiDimentionalArray(board) {
        let new_board = board.slice();
        let converted_board = [];

        for (let i = 0; i < 3; i++) {
            converted_board.push(new_board.splice(0, 3));
        }
        return converted_board;
    }

    checkHorizontal(multi_array){
        let winner = false;
        let first_cell = null;

        multi_array.forEach((row)=>{
            first_cell = row[0];
            if((row.every((element)=>element !== null && element === first_cell))){
                winner = first_cell;
            }
        });
        return winner;
    }

    checkVertical(multi_array){
        let winner = false;
        let first_cell = null;
        let column = [];

        for(let i = 0; i < multi_array.length; i++){
            column = multi_array.map(function(value) { return value[i]; });
            first_cell = column[0];
            if((column.every((element)=>element !== null && element === first_cell))){
                winner = first_cell;
            }
        }
        return winner;
    }

    checkDiagonal(multi_array){
        let winner = false;
        let first_cell1 = multi_array[0][0];
        let first_cell2 = multi_array[0][2];
        let diagonal = [];
        let diagonal2 = [];
        let j = 2;

        for(let i = 0; i < multi_array.length; i++){
            diagonal.push(multi_array[i][i]);
        }
        for(let i = 0; i < multi_array.length; i++){
            diagonal2.push(multi_array[i][j]);
            j--;
        }
        if((diagonal2.every((element)=>element !== null && element === first_cell2))){
            winner = first_cell2;
        }
        else if((diagonal.every((element)=>element !== null && element === first_cell1))){
            winner = first_cell1;
        }
        return winner;
    }

    determineWinner(board) {
        let new_array = WinChecker.toMultiDimentionalArray(board);
        let equality = WinChecker.checkIfEquality(board);
        let horizontal = this.checkHorizontal(new_array);
        let vertical = this.checkVertical(new_array);
        let diagonal = this.checkDiagonal(new_array);

        if(horizontal){
            // ee.emit('timer', 'stop');
            return 'Winner: ' + horizontal
        }
        else if (vertical){
            // ee.emit('timer', 'stop');
            return 'Winner: ' +vertical;
        }
        else if (diagonal){
            // ee.emit('timer', 'stop');
            return 'Winner: ' + diagonal;
        }
        else if (equality){
            // ee.emit('timer', 'stop');
            return equality;
        }
        return false;
    }
}

export default WinChecker;
