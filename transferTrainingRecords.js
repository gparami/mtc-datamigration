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
