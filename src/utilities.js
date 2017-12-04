'use strict'

function isStringType(value) {
	return typeof value === 'string'	
}

function isArrayLikeOfStrings(value) {
	if(value.length === undefined) return false

	if(typeof value === 'string') return false

	for(var i = 0; i < value.length; i++){
		if(typeof value[i] !== 'string') return false
	}

	return true
}

function isArrayOfStrings(value) {
	return isArrayLikeOfStrings(value) && Boolean(value.map)
}

exports.isString = isStringType
exports.isNotString = (v) => !isStringType(v)

exports.isArrayLikeOfStrings = isArrayLikeOfStrings
exports.isNotArrayLikeOfStrings = (v) => !isArrayLikeOfStrings(v)

exports.isArrayOfStrings = isArrayOfStrings
exports.isNotArrayOfStrings = (v) => !isArrayOfStrings(v)
