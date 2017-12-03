'use strict'

let simdef = require('./simpledefer.js')

let promisesCollection = {}

function get(id){
	if(!promisesCollection[id]) promisesCollection[id] = simdef.defer()
	return promisesCollection[id]
}

exports.id = get

exports.successfn = (id) => get(id).resolve

exports.failfn = (id) => get(id).reject

exports.when = (id) => {
	if(typeof id === 'string') return get(id).promise
	else return Promise.all(id.map((item) => get(item).promise))
} 

