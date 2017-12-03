'use strict'

let simdef = require('./simpledefer.js')

let globalCollection = {}

function get(id, collection){
	if(!collection[id]) collection[id] = simdef.defer()
	return collection[id]
}

function getPromise(id, collection){
	if(typeof id === 'string') return get(id, collection).promise
	else return Promise.all(id.map((item) => get(item, collection).promise))
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
