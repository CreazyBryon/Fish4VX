
/*
 * vx
 */
var parseString = require('xml2js').parseString;
var util = require('util');

var vxCache={posted:[],xmls:[],logs:[]};

exports.debug = function(req, res){
	 
  res.send(vxCache);
};


exports.index = function(req, res){
	var signature=req.query['signature'];
	var timestamp=req.query['timestamp'];	
	var nonce=req.query['nonce'];	
	var echostr=req.query['echostr'];	

/*	var xml = "<xml>  <ToUserName>toUser</ToUserName>  <FromUserName>fromUser</FromUserName>  <CreateTime>1348831860</CreateTime>  <MsgType>text</MsgType>  <Content>this is a test</Content>  <MsgId>1234567890123456</MsgId>  </xml>"
parseString(xml, function (err, result) {
	if(!result){
		res.send("none");
	}
    res.send(result);
});
	*/
  res.send(echczostr);
};

exports.msg = function(req, res){
	
	vxCache.logs.push({'html':req.is('html'),'xml':req.is('xml'),'json':req.is('json')});
	vxCache.xmls.push(req.body);
	
	var xml = req.body;
parseString(xml, {cdata:true}, function (err, result) {
	
	if(!result){
		res.send("success");
	}else{
		vxCache.xmls.push(result);
		var sender=result.xml.FromUserName[0];
		var meName=result.xml.ToUserName[0];
		var msgType=result.xml.MsgType[0];
		var content=result.xml.Content[0];
	
		var repl=util.format('<xml> <ToUserName>< ![CDATA[%s] ]></ToUserName> <FromUserName>< ![CDATA[%s] ]></FromUserName> <CreateTime>%d</CreateTime> <MsgType>< ![CDATA[text] ]></MsgType> <Content>< ![CDATA[%s] ]></Content> </xml>',sender,meName,Date.now(),content);
		
		res.send(repl);
	}
});
	

};