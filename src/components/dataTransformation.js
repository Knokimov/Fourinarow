export default class dataTransformation {
     
    barChart(array) {
        const result = [0,0,0,0,0,0,0];
        var x;
        
        for (x in array){
            if (array[x].player === "Black"){
                if (array[x].movesmade[0] > 0 && array[x].movesmade[0] < 8) {
                    result[array[x].movesmade[0] - 1] ++;
                }
            }
            else if (array[x].player === "Blue") {
                if (array[x].movesmade[1] > 0 && array[x].movesmade[1] < 8) {
                    result[array[x].movesmade[1] - 1] ++;
                }
            }
        }
        return result; 
    }
    
    doughnutChart(array) {
        const result = [0,0];
        var x;
        
        for (x in array){
            if (array[x].player == "Black"){
                result[0] ++;
            }
            else if (array[x].player == "Blue") {
                result[1] ++;
            }
        }
        return result;
    }

    finsishedGames(array) {
        let result = 0;
        var x;

        for (x in array){
            if (array[x].ongoing == "Finished"){
                result ++;
            }
        }
        return result;
    }

    doughnutChart2(array) {
        const result = [0,0];
        var x;
        
        for (x in array){
            if (array[x].whoWon == "1"){
                result[0] ++;
            }
            else if (array[x].whoWon == "2") {
                result[1] ++;
            }
        }
        return result;
    }

    lineChart(array) {
        const result = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var x;
        
        for (x in array){
            var y;
            for(y in array[x].positionScore){
                if (array[x].positionScore[0] > 0){
                    result[y] += array[x].positionScore[y];
                } else {
                    result[y] -= array[x].positionScore[y];
                }
            }
        }
        return result; 
    }

    lineChartLabels() {
        let result = [];
        for (let i = 0; i < 21; i++) {
            result[i] = (`Move ${i +1}`);
        }

        return result;
    }
}

