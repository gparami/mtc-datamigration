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
    var TrainingID = 0,
        StudentID = 1,
        FullName = 2,
        FirstName = 3,
        LastName = 4,
        Email = 5,
        Faculty = 6,
        Program = 7,
        TrainingType = 8,
        TrainingDate = 9,
        Instructor = 10,
        Course = 11,
        Section = 12,
        Workshop = 13,
        Workstation = 14,
        Remarks =  15,
        Duplicate = 16;

    //Variables for looping
    var lastRecord = arrOperatingRecords.length;

    //loop: Get current record
    for (var operatingPointer = 0; operatingPointer < lastRecord; operatingPointer++) {

        //loop through to find a duplicate
        for (var comparisonPointer = operatingPointer + 1 ; comparisonPointer < lastRecord; comparisonPointer++) {
            
            //if duplicate found
            if (arrOperatingRecords[operatingPointer][StudentID] == arrOperatingRecords[comparisonPointer][StudentID] &&
                arrOperatingRecords[operatingPointer][FirstName] == arrOperatingRecords[comparisonPointer][FirstName] &&
                arrOperatingRecords[operatingPointer][LastName] == arrOperatingRecords[comparisonPointer][LastName]   &&
                arrOperatingRecords[operatingPointer][TrainingDate] == arrOperatingRecords[comparisonPointer][TrainingDate] &&
                arrOperatingRecords[operatingPointer][TrainingType] == arrOperatingRecords[comparisonPointer][TrainingType]) {
                
                //write the record on removed sheet (next empty)
                var trashPointer = trashSheet.getLastRow()+1;
                trashSheet.getRange(trashPointer, TrainingID+1).setValue(arrOperatingRecords[comparisonPointer][TrainingID]);
                trashSheet.getRange(trashPointer, StudentID+1).setValue(arrOperatingRecords[comparisonPointer][StudentID]);
                trashSheet.getRange(trashPointer, FullName+1).setValue(arrOperatingRecords[comparisonPointer][FullName]);
                trashSheet.getRange(trashPointer, FirstName+1).setValue(arrOperatingRecords[comparisonPointer][FirstName]);
                trashSheet.getRange(trashPointer, LastName+1).setValue(arrOperatingRecords[comparisonPointer][LastName]);
                trashSheet.getRange(trashPointer, Email+1).setValue(arrOperatingRecords[comparisonPointer][Email]);
                trashSheet.getRange(trashPointer, Faculty+1).setValue(arrOperatingRecords[comparisonPointer][Faculty]);
                trashSheet.getRange(trashPointer, Program+1).setValue(arrOperatingRecords[comparisonPointer][Program]);
                trashSheet.getRange(trashPointer, TrainingType+1).setValue(arrOperatingRecords[comparisonPointer][TrainingType]);
                trashSheet.getRange(trashPointer, TrainingDate+1).setValue(arrOperatingRecords[comparisonPointer][TrainingDate]);
                trashSheet.getRange(trashPointer, Instructor+1).setValue(arrOperatingRecords[comparisonPointer][Instructor]);
                trashSheet.getRange(trashPointer, Course+1).setValue(arrOperatingRecords[comparisonPointer][Course]);
                trashSheet.getRange(trashPointer, Section+1).setValue(arrOperatingRecords[comparisonPointer][Section]);
                trashSheet.getRange(trashPointer, Workshop+1).setValue(arrOperatingRecords[comparisonPointer][Workshop]);
                trashSheet.getRange(trashPointer, Workstation+1).setValue(arrOperatingRecords[comparisonPointer][Workstation]);
                trashSheet.getRange(trashPointer, Remarks+1).setValue(arrOperatingRecords[comparisonPointer][Remarks]);
                trashSheet.getRange(trashPointer, Duplicate+1).setValue(arrOperatingRecords[comparisonPointer][Duplicate]);

                //get the row number from array position (+2 because 1st for header 2nd for array)
                operatingSheet.deleteRow(comparisonPointer+2);

                //delete the row with the records on array (mind: when a row is deleted the target should decrement by one)
                arrOperatingRecords.splice(comparisonPointer,1);
                lastRecord--;
            }
        }
    }
}