/**
 * fixDates
 * fixes old confusing dates format used on the sheet
 * @param {string} sheetName name of the google sheet that we use
 * @param {int} colNum column number of the dates that needs to be fixed
 * @param {int} noOfCols number of columns needs to be processed
 * @param {int} rowNum row number to start processing
 * @param {int} noOfRows number of rows/range needs to be processed
 */
function fixDates(sheetName, colNum, rowNum, noOfCols, noOfRows){

  var ss = SpreadsheetApp.getActiveSpreadsheet(); //Creates a variable to identify the associated google spreadsheet
  var target = ss.getSheetByName(sheetName); //Creates a variable to identify the passed sheetName
  var initialRowNum = rowNum; //Records the initial row number passed


  for (var i = 1; i <= noOfCols; i++){ //traverse the sheet on columns
      target.insertColumnAfter(colNum); //insert a new colmun
      target.insertColumnAfter(colNum); //insert a new colmun
      rowNum = initialRowNum; //re-initialize rowNum variable
      //target.getRange(rowNum-1,colNum).setValue(target.getRange(rowNum-1,colNum-1).getValue()); //copy the column name over to the new field

  for (var j=1; j<=noOfRows; j++){
    var oldDate = target.getRange(rowNum,colNum).getValue(); //Get the original date
    var didConvert = false; //checks if the data converted successfully

    if (oldDate.indexOf("(") != -1) { //checks for open bracket
        var wsString = getWithinBrackets(oldDate); //get a string with content inside the brackets
        var posOpenBracket = oldDate.indexOf("("); //get the position of the open braket
        oldDate = oldDate.slice(0,posOpenBracket); //discard the brakets and keep just the date
    }
    
    oldDate = oldDate.trim(); //Removes any space characters from start and end
    var arrOldDate = oldDate.split(""); //Creates an array with old date, each element contains each character
    var newDate; //Creates an variable to store new date
    var arrNewDate = new Array(9); //creates an array for corrected date
    arrNewDate[0] = "2"; //set of first digit of the year
    arrNewDate[1] = "0"; //transfer of second digit of the year

      if (oldDate == "") {
         newDate = ""; //adjacent cell will be empty
         didConvert = false; //flags confirming data was not converted
         continue;
    } else if (arrOldDate.length == 7 && isNaN(arrOldDate[0]) == false && isNaN(arrOldDate[1]) == false &&
       isNaN(arrOldDate[2]) == true && isNaN(arrOldDate[3]) == true && isNaN(arrOldDate[4]) == true && 
       isNaN(arrOldDate[5]) == false && isNaN(arrOldDate[6]) == false) { //if date is in DDMMMYY format
        arrNewDate[2] = arrOldDate[5]; //transfer of first digit of the year
        arrNewDate[3] = arrOldDate[6]; //transfer of second digit of the year
        arrNewDate[4] = arrOldDate[2]; //transfer of first letter of month
        arrNewDate[5] = arrOldDate[3]; //transfer of secand letter of month
        arrNewDate[6] = arrOldDate[4]; //transfer of third letter of month
        arrNewDate[7] = arrOldDate[0]; //transfer of first digit of the day
        arrNewDate[8] = arrOldDate[1]; //transfer of second digit of the day
        newDate =  arrNewDate.toString(); //convert to string and store in newDate variable
        newDate = newDate.replace(/,/g,""); //replace all occurences of "," after toString
        didConvert = true; //flags confirming data was converted successfully
    } else if (arrOldDate.length == 6 && isNaN(arrOldDate[0]) == false && isNaN(arrOldDate[1]) == true &&
       isNaN(arrOldDate[2]) == true && isNaN(arrOldDate[3]) == true && isNaN(arrOldDate[4]) == false && isNaN(arrOldDate[5]) == false) { //if date is in DDMMMYY format
         arrNewDate[2] = arrOldDate[4]; //transfer of first digit of the year
         arrNewDate[3] = arrOldDate[5]; //transfer of second digit of the year
         arrNewDate[4] = arrOldDate[1]; //transfer of first letter of month
         arrNewDate[5] = arrOldDate[2]; //transfer of secand letter of month
         arrNewDate[6] = arrOldDate[3]; //transfer of third letter of month
         arrNewDate[7] = "0"; //transfer of first digit of the day
         arrNewDate[8] = arrOldDate[0]; //transfer of second digit of the day
         newDate =  arrNewDate.toString(); //convert to string and store in newDate variable
         newDate = newDate.replace(/,/g,""); //replace all occurences of "," after toString
         didConvert = true; //flags confirming data was converted successfully
    } else {
         newDate = "Invalid Date Format"; //Says "Invalid Date Format" in the adjacent cell
         didConvert = false; //flags confirming data was not converted
    }

    if ( wsString || didConvert == false) {
        target.getRange(rowNum,colNum+1).setValue(newDate); //store newDate in the adjacent cell
        target.getRange(rowNum,colNum+2).setValue(wsString); //store Workstation in the adjacent cell
         wsString = "";
    }
    if (didConvert == true) {
         target.getRange(rowNum,colNum+1).setValue(newDate); //store newDate in the adjacent cell
    }
    
    rowNum++;
  }
    colNum = colNum + 3;
  }
}
