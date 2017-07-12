/**
 * duplicateCalculator
 * finds possible duplicates and allocates how much does it match with the other record
 */

/**
 * duplicateFinder
 * finds possible duplicates and flags records for review.
 */
function duplicateFinder() {

    //Variables for the database connection
    var activeSS = SpreadsheetApp.getActiveSpreadsheet();
    var operatingSheet = activeSS.getSheetByName("JS_ONE_SHEET_TO_RULE_THEM_ALL");
    var trashSheet = activeSS.getSheetByName("REMOVED_RECORDS");

    //Variables for the data structure
    var arrOperatingRecords = operatingSheet.getRange(2, 1, 3321, 17).getValues();

    //Variables for the current record
    var posTrainingID = 0,
        posStudentID = 1,
        posFullName = 2,
        posFirstName = 3,
        posLastName = 4,
        posEmail = 5,
        posFaculty = 6,
        posProgram = 7,
        posTrainingType = 8,
        posTrainingDate = 9,
        posInstructor = 10,
        posCourse = 11,
        posSection = 12,
        posWorkshop = 13,
        posWorkstation = 14,
        posRemarks =  15,
        posDuplicate = 16;

    //Variables for looping
    var lastRecord = arrOperatingRecords.length;

    //loop: Get current record
    for (var operatingPointer = 0; operatingPointer < lastRecord; operatingPointer++) {

        //loop through to find a duplicate
        for (var comparisonPointer = operatingPointer + 1 ; comparisonPointer < lastRecord; comparisonPointer++) {

            var operatingStudentID = arrOperatingRecords[operatingPointer][posStudentID];
            var comparisonStudentID = arrOperatingRecords[comparisonPointer][posStudentID];

            var operatingFirstName = arrOperatingRecords[operatingPointer][posFirstName];
            var comparisonFirstName = arrOperatingRecords[comparisonPointer][posFirstName];
            
            var operatingLastName = arrOperatingRecords[operatingPointer][posLastName];
            var comparisonLastName = arrOperatingRecords[comparisonPointer][posLastName];

            var operatingTrainingDate = arrOperatingRecords[operatingPointer][posTrainingDate];
            var comparisonTrainingDate = arrOperatingRecords[comparisonPointer][posTrainingDate];

            var operatingTrainingType = arrOperatingRecords[operatingPointer][posTrainingType];
            var comparisonTrainingType = arrOperatingRecords[comparisonPointer][posTrainingType];
            
            //if duplicate found
            if (arrOperatingRecords[operatingPointer][posStudentID] != "" &&
                arrOperatingRecords[operatingPointer][posStudentID] == arrOperatingRecords[comparisonPointer][posStudentID] &&
                //arrOperatingRecords[operatingPointer][posFirstName] == arrOperatingRecords[comparisonPointer][posFirstName] &&
                //arrOperatingRecords[operatingPointer][posLastName] == arrOperatingRecords[comparisonPointer][posLastName]   &&
                arrOperatingRecords[operatingPointer][posTrainingDate] == arrOperatingRecords[comparisonPointer][posTrainingDate] &&
                arrOperatingRecords[operatingPointer][posTrainingType] == arrOperatingRecords[comparisonPointer][posTrainingType]) {
                
                //write the record on removed sheet (next empty)
                var trashPointer = trashSheet.getLastRow()+1;
                trashSheet.getRange(trashPointer, posTrainingID+1).setValue(arrOperatingRecords[comparisonPointer][posTrainingID]);
                trashSheet.getRange(trashPointer, posStudentID+1).setValue(arrOperatingRecords[comparisonPointer][posStudentID]);
                trashSheet.getRange(trashPointer, posFullName+1).setValue(arrOperatingRecords[comparisonPointer][posFullName]);
                trashSheet.getRange(trashPointer, posFirstName+1).setValue(arrOperatingRecords[comparisonPointer][posFirstName]);
                trashSheet.getRange(trashPointer, posLastName+1).setValue(arrOperatingRecords[comparisonPointer][posLastName]);
                trashSheet.getRange(trashPointer, posEmail+1).setValue(arrOperatingRecords[comparisonPointer][posEmail]);
                trashSheet.getRange(trashPointer, posFaculty+1).setValue(arrOperatingRecords[comparisonPointer][posFaculty]);
                trashSheet.getRange(trashPointer, posProgram+1).setValue(arrOperatingRecords[comparisonPointer][posProgram]);
                trashSheet.getRange(trashPointer, posTrainingType+1).setValue(arrOperatingRecords[comparisonPointer][posTrainingType]);
                trashSheet.getRange(trashPointer, posTrainingDate+1).setValue(arrOperatingRecords[comparisonPointer][posTrainingDate]);
                trashSheet.getRange(trashPointer, posInstructor+1).setValue(arrOperatingRecords[comparisonPointer][posInstructor]);
                trashSheet.getRange(trashPointer, posCourse+1).setValue(arrOperatingRecords[comparisonPointer][posCourse]);
                trashSheet.getRange(trashPointer, posSection+1).setValue(arrOperatingRecords[comparisonPointer][posSection]);
                trashSheet.getRange(trashPointer, posWorkshop+1).setValue(arrOperatingRecords[comparisonPointer][posWorkshop]);
                trashSheet.getRange(trashPointer, posWorkstation+1).setValue(arrOperatingRecords[comparisonPointer][posWorkstation]);
                trashSheet.getRange(trashPointer, posRemarks+1).setValue(arrOperatingRecords[comparisonPointer][posRemarks]);
                trashSheet.getRange(trashPointer, posDuplicate+1).setValue(arrOperatingRecords[comparisonPointer][posDuplicate]);

                //get the row number from array position (+2 because 1st for header 2nd for array)
                operatingSheet.deleteRow(comparisonPointer+2);

                //delete the row with the records on array (mind: when a row is deleted the target should decrement by one)
                arrOperatingRecords.splice(comparisonPointer,1);
                lastRecord--;
            }
        }
    }
}