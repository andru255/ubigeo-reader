/*variables*/
var tmplLayout      = document.getElementById("b-tmpl-section");
var tmplRow         = document.getElementById("b-tmpl-row");
var outputElement   = document.getElementById("b-result");
var inputElement    = document.getElementById("plain-text");
var blockTextToRead = inputElement.value;

/*Logic*/
var objLexer = new Lexer();
var objParser = new Parser();
objLexer.makeRows(blockTextToRead);
var tokens = objLexer.getTokens();
var parsedData = objParser.getParsedData(tokens);

/*"getUniqueItems" proviene del archivo helpers.js*/
var getUniqueDepartments = parsedData.departments.getUniqueItemsByKey("CODE_LOCATION");
var getUniqueProvinces   = parsedData.provinces.getUniqueItemsByKey("CODE_LOCATION");
var getUniqueDistricts   = parsedData.districts.getUniqueItemsByKey("CODE_LOCATION");

/*Templating*/
var compiledBase = _.template(tmplLayout.innerHTML);
var compiledRow  = _.template(tmplRow.innerHTML);
var generateBody = function(rows){
    var bodyText = "";
    for(var index = 0; index < rows.length; index++){
        if(rows[index]){
            bodyText+= compiledRow(rows[index]);
        }
    }
    return bodyText;
};

/*Rendering Sections*/
var departmentView = compiledBase({
    TITLE: "Departmento",
    BODY: generateBody(getUniqueDepartments)
});

var provinceView = compiledBase({
    TITLE: "Provincia",
    BODY: generateBody(getUniqueProvinces)
});

var districtView = compiledBase({
    TITLE: "Distrito",
    BODY: generateBody(getUniqueDistricts)
});

/*output*/
outputElement.innerHTML = [
    departmentView,
    provinceView,
    districtView
].join("");
