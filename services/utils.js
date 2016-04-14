var validate = function(req){
  console.log('validateRequest');
  var result = {'valid': true};
  //check if valid ObjectId, proceed to findByID
  if (req.params.id && !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {    
    console.log('Invalid ObjectId');
    result.valid = false;
    result.error = 'Invalid ObjectId';
  }
  return result;
}

module.exports = {
  validate: validate
}