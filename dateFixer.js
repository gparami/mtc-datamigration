/**
 * fixDates
 * fixes old confusing dates format used on the sheet
 * @param {string} sheetName name of the google sheet that we use
 * @param {int} colNum column number of the dates that needs to be fixed
 * @param {int} rowNum row number to start processing
 * @param {int} rowLength number of rows/range needs to be processed
 */
function fixDates(sheetName, colNum, rowNum, rowLength){

  var ss = SpreadsheetApp.getActiveSpreadsheet(); //Creates a variable to identify the associated google spreadsheet
  var target = ss.getSheetByName(sheetName); //Creates a variable to identify the passed sheetName
  target.insertColumnAfter(colNum); //insert a new colmun

  for (var i=rowNum; i<=rowLength; i++){
    var oldDate = target.getRange(i,colNum).getValue(); //Get the original date
    oldDate = oldDate.trim(); //Removes any space characters from start and end
    var arrOldDate = oldDate.split(""); //Creates an array with old date, each element contains each character
    var newDate; //Creates an variable to store new date
    var arrNewDate = new Array(9); //creates an array for corrected date
    arrNewDate[0] = "2"; //set of first digit of the year
    arrNewDate[1] = "0"; //transfer of second digit of the year

    if (arrOldDate.length == 7 && isNaN(arrOldDate[0]) == false && isNaN(arrOldDate[1]) == false &&
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
    } else if (oldDate == "") {
         newDate = ""; //adjacent cell will be empty
    } else {
         newDate = "Invalid Date Format"; //Says "Invalid Date Format" in the adjacent cell
    }
    target.getRange(i,colNum+1).setValue(newDate); //store newDate in the adjacent cell

  }
}
