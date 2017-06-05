/**
 * extractWorkstation
 * extracts the workstation names written inside the "(" and ")" in the date fields on the sheet. This function needs to run after dateFixer().
 * TODO may be integrate this into the dateFixer in the future so it will happen automatically.
 * @param {string} sheetName name of the google sheet that we use
 * @param {int} rowNum row number to start processing
 * @param {int} colNum column number of the dates that needs to be fixed
 * @param {int} noOfRows number of rows/range needs to be processed
 * @param {int} noOfCols number of columns needs to be processed
 */
function extractWorkstation(sheetName, rowNum, colNum, noOfRows, noOfCols){

    var ss = SpreadsheetApp.getActiveSpreadsheet(); //Creates a variable to identify the associated google spreadsheet
    var target = ss.getSheetByName(sheetName); //Creates a variable to identify the passed sheetName
    var arrValues = target.getRange(rowNum, colNum, (target.getLastRow()-rowNum+1), (target.getLastColumn()-colNum+1)).getValues();

    for (var i = 0; i <= arrValues[0].length; i++) {
        for (var j = 0; j <= arrValues.length; j++ ) {
            if (arrValues[j][i].indexOf("(") != -1) {
                var withinBrackets = arrValues[j][i].match(/\(([^)]+)\)/)[1] //Regex syntax to extract the string within the brackets
                //TODO finish implementing a standalone function
            }
        }
    }
}

/**
 * getWithinBrackets
 * extracts the string within brackets between "(" and ")" from the value passed and return it as a new string.
 * @param {string} fullstr name of the google sheet that we use
 * @return {string} withinBrackets string extracted from within brackets
 */
function getWithinBrackets(fullstr){
    fullstr = fullstr.toString(); //convert the variable passed to string because it might be in a different format
    var withinBrackets = fullstr.match(/\(([^)]+)\)/)[1] //Regex syntax to extract the string within the brackets
    return withinBrackets; //return the extracted string
}