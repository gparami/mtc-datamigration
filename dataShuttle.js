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
function migrate(){

    //parameters are defined here, just to make it easy to execute on google app scripts
    var toSheet = "OneSheetToRuleThemAll",
        row = 2,
        column = 1,
        //dynamic parameters
        fromSheet = "CON_Starting Sep 2011 Qualifications",
        numRows = 81,
        numColumns = 9,
        trainingColumn = 8;

    //initializing the spreadsheet and extracting data to arrays for faster operations
    var activeSS = SpreadsheetApp.getActiveSpreadsheet();
    var originSheet = activeSS.getSheetByName(fromSheet);
    var destinationSheet = activeSS.getSheetByName(toSheet);
    var arrOriginRecords = originSheet.getRange(row, column, numRows, numColumns).getValues();
    //var arrOriginRecords = SpreadsheetApp.getActiveSheet().getRange(2, 3, 6, 4).getValues();

    //dynamic location variables from the original sheet
    var oriTrainingType = originSheet.getRange(1,trainingColumn).getValue();
    var oriTrainingDate = trainingColumn;
    //var oriWorkstation = trainingColumn + 1;

    var oriFirstName = 2;
    var oriLastName = 3;
    var oriStudentID = 4;
  
    //var oriRemarks = 5;
    //var oriProgram = 4;
    //var oriClass = 5;
    //var oriSection = 6;
    
    

    //fixed location variables from the destination sheet
    var desNextEmptyRow = destinationSheet.getLastRow()+1,
        desTrainingID = 1,
        desStudentID = 2,
        desFullName = 3,
        desFirstName = 4,
        desLastName = 5,
        desEmail = 6,
        desFaculty = 7,
        desProgram = 8,
        desTrainingType = 9,
        desTrainingDate = 10,
        desInstructor = 11,
        desClass = 12,
        desSection = 13,
        desWorkshop = 14,
        desWorkstation = 15,
        desRemarks =  16;
    
    //traverse through the imported data and create records in the destination sheet
    for (i = 0; i < arrOriginRecords.length; i++) {
        
      if (arrOriginRecords[i][oriTrainingDate-1].toString() != "") {
            //mandatory data
            destinationSheet.getRange(desNextEmptyRow, desFirstName).setValue(arrOriginRecords[i][oriFirstName-1]);
            destinationSheet.getRange(desNextEmptyRow, desLastName).setValue(arrOriginRecords[i][oriLastName-1]);
            destinationSheet.getRange(desNextEmptyRow, desStudentID).setValue(arrOriginRecords[i][oriStudentID-1]);
            destinationSheet.getRange(desNextEmptyRow, desTrainingType).setValue(oriTrainingType);
            destinationSheet.getRange(desNextEmptyRow, desTrainingDate).setValue(arrOriginRecords[i][oriTrainingDate-1]);
            
            //only when available data
            //destinationSheet.getRange(desNextEmptyRow, desFullName).setValue(arrOriginRecords[i][oriFullName-1]);
            //destinationSheet.getRange(desNextEmptyRow, desProgram).setValue(arrOriginRecords[i][oriProgram-1]);
            //destinationSheet.getRange(desNextEmptyRow, desClass).setValue(arrOriginRecords[i][oriClass-1]);
            //destinationSheet.getRange(desNextEmptyRow, desSection).setValue(arrOriginRecords[i][oriSection-1]);
            
            
            //unorthodox data collected will be added as remarks on each record in the new database
            //var Remarks = arrOriginRecords[i][oriRemarks-1].concat(arrOriginRecords[i][oriWorkstation-1]);
            //var Remarks = arrOriginRecords[i][oriRemarks-1] + ", " + arrOriginRecords[i][oriWorkstation-1];
            //destinationSheet.getRange(desNextEmptyRow, desRemarks).setValue(Remarks);
            desNextEmptyRow++;
        }
        
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
        var compObject = arrValues[i].toString();
        if (arrValues[i] == searchString){
            //TODO
        }
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