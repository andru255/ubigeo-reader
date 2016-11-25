/*Extensiones*/

/*Array object*/
Array.prototype.containsByKey = function(keyName, value){
    for(var index=0; index < this.length; index++){
        var item = this[index];
        if(item[keyName] === value){
            return true;
        }
    }
    return false;
};

Array.prototype.getUniqueItemsByKey = function(keyName) {
    var uniques = [];
    for(var i = 0; i < this.length; i++){
        if(!uniques.containsByKey(keyName, this[i][keyName])){
            uniques.push(this[i]);
        }
    }
    return uniques;
};

/*End Extensiones*/
