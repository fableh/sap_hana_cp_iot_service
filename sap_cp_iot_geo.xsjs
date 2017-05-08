var LATITUDE = $.request.parameters.get('lat');
var LONGITUDE = $.request.parameters.get('lon');
var sensoren = [];
var conn = $.db.getConnection();


var query = 'SELECT "DEVICEID", "DEVICENAME", "LATITUDE", "LONGITUDE" FROM "FABIAN"."development.iot::sap_cp_iot_sensordata.iotDataDevice" AS "Sensor"'; 
  
  

var stmt = conn.prepareStatement(query);
var resultSet = stmt.executeQuery();
while (resultSet.next()) {
  sensoren.push({
    "DEVICEID": resultSet.getInteger(1),
    "DEVICENAME": resultSet.getString(2),
    "LATITUDE": resultSet.getDouble(3),
    "LONGITUDE": resultSet.getDouble(4)
  });
}
resultSet.close();
stmt.close();
conn.close();
$.response.contentType = 'application/json; charset=UTF-8';
$.response.setBody(JSON.stringify({
  "Sensoren": sensoren
}));
$.response.status = $.net.http.OK;