export const validateRequest = (requiredFields = [], field = '', sendResponse) => (req, res, next) =>  {
  if (requiredFields && field){
    const foundFields = Object.keys(req[field]);
    if (requiredFields.every(f => foundFields.includes(f))) return next();
  }
  sendResponse({ res })('', `Invalid requisition, one of the following might be missing: ${requiredFields}`, 403);
}