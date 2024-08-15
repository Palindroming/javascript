function weeklyDownloadAndPaste() {
    // Set up the request
    var url = 'https://kind.krx.co.kr/corpgeneral/corpList.do';
    var options = {
      'method': 'post',
      'contentType': 'application/x-www-form-urlencoded',
      'muteHttpExceptions': true
    };
  
    // Make the request
    var response = UrlFetchApp.fetch(url, options);
  
    // Check if the request was successful
    if (response.getResponseCode() == 200) {
      // Get the content as a blob
      var blob = response.getBlob();
  
      // Convert the Excel file to a Google Sheet
      var file = DriveApp.createFile(blob);
      Utilities.sleep(2000); // Add a delay of 2 seconds
  
      // Open the newly created sheet by ID
      var newSpreadsheet = SpreadsheetApp.openById(file.getId());
      var newSheet = newSpreadsheet.getSheets()[0];
      
      // Copy data to the target sheet
      var targetSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      var targetSheet = targetSpreadsheet.getActiveSheet();
      var sourceRange = newSheet.getDataRange();
      var sourceValues = sourceRange.getValues();
      
      targetSheet.clear();  // Clear existing data
      targetSheet.getRange(1, 1, sourceValues.length, sourceValues[0].length).setValues(sourceValues);
      
      // Delete the temporary spreadsheet
      DriveApp.getFileById(file.getId()).setTrashed(true);
      
      Logger.log('Data updated successfully');
    } else {
      Logger.log('Failed to download the file. Response code: ' + response.getResponseCode());
    }
  }
  
  function setWeeklyTrigger() {
    // Delete any existing triggers
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
      if (triggers[i].getHandlerFunction() == "weeklyDownloadAndPaste") {
        ScriptApp.deleteTrigger(triggers[i]);
      }
    }
    
    // Create a new trigger to run every week
    ScriptApp.newTrigger('weeklyDownloadAndPaste')
        .timeBased()
        .everyWeeks(1)
        .create();
  }
