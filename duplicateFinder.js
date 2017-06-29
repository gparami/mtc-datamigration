/**
 * duplicateFinder
 * finds possible duplicates and flags records for review.
 */
function duplicateFinder() {

    //Variables for the database connection
    var activeSS = SpreadsheetApp.getActiveSpreadsheet();
    var operatingSheet = activeSS.getSheetByName("JS_ONE_SHEET_TO_RULE_THEM_ALL");

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
        for (var comparisonPointer = 1; comparisonPointer < lastRecord; comparisonPointer++) {
            
            //if duplicate found
            if (arrOperatingRecords[operatingPointer][StudentID] == arrOperatingRecords[comparisonPointer][StudentID] &&
                arrOperatingRecords[operatingPointer][FirstName] == arrOperatingRecords[comparisonPointer][FirstName] &&
                arrOperatingRecords[operatingPointer][LastName] == arrOperatingRecords[comparisonPointer][LastName]   &&
                arrOperatingRecords[operatingPointer][TrainingDate] == arrOperatingRecords[comparisonPointer][TrainingDate] &&
                arrOperatingRecords[operatingPointer][TrainingType] == arrOperatingRecords[comparisonPointer][TrainingType]) {
                
                //write the record on removed sheet (next empty)
                trashWriter(arrOperatingRecords[comparisonPointer][TrainingID],
                            arrOperatingRecords[comparisonPointer][StudentID],
                            arrOperatingRecords[comparisonPointer][FullName],
                            arrOperatingRecords[comparisonPointer][FirstName],
                            arrOperatingRecords[comparisonPointer][LastName],
                            arrOperatingRecords[comparisonPointer][Email],
                            arrOperatingRecords[comparisonPointer][Faculty],
                            arrOperatingRecords[comparisonPointer][Program],
                            arrOperatingRecords[comparisonPointer][TrainingType],
                            arrOperatingRecords[comparisonPointer][TrainingDate],
                            arrOperatingRecords[comparisonPointer][Instructor],
                            arrOperatingRecords[comparisonPointer][Course],
                            arrOperatingRecords[comparisonPointer][Section],
                            arrOperatingRecords[comparisonPointer][Workshop],
                            arrOperatingRecords[comparisonPointer][Workstation],
                            arrOperatingRecords[comparisonPointer][Remarks],
                            arrOperatingRecords[comparisonPointer][Duplicate]);

                //get the row number from array position (+2 because 1st for header 2nd for array)
                operatingSheet.deleteRow(comparisonPointer+2);

                //delete the row with the records on array (mind: when a row is deleted the target should decrement by one)
                arrOperatingRecords[].splice(comparisonPointer,1);
                lastRecord--;
            }
        }
    }
}
/**
 * trashWriter
 * writes records into removed records sheet
 */
function trashWriter(TrainingID, StudentID, FullName, FirstName, LastName, Email, Faculty, Program, TrainingType, TrainingDate, Instructor, Course, Section, Workshop, Workstation, Remarks, Duplicate){
    
    var activeSS = SpreadsheetApp.getActiveSpreadsheet(),
        trashSheet = activeSS.getSheetByName("REMOVED_RECORDS"),
        trashPointer = trashSheet.getLastRow()+1,
        trashTrainingID = 0,
        trashStudentID = 1,
        trashFullName = 2,
        trashFirstName = 3,
        trashLastName = 4,
        trashEmail = 5,
        trashFaculty = 6,
        trashProgram = 7,
        trashTrainingType = 8,
        trashTrainingDate = 9,
        trashInstructor = 10,
        trashCourse = 11,
        trashSection = 12,
        trashWorkshop = 13,
        trashWorkstation = 14,
        trashRemarks =  15,
        trashDuplicate = 16;
    
    trashSheet.getRange(trashPointer, trashTrainingID).setValue(TrainingID);
    trashSheet.getRange(trashPointer, trashStudentID).setValue(StudentID);
    trashSheet.getRange(trashPointer, trashFullName).setValue(FullName);
    trashSheet.getRange(trashPointer, trashFirstName).setValue(FirstName);
    trashSheet.getRange(trashPointer, trashLastName).setValue(LastName);
    trashSheet.getRange(trashPointer, trashEmail).setValue(Email);
    trashSheet.getRange(trashPointer, trashFaculty).setValue(Faculty);
    trashSheet.getRange(trashPointer, trashProgram).setValue(Program);
    trashSheet.getRange(trashPointer, trashTrainingType).setValue(TrainingType);
    trashSheet.getRange(trashPointer, trashTrainingDate).setValue(TrainingDate);
    trashSheet.getRange(trashPointer, trashInstructor).setValue(Instructor);
    trashSheet.getRange(trashPointer, trashCourse).setValue(Course);
    trashSheet.getRange(trashPointer, trashSection).setValue(Section);
    trashSheet.getRange(trashPointer, trashWorkshop).setValue(Workshop);
    trashSheet.getRange(trashPointer, trashWorkstation).setValue(Workstation);
    trashSheet.getRange(trashPointer, trashRemarks).setValue(Remarks);
    trashSheet.getRange(trashPointer, trashDuplicate).setValue(Duplicate);
}