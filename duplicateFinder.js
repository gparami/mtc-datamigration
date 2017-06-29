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
    var operatingPointer,
        TrainingID = 0,
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

    //Variables for the record comparison
    var comparisonPointer,

    //Variables for looping
    var opCounter,
        coCounter,
        opLimit,
        coLimit;

    //loop: Get current record
    for (opCounter = 0; opCounter <= opLimit; opLimit++) {

        //loop through to find a duplicate
        for (coCounter = 0; coCounter <= coLimit; coLimit++) {
            
            //if duplicate found
            if (arrOperatingRecords[opCounter][StudentID] == arrOperatingRecords[coCounter][StudentID] &&
                arrOperatingRecords[opCounter][FirstName] == arrOperatingRecords[coCounter][FirstName] &&
                arrOperatingRecords[opCounter][LastName] == arrOperatingRecords[coCounter][LastName]   &&
                arrOperatingRecords[opCounter][TrainingDate] == arrOperatingRecords[coCounter][TrainingDate] &&
                arrOperatingRecords[opCounter][TrainingType] == arrOperatingRecords[coCounter][TrainingType]) {
                
                //write the record on removed sheet (next empty)
                trashPointer = trashSheet.getLastRow()+1;
            

                //get the row number from array position (+1)

                

                //delete the row with the records (mind: when a row is deleted the target should decrement by one)
                arrOperatingRecords.splice(comparisonPointer,1);
            }
        }
            

        //set next record as current record

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