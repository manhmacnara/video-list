const CLIENT_ID = '986855680882-jve5j45r62g9plomcji96k1qjdch5anf.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAGAuV2DUenVHSuvYF17jtJX-PJoocO9q4';  // Thay thế bằng API Key của bạn
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";  // Quyền truy cập đọc Google Sheets

// Khởi tạo Google API Client và xác thực người dùng
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

// Khởi tạo client của Google API
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function() {
    console.log("Google API Client Initialized");

    // Kiểm tra người dùng đã đăng nhập chưa
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      getSheetData();  // Nếu đã đăng nhập, lấy dữ liệu từ Google Sheets
    } else {
      // Nếu chưa đăng nhập, yêu cầu đăng nhập
      gapi.auth2.getAuthInstance().signIn().then(function() {
        getSheetData();  // Sau khi đăng nhập, lấy dữ liệu
      });
    }
  });
}

// Lấy dữ liệu từ Google Sheets API
function getSheetData() {
  const spreadsheetId = 'YOUR_SPREADSHEET_ID';  // ID của Google Sheets
  const range = 'Sheet1!A1:D10';  // Phạm vi dữ liệu bạn muốn lấy

  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: range,
  }).then(function(response) {
    console.log('Dữ liệu từ Google Sheets:', response.result.values);
  }, function(response) {
    console.log('Lỗi khi lấy dữ liệu:', response.result.error);
  });
}

// Gọi hàm để bắt đầu xác thực và lấy dữ liệu khi người dùng truy cập trang
handleClientLoad();
