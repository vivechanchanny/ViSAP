//To check the i18next in window object
if (window.i18next) {  
    getJsonData(); //Reading json Data from json File

    //initializing the i18next method using init(it has multiple parameters)
    window.i18next.init({
        lng: 'en', // If not given, i18n will detect the browser language.
        resources: JsonData,  //This will get the json data from getJsonData method.
        getAsync: false,
    }, function(err, t) {
        console.log("Json file loaded");
    });
}
//Wrapper method to get localized value for the key
function getlocalizeValue(key) {
    return window.i18next.t(key);
};


//To get the data from the json file using ajax.
function getJsonData() {
    $.ajaxSetup({
        async: false
    });
    $.getJSON(configData.jsonFileUrl, function(resources) { //configData.jsonFileUrl(getting this value from the config.js)
        JsonData = resources;
    }).fail(function(err) {
        console.log("Failed to load json file.");
    });

}