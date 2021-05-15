const errorResponse = (statusMessage, responseCode, dataResponse) => {
  const response = h.response({
    status: statusMessage,
    dataResponse,
  });
  response.code(responseCode);
  return response;
};
const noData = [{
  'id': 'no data',
  'name': 'no data',
  'publisher': 'no data',
}];
module.exports={errorResponse, noData};
