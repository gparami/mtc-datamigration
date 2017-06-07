/**
 * migrate
 * takes records from one sheet and moves it to another by creating a record for each training given.
 * @param {String} fromSheet which sheet to extract the data from
 * @param {String} toSheet which sheet to save the data into
 * @param {integer} trainingColumn the column number of the target training to migrate
 * @param {integer} row the start row of the target migration range
 * @param {integer} column the starting column of the target migration range
 * @param {integer} numRows the hight in rows of the target migration range
 * @param {integer} numColumns the width in columns of the target migration range for one training
 */
function migrate(fromSheet, toSheet, trainingColumn, row, numRows, numColumns){

    var originSheet = SpreadsheetApp.getSheetByName(fromSheet); //get the origin sheet
    var destinationSheet = SpreadsheetApp.getSheetByName(toSheet); //get the destination sheet
    var arrOriginRecords = SpreadsheetApp.getSheetByName(originSheet).getRange(row, column, numRows, numColumns).getValues(); //gets the origin records in an array
    var destLastRow = destinationSheet.getLastRow(); //get the position of the last row that has content on destination sheet
    
    var desStudentID = 2; var oriStudentID = 4;
    var desFullName = 3; var oriFullName = 1;
    var desFirstName = 4; var oriFirstName = 2;
    var desLastName = 5; var oriLastName = 3;
    var desClass = 12; var oriClass = 5;
    var desSection = 13; var oriSection = 6;
    var desProgram = 8; 
    var desTrainingType = 9; var oriTrainingType = originSheet.getRange(1,trainingColumn).getValue();
    var desTrainingDate = 10; var oriTrainingDate = trainingColumn;
    var desInstructor = 11;
    var desWorkshop = 14;
    var desWorkstation = 15; var oriWorkstation = trainingColumn + 1;
    var desRemarks =  16; var oriRemarks = trainingColumn + 1;

    for (i = 1; i <= arrOriginRecords.length; i++) { //traverse through the imported data
        
        destinationSheet.getRange(destLastRow+1, desStudentID).setValue(arrOriginRecords[row-1][oriStudentID]); //migrate student id

    }

        

}

/**
 * columnSearch
 * returns the column number of the the specific string
 * @param {String} sheetName which sheet to look for
 * @param {integer} row which row to look look in
 * @param {String} searchString string to look for
 */
function columnSearch(sheetName, row) {
    var sheet = SpreadsheetApp.getSheetByName(sheetName); //gets the sheet by sheetName
    var arrValues = sheet.getRange(row,1,1,sheet.getLastColumn()).getValues(); //creates an array with the data from the row
    var index
    
    for (var i = 0; i < sheet.getLastColumn(); i++) {
        var compObject = arrValues[i].toString(); //get
        if (arrValues[i] == searchString
    }
}


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