/*
 * Logs to the console debug messages in case DEBUG env var exists
 * @param: text - message to be logged
 */
export const debug = (text) => {
  if (process.env.debug) console.log(text);
}

/*
 * Generic response sent to the front from most API calls
 * @param: res - server res to send response
 * @param: item - success call response
 * @param: error - failed call response
 * @param: status - call status
 */
export const sendResponse = ({ res }) => (item, error, status = 200) => {
  if(!status && error) status = 500;
  res.json({
    status,
    item,
    error
  })
}

/*
 * Takes in an array of required fields and compares them to received fields
 * @param: requiredFields - list of required fields
 * @param: field - which fild from req is going to be used (body, query, params)
 * @param: sendResponse - function to send response to front end
 * @param: req/res/next - used to control API flow and access sent fields data
 */
export const validateRequest = (requiredFields = [], field = '', sendResponse) => (req, res, next) =>  {
  if (requiredFields && field){
    const foundFields = Object.keys(req[field]);
    if (requiredFields.every(f => foundFields.includes(f))) return next();
  }
  sendResponse({ res })('', `Invalid requisition, one of the following might be missing: ${requiredFields}`, 403);
}