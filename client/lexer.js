/*Lexer*/
var Lexer = function(){
    this.regExCaptureDictionaries = /.+?(\")/ig;
    this.regExForIds = /[0-9]/ig;
    this.regExForValues = /[a-z]/ig;
    this.ENUM_INDEX = {
        DEPARTMENT: 0,
        PROVINCE: 1,
        DISTRICT: 2
    };
    this.tokens = [];
};

Lexer.prototype.makeRows = function(StringToRead){
    this.rows = StringToRead.match(this.regExCaptureDictionaries);
};

Lexer.prototype.getFormatedCell = function(dataCell){
    var Id = "";
    var Name = "";

    if(dataCell !== ""){
        this.regExForIds.lastIndex = 0;
        this.regExForValues.lastIndex = 0;

        Id = dataCell.match(this.regExForIds).join("");
        Name = dataCell.match(this.regExForValues).join("");
    }

    return {
        Id: Id,
        Name: Name
    };
};

Lexer.prototype.getFormatedCells = function(dataRow){
    var sanitizedRow = dataRow.replace(/\"/g, "");
    var decoupledRow = sanitizedRow.split(/ \//ig);
    var ENUM_INDEX = this.ENUM_INDEX;

    return {
        department: this.getFormatedCell(decoupledRow[ENUM_INDEX.DEPARTMENT]),
        province  : this.getFormatedCell(decoupledRow[ENUM_INDEX.PROVINCE]),
        district  : this.getFormatedCell(decoupledRow[ENUM_INDEX.DISTRICT])
    };
};

Lexer.prototype.getTokens = function(){
    for(var i=0; i < this.rows.length; i++){
        var row = this.rows[i];
        this.tokens.push(
            this.getFormatedCells(row)
        );
    }
    return this.tokens;
};
