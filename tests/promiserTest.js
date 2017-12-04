let expect = require('chai').expect
let promiser = require('../src/promiser.js')

describe('Promiser', () => {

	let vrs = {}

	before(() => {
		vrs.someOpenFunctionSuccess = (num1, num2, text, afterDoneCallback, whenFailCallback) => afterDoneCallback(num1 + num2)
	})

	describe('Basic api tests', () => {
		it('should create a promise by calling id() with specific id', () => {

			vrs.someOpenFunctionSuccess(1, 2, 'a', promiser.id('task-id').resolve)

			let prom1 = promiser.id('task-id')
			expect(prom1.isSameObjectAs(prom1)).to.eql(true)
			expect(prom1.isSameObjectAs(promiser.id('task-id-1'))).to.eql(false)
		})
		it('should throw an exception when ID is as not string value', () => {

			expect(() => promiser.id(4)).to.throw()
			expect(() => promiser.id({})).to.throw()
			expect(() => promiser.id([])).to.throw()
			
			expect(() => promiser.id('abcdef')).to.not.throw()
			expect(() => promiser.id('2')).to.not.throw()

			expect(() => promiser.when('ab')).to.not.throw()
			expect(() => promiser.when(['ab','st'])).to.not.throw()

			expect(() => promiser.when({'0':'a','1':'abc',length:2})).to.throw()
			expect(() => promiser.when(2)).to.throw()
			expect(() => promiser.when({})).to.throw()
		})
	})
	describe('Return promise and normal chaining', () => {
		it('should offer direct when to return a promise for chaining as usual', () => {

			vrs.someOpenFunctionSuccess(
				1, 2, 'ab',
				promiser.successfn('success-task'),
				promiser.failfn('success-task')
			)

			promiser.when('success-task')
				.then(
					(r) => {
						expect(r).to.eql(3)
						return 2 * 3
					},
					(r) => { throw("this promise not failing") }
				)
				.then(
					(r) => {
						expect(r).to.eql(6)
						throw("throwing to later catch")
					},
					(r) => { throw("this promise not failing") }
				)
				.then(
					(r) => { throw("this promise not succeed") },
					(r) => { }
				)
		})

		it('should offer multiple when - async', () => {
			
			promiser.when(['t.2','t.1']).then((a) => expect(a).to.eql([8,7]))
			promiser.when('t.1').then((a) => expect(a).to.eql(7))
			promiser.when(['t.1']).then((a) => expect(a).to.eql([7]))
			promiser.when(['t.1','t.3','t.4','t.4']).then((a) => expect(a).to.eql([7,9,12,12]))

			vrs.someOpenFunctionSuccess(1, 6, 1, promiser.successfn('t.1'), promiser.failfn('t.1'))
			vrs.someOpenFunctionSuccess(2, 6, 2, promiser.successfn('t.2'), promiser.failfn('t.2'))
			vrs.someOpenFunctionSuccess(3, 6, 3, promiser.successfn('t.3'), promiser.failfn('t.3'))
			vrs.someOpenFunctionSuccess(6, 6, 4, promiser.successfn('t.4'), promiser.failfn('t.4'))
		})

		it('should offer multiple when - one by one', () => {
			
			vrs.someOpenFunctionSuccess(11, 62, 1, promiser.successfn('w.1'))
			
			let n = 1

			promiser.when('w.1').then(
				() => {
					vrs.someOpenFunctionSuccess(11, 62, 1, promiser.successfn('w.2'))
					expect(n++).to.eql(1)
				}
			)

			promiser.when('w.3').then(
				() => {
					vrs.someOpenFunctionSuccess(11, 62, 1, promiser.successfn('w.4'))
					expect(n++).to.eql(3)
				}
			)

			promiser.when('w.2').then(
				() => {
					vrs.someOpenFunctionSuccess(11, 62, 1, promiser.successfn('w.3'))
					expect(n++).to.eql(2)
				}
			)
		})

		it('should throws an exception when resolve or reject is called more then once', () => {

			promiser.successfn('ex-test')()
			expect(promiser.successfn('ex-test')).to.throw()

			promiser.failfn('ex-test-2')()
			expect(promiser.failfn('ex-test-2')).to.throw()

			// prevent to appear an error message ('UnhandledPromiseRejectionWarning')
			promiser.when('ex-test-2').then(() => {}, () => {})
		})
	})
	describe('Using promiser as a local object', () => {
		it('should pass when two promisers created and two promises with same id resolved', () => {

			let promiser2 = require('../src/promiser.js').build()

			promiser.when('dupl-id').then((r) => { expect(r).to.eql(1) })
			promiser2.when('dupl-id').then((r) => { expect(r).to.eql(2) })

			promiser.successfn('dupl-id')(1)
			promiser2.successfn('dupl-id')(2)
		})
	})
})
