// sample proof of concept that regex works
// let emailAt = '@'
// let isEmail = new RegExp(`${emailAt}`)
// console.log('ss@ss'.match(isEmail))

const sp = new Specify('test', 'test_form')
sp.checkButton.addEventListener("click", sp.checkRules)
sp.addRules({ type: "missing-front", value: "UofT_", errorMessage: "Start with UofT_", warningColor: "Aqua", animation: "shake" })
sp.addRules({ type: "lengthAtLeast", value: 9, errorMessage: "length should be at least 9", warningColor: "yellow", animation: "shake" })
sp.addRules({ type: "missing-back", value: "@gaming", errorMessage: "End with @gaming", warningColor: "Aqua", animation: "warning-colorChange" })
sp.addRules({ type: "missing", value: "cur", errorMessage: "Missing cur", warningColor: "Aqua", animation: "rotate-cc" })
sp.addRules({ type: "other", value: '[0-9]', errorMessage: "Must include a number", warningColor: "Aqua", animation: "rotate-c" })
sp.addRules({ type: "lengthAtMost", value: 30, errorMessage: "length should be at most 30", warningColor: "yellow" })

// sp.checkButton.onclick(sp.check())
