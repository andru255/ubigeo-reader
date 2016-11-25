var Parser = function(){
    this.ParsedDepartments = [];
    this.ParsedProvinces = [];
    this.ParsedDistricts = [];
};

Parser.prototype.formatDepartment = function(dataToken){
    return {
        CODE_LOCATION: dataToken.department.Id,
        NAME_LOCATION: dataToken.department.Name,
        CODE_FATHER: "-",
        DESC_FATHER: "-"
    };
};

Parser.prototype.formatProvinces = function(dataToken){
    var result = false;
    if(dataToken.province.Id){
        result = {
            CODE_LOCATION: dataToken.province.Id,
            NAME_LOCATION: dataToken.province.Name,
            CODE_FATHER: dataToken.department.Id,
            DESC_FATHER: dataToken.department.Name
        };
    }
    return result;
};

Parser.prototype.formatDistricts = function(dataToken){
    var result = false;
    if(dataToken.district.Id){
        result = {
            CODE_LOCATION: dataToken.district.Id,
            NAME_LOCATION: dataToken.district.Name,
            CODE_FATHER: dataToken.province.Id,
            DESC_FATHER: dataToken.province.Name
        };
    }
    return result;
};

Parser.prototype.getParsedData = function(tokens){
    var that = this;

    for(var index = 0; index < tokens.length; index++){
        var token = tokens[index];

        this.ParsedDepartments.push(
            this.formatDepartment(token)
        );

        this.ParsedProvinces.push(
            this.formatProvinces(token)
        );

        this.ParsedDistricts.push(
            this.formatDistricts(token)
        );
    }

    return {
        departments: this.ParsedDepartments,
        provinces: this.ParsedProvinces,
        districts: this.ParsedDistricts
    };
};
