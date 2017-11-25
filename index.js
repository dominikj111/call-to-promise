exports.promiser = {}

exports.promiser.factory = function(){

	let promises = {}, requestedqueue = {}

	let getPromisesFor = function(deps){
		return deps.map(item => item.trim())
				   .map(item => {
						if(Boolean(promises[item])) return promises[item].prom
						return createRequestedPromise(item)
				   })
	}

	let createRequestedPromise = function(_id){

		if(Boolean(requestedqueue[_id])) return requestedqueue[_id].prom

		let _solve, _prom = new Promise(s => _solve = s)

		requestedqueue[_id] = { 
			prom: _prom,
			solve: _solve
		}

		return _prom
	}

	let registerPromise = function(_id, _deps){

		if(Boolean(promises[_id])) throw("Promise with id ".concat(_id).concat(" is already registered"))

		let _solve, _prom, _cbSolve, _cbProm = new Promise(s => _cbSolve = s)

		if(Boolean(requestedqueue[_id])) { 
			_solve = requestedqueue[_id].solve
			_prom = requestedqueue[_id].prom

			delete requestedqueue[_id]
		} else {
			_prom = new Promise(s => _solve = s) 
		}

		promises[_id] = { prom: _prom }

		Promise.all(getPromisesFor(Boolean(_deps) ? _deps : []).concat([_cbProm])).then(_solve)

		return _cbSolve
	}

	return {
		getcb: registerPromise,
		when: _id => {
			if(Boolean(promises[_id])) return promises[_id].prom
			return createRequestedPromise(_id)
		},
		isRegistered: _id => Boolean(promises[_id])
	}
}

exports.promiser.global = exports.promiser.factory()

