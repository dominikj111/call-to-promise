'use strict'

let simdef = require('./simpledefer.js')
let uti = require('./utilities.js')

let globalCollection = {}

function get(id, collection){
	if(uti.isNotString(id)) throw("ID has to be 'string' only")
	if(!collection[id]) collection[id] = simdef.defer()
	return collection[id]
}

function getPromise(id, collection){

	if(uti.isString(id)) return get(id, collection).promise
	
	if(uti.isArrayOfStrings(id)) return Promise.all(id.map((item) => get(item, collection).promise))
	
	throw("getPromise expecting id(string) or id(array<string>)")
}

exports.id = (id) => get(id, globalCollection)
exports.successfn = (id) => get(id, globalCollection).resolve
exports.failfn = (id) => get(id, globalCollection).reject
exports.when = (id) => getPromise(id, globalCollection)

exports.build = function(){
	
	let localCollection = {}

	return {
		id: (id) => get(id, localCollection),
		successfn: (id) => get(id, localCollection).resolve,
		failfn: (id) => get(id, localCollection).reject,
		when: (id) => getPromise(id, localCollection)
	}
}
