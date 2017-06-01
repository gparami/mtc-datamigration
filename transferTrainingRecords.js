/**
 * convOldRecords
 * Convert old records from (OLD_SYSTEM_JS) to new record format and save on a new sheet (OLD_TRAINING_RECORDS)
 */
function convOldRecords(){
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("OLD_SYSTEM_JS"); //Get  Sheet OLD_SYSTEM_JS
  var target = ss.getSheetByName("OLD_TRAINING_RECORDS"); //Get OLD_TRAINING_RECORDS Sheet

  var trainingCol = 7 //Selects which training to convert

  var sheetRowID = 3 //Initialize sheet to start from 3rd row
  var targetRowID = 776 //Initialize target to start from specific row
  
  for (var i=1; i<=775; i++ ){ //loop that runs through all records one time i.e. 775 rows
    
    if (IsEmpty(sheet.getRange(sheetRowID,trainingCol).getValue()) == false){
      var tName = sheet.getRange(sheetRowID,1).getValue(); //Gets Student Name from the Old System
      var tStudentID = sheet.getRange(sheetRowID,2).getValue(); //Gets Student ID from the Old System
      var tDate = sheet.getRange(sheetRowID,trainingCol).getValue(); //Gets Training Date from the Old System
      var tType = sheet.getRange(1, trainingCol).getValue(); //Gets the Training Type from Old System
      var tClass = sheet.getRange(sheetRowID,3).getValue(); //Gets Student Class from the Old System
      var tSection = sheet.getRange(sheetRowID,4).getValue(); //Gets Class Section from the Old System
      var tWS = sheet.getRange(sheetRowID,9).getValue(); //Gets Workstation Name from the Old System
      target.getRange(targetRowID,2).setValue(tName); //Transfer the name to FName field
      target.getRange(targetRowID,5).setValue(tStudentID); //Transfer the StudentID field
      target.getRange(targetRowID,11).setValue(tType); //Transfer the Training Type field
      target.getRange(targetRowID,10).setValue(tDate); //Transfer of the Training Date field
      target.getRange(targetRowID,8).setValue(tClass); //Transfer of the Class field
      target.getRange(targetRowID,9).setValue(tSection); //Transfer of the Section field
      target.getRange(targetRowID,13).setValue(tWS); //Transfer of the Workstation field
      targetRowID++;
    }
  
  sheetRowID++;
  }
}

/**
 * fixDates
 * fixes old confusing dates format used on the sheet
 */
function fixDates(sheetName, colNum, rowNum, rowLength){

  var ss = SpreadsheetApp.getActiveSpreadsheet(); //Creates a variable to identify the associated google spreadsheet
  var target = ss.getSheetByName(sheetName); //Creates a variable to identify the passed sheetName
  target.insertColumnAfter(colNum); //insert a new colmun

  for (var i=rowNum; i<=rowLength; i++){
    var oldDate = target.getRange(i,colNum).getValue(); //Get the original date
    oldDate = oldDate.trim(); //Removes any space characters from start and end
    var arrOldDate = oldDate.split(""); //Creates an array with old date, each element contains each character

    if (arrOldDate.length == 7 && isNaN(arrOldDate[0]) == false && isNaN(arrOldDate[1]) == false &&
       isNaN(arrOldDate[2]) == true && isNaN(arrOldDate[3]) == true && isNaN(arrOldDate[4]) == true && 
       isNaN(arrOldDate[5]) == false && isNaN(arrOldDate[6]) == false) { //if date is in DDMMMYY format
        var arrNewDate = new Array(arrOldDate.length); //creates an array for corrected date
        arrNewDate[0] = arrOldDate[5]; //transfer of first digit of the year
        arrNewDate[1] = arrOldDate[6]; //transfer of second digit of the year
        arrNewDate[2] = arrOldDate[2]; //transfer of first letter of month
        arrNewDate[3] = arrOldDate[3]; //transfer of secand letter of month
        arrNewDate[4] = arrOldDate[4]; //transfer of third letter of month
        arrNewDate[5] = arrOldDate[0]; //transfer of first digit of the day
        arrNewDate[6] = arrOldDate[1]; //transfer of second digit of the day
        target.getRange(i,colNum+1).setValue(arrNewDate.toString()); //convert to string and store in the adjacent cell
    } else if (arrOldDate.length == 6 && isNaN(arrOldDate[0]) == false && isNaN(arrOldDate[1]) == true &&
       isNaN(arrOldDate[2]) == true && isNaN(arrOldDate[3]) == true && isNaN(arrOldDate[4]) == false && isNaN(arrOldDate[5]) == false) { //if date is in DDMMMYY format
         var arrNewDate = new Array(arrOldDate.length+1); //creates an array for corrected date
         arrNewDate[0] = arrOldDate[4]; //transfer of first digit of the year
         arrNewDate[1] = arrOldDate[5]; //transfer of second digit of the year
         arrNewDate[2] = arrOldDate[1]; //transfer of first letter of month
         arrNewDate[3] = arrOldDate[2]; //transfer of secand letter of month
         arrNewDate[4] = arrOldDate[3]; //transfer of third letter of month
         arrNewDate[5] = "0"; //transfer of first digit of the day
         arrNewDate[6] = arrOldDate[0]; //transfer of second digit of the day
         target.getRange(i,colNum+1).setValue(arrNewDate.toString()); //convert to string and store in the adjacent cell
    } else {
      target.getRange(i,colNum+1).setValue("Invalid Date Format"); //Says "Invalid Date Format" in the adjacent cell
    }
  }
}
