// sample proof of concept that regex works
// let emailAt = '@'
// let isEmail = new RegExp(`${emailAt}`)
// console.log('ss@ss'.match(isEmail))

const sp = new Specify('test', 'test_form')
sp.checkButton.addEventListener("click", sp.checkRules)
sp.checkButton.rexs.push(1)
sp.checkButton.rexs.push(2)
sp.addRules({ type: "missing", value: "@", errorMessage: "Missing @", warningColor: "Aqua" })
sp.addRules({ type: "lengthAtLeast", value: 7, errorMessage: "length is not 9", warningColor: "yellow" })
sp.addRules({ type: "other", value: '[0-9]', errorMessage: "Must include a number", warningColor: "Aqua" })

// sp.checkButton.onclick(sp.check())
