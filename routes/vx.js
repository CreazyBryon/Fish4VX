
/*
 * vx
 */

exports.index = function(req, res){
	var signature=req.query['signature'];
	var timestamp=req.query['timestamp'];	
	var nonce=req.query['nonce'];	
	var echostr=req.query['echostr'];	

	
  res.send(echostr);
};

exports.msg = function(req, res){
  res.send("respond with a resource");
};