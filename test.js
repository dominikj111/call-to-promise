let expect = require('chai').expect
let pFactory = require('./index.js').promiser.factory

describe('', () => {

	let vars = {}

	before(() => { 
		vars.promiser = pFactory()
		vars.simpleTaskToFail = (arg1, arg2, argtopass, successCB, failCB) => { failCB(argtopass) }
		vars.simpleTaskToSuccess = (arg1, arg2, argtopass, successCB, failCB) => { successCB(argtopass) }
	})

	after(() => { })

	beforeEach(() => { })

	afterEach(() => { })


	// doSomeTask(5000, promiser.getcb('a'))
// promiser.when('a').then(() => console.log('a'))

// doSomeTask(2000, promiser.getcb('b',['a']))
// promiser.when('b').then(() => console.log('b <- a'))


	describe('Simple wrap', () => {
		it('should success', () => {

			vars.simpleTaskToSuccess(
				1, 2, 'shouldToPass', 
				vars.promiser.getcb('successback-task-id'), 
				vars.promiser.getcb('failback-task-id')
			)

			vars.promiser.when('successback-task-id').then((e) => { expect(e[0]).to.equal('shouldToPass') })
		})
	})
})