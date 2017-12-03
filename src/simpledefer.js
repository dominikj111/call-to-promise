'use strict'

function Deferred() {

	let pending = true
	let failed, succeed

	let closeIt = (success) => {
		if(!pending) throw("promise is not pending")
		pending = false
		succeed = success
		failed = !success
	}

	this.isPending = () => pending
	this.isSucceed = () => succeed
	this.isFailed  = () => failed

	this.__pointerTestingProperty

	this.isSameObjectAs = (there) => {

		there.__pointerTestingProperty = 3
		this.__pointerTestingProperty = 4

		return there.__pointerTestingProperty === this.__pointerTestingProperty
	}

	let me = this

	this.promise = new Promise(function(s, f){
		me.resolve = function() { closeIt(true);  s.apply(me, arguments.length > 1 ? {'0':arguments,'length':1} : arguments)} 
		me.reject  = function() { closeIt(false); f.apply(me, arguments.length > 1 ? {'0':arguments,'length':1} : arguments)}
	})
}

module.exports.defer = () => new Deferred()
