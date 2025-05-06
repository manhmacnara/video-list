// Chạy khi trang được tải
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: 'AIzaSyAGAuV2DUenVHSuvYF17jtJX-PJoocO9q4',  // Thay thế bằng API Key của bạn
    clientId: '86855680882-jve5j45r62g9plomcji96k1qjdch5anf.apps.googleusercontent.com',  // Thay thế bằng Client ID của bạn
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    scope: "https://www.googleapis.com/auth/spreadsheets.readonly"
  }).then(function() {
    console.log("Google API Client Initialized");

    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      getSheetData();
    } else {
      gapi.auth2.getAuthInstance().signIn().then(function() {
        getSheetData();
      });
    }
  });
}

function getSheetData() {
  const spreadsheetId = '1_BG1s7pS5KXRUdAITkANt5YcdDnAwrvWMyE6SU2kWGw';  // Thay thế bằng Spreadsheet ID của bạn
  const range = 'Sheet1!A1:D10';

  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: range,
  }).then(function(response) {
    const result = response.result.values;
    console.log('Dữ liệu từ Google Sheets:', result);
    document.getElementById('result').innerHTML = JSON.stringify(result);
  }, function(response) {
    console.log('Lỗi khi lấy dữ liệu:', response.result.error);
  });
}
