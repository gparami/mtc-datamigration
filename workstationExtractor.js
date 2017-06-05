/**
 * extractWorkstation
 * extracts the workstation names written inside the "(" and ")" in the date fields on the sheet. This function needs to run after dateFixer().
 * TODO may be integrate this into the dateFixer in the future so it will happen automatically.
 */
function extractWorkstation(){
    "This is (my) simple text".match(/\(([^)]+)\)/)[1] //Regex syntax to extract the string within the brackets
}