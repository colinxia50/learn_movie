var mongoose = require('mongoose')

var MovieSchema = new mongoose.Schema({
	doctor:String,
	title:String,
	country:String,
	summary:String,
	flash:String,
	poster: String,
	year: Number,
	meta: {
	 createAt: {
	  type: Data,
	  default: Date.now()},
	 updateAt£º{
	  type:Date,
	  default:Date.now()}
	}
})

MovieSchema.pre('save',function(nect){
	if (this.isNew){
		this.meta.createAt = this.mata.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	next()
})
MovieSchema.statics = {
	fetch:function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		exec(cb)
	},
	findById: function(id,cb){
		return this
		.findOne({_id:id})
		exec(cb)
	}
}
module.exports = MovieSchema