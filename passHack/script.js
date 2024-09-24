let pass = "674";
function hack(){
    for(let a="0";a<="9";a++){
        for(let b="0";b<="9";b++){
            for(let c = 0;c<="9";c++){
                for(let d = 0;d<="9";d++){
                    if(`${a}${b}${c}${d}`== pass){
                        document.getElementById('text').innerText = `${a}${b}${c}${d}`;
                    }
                }
            } 
        }
    }
}