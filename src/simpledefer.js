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

	this.promise = new Promise((s, f) => {
		this.resolve = function() { closeIt(true); s.apply(this, arguments) } 
		this.reject  = function() { closeIt(false); f.apply(this, arguments) }
	})
}

module.exports.defer = () => new Deferred()
