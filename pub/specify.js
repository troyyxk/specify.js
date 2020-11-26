
function Specify(targetId, parentId) {
    this.targetId = targetId
    this.parentId = parentId
    this.target = document.getElementById(targetId);
    cur_target = document.getElementById(targetId);
    this.parent = document.getElementById(parentId);

    // warning label above
    this.warningLabelAbove = document.createElement('div');
    this.warningLabelAbove.className = 'specify'
    this.warningLabelAbove.id = 'warningLabelAbove'
    // this.warningLabelAbove.style = 'background-color: Aqua;';

    // warning label above
    this.warningLabelBelow = document.createElement('div');
    this.warningLabelBelow.className = 'specify'
    this.warningLabelBelow.id = 'warningLabelBelow'

    // check button
    this.checkButton = document.createElement('button');
    this.checkButton.className = 'specify'
    this.checkButton.id = 'checkButton'
    let buttonText = document.createTextNode("check");
    this.checkButton.appendChild(buttonText);
    this.checkButton.rexs = []
    // this.checkButton.addEventListener("click", { this.warningLabelAbove.style.display = true; });

    this.parent.insertBefore(this.checkButton, this.target.nextSibling)
    this.parent.insertBefore(this.warningLabelAbove, this.target)
    this.parent.appendChild(this.warningLabelBelow)

    $('#' + this.parentId).width($('#' + this.targetId).width() * 2)
    $('#' + this.parentId).css("border-radius", "10px")

    // force them to have the same width
    // $('#warningLabelAbove').width($('#' + this.targetId).width() * 1.5)
    $('#' + this.warningLabelAbove.id).hide()
}

Specify.prototype = {
    checkRules: async function () {
        let allRulesPass = true
        let input = $('#' + this.id).prev().val()
        violatedRule = null
        for (rule of this.rexs) {
            // console.log(rule)
            violatedRule = rule
            switch (rule.type) {
                case 'missing-front':
                    if (input.startsWith(rule.value)) { continue; }
                    console.log("Violate rule of type: missing-front")
                    allRulesPass = false
                    break
                case 'missing-back':
                    if (input.endsWith(rule.value)) { continue; }
                    console.log("Violate rule of type: missing-back")
                    allRulesPass = false
                    break
                case 'missing':
                    if (input.includes(rule.value)) { continue; }
                    console.log("Violate rule of type: missing")
                    allRulesPass = false
                    break
                case 'lengthAtLeast':
                    if (input.length >= rule.value) { continue; }
                    console.log("Violate rule of type: lengthAtLeast")
                    allRulesPass = false
                    break
                case 'lengthAtMost':
                    if (input.length <= rule.value) { continue; }
                    console.log("Violate rule of type: lengthAtMost")
                    allRulesPass = false
                    break
                case 'lengthAsRequired':
                    if (input.length <= rule.value) { continue; }
                    console.log("Violate rule of type: lengthAsRequired")
                    allRulesPass = false
                    break
                case 'other':
                    let cur_regex = new RegExp(rule.value)
                    if (input.match(cur_regex)) { continue; }
                    console.log("Violate rule of type: other")
                    allRulesPass = false
                    break
            }
            if (!allRulesPass) break
        }

        // common to all, no matter pass or not pass
        $('#' + this.id).parent().css('background-image', "linear-gradient(to bottom right, red, yellow)")
        $('#' + this.id).next().text(".")  // set the warning label below to not visible
        $('#' + this.id).next().css("opacity", "0")


        // all rules pass
        if (allRulesPass) {
            let cur_time = 2000;

            // match aimation
            $('#' + this.id).parent().css('background-image', "")
            $('#' + this.id).parent().css('animation', "match 4s")

            console.log("All rules passed")
            $('#' + this.id).prev().prev().text("All rules passed")
            $('#warningLabelAbove').show()

            cur_time += 1000
            window.setTimeout(() => {
                $('#' + this.id).parent().removeAttr("style")
                $('.' + this.className).remove();
            }, cur_time);
            return
        }

        // not all cases passed, common to all rules
        warningLabelAboveColor = violatedRule.warningColor ? violatedRule.warningColor : 'red';
        $('#' + this.id).prev().prev().text(violatedRule.errorMessage)

        // animation
        if (violatedRule.animation === "rotate-c") {  // rotate-cc
            $('#' + this.id).parent().css('animation', "rotate-c 4s")
            $('#' + this.id).parent().css('animation-iteration-count', "1")
            window.setTimeout(() => {
                $('#' + this.id).parent().css('animation', "")
                $('#' + this.id).parent().css('animation-iteration-count', "")
            }, 4000);
        } else if (violatedRule.animation === "rotate-cc") {  // rotate-cc
            $('#' + this.id).parent().css('animation', "rotate-cc 4s")
            $('#' + this.id).parent().css('animation-iteration-count', "1")
            window.setTimeout(() => {
                $('#' + this.id).parent().css('animation', "")
                $('#' + this.id).parent().css('animation-iteration-count', "")
            }, 4000);
        } else if (violatedRule.animation === "shake") {  // shake
            $('#' + this.id).parent().css('animation', "shake 0.5s")
            $('#' + this.id).parent().css('animation-iteration-count', "1")
            window.setTimeout(() => {
                $('#' + this.id).parent().css('animation', "")
                $('#' + this.id).parent().css('animation-iteration-count', "")
            }, 1000);
        }
        else if (violatedRule.animation === "warning-colorChange") {  // warning-colorChange
            console.log("Animation: warning-colorChange")
            $('#' + this.id).parent().css('background-image', "")
            $('#' + this.id).parent().css('animation', "warning-colorChange 5s")
            window.setTimeout(() => {
                $('#' + this.id).parent().css('animation', "")
                $('#' + this.id).parent().css('animation-iteration-count', "")
                $('#' + this.id).parent().css('background-image', "linear-gradient(to bottom right, red, yellow)")
            }, 5000);
        }

        // buildin rules' animations:
        if (violatedRule.type == "missing-front") {
            let cur_time = 0
            window.setTimeout(() => {
                $('#' + this.id).next().css('opacity', "100")
                $('#' + this.id).next().text("Somthing is missing at the front, eh?")
            }, cur_time);
            cur_time += 3000
            window.setTimeout(() => {
                if (!input.replace(/\s/g, '').length) {  // if empty or only spaces and tabs
                    input = "BLABLABLA"
                }
                $('#' + this.id).next().text("Your input: " + input)
            }, cur_time);
            cur_time += 1000
            window.setTimeout(() => {
                let requiredSpaces = "_".repeat(violatedRule.value.length)
                $('#' + this.id).next().text("Change to: " + requiredSpaces + input)
            }, cur_time);
            cur_time += 1000
            window.setTimeout(() => {
                $('#' + this.id).next().text("Change to: " + violatedRule.value + input)
            }, cur_time);
            cur_time += 1000
        } else if (violatedRule.type == "missing-back") {
            let cur_time = 0
            window.setTimeout(() => {
                $('#' + this.id).next().css('opacity', "100")
                $('#' + this.id).next().text("Somthing is missing at the end, eh?")
            }, cur_time);
            cur_time += 3000
            window.setTimeout(() => {
                if (!input.replace(/\s/g, '').length) {  // if empty or only spaces and tabs
                    input = "BLABLABLA"
                }
                $('#' + this.id).next().text("Your input: " + input)
            }, cur_time);
            cur_time += 1000
            window.setTimeout(() => {
                let requiredSpaces = "_".repeat(violatedRule.value.length)
                $('#' + this.id).next().text("Change to: " + input + requiredSpaces)
            }, cur_time);
            cur_time += 1000
            window.setTimeout(() => {
                $('#' + this.id).next().text("Change to: " + input + violatedRule.value)
            }, cur_time);
            cur_time += 1000
        } else if (violatedRule.type == "missing") {
            let cur_time = 0
            window.setTimeout(() => {
                $('#' + this.id).next().css('opacity', "100")
                $('#' + this.id).next().text("Somthing is missing, eh?")
            }, cur_time);
            cur_time += 3000
            window.setTimeout(() => {
                // if (!input.replace(/\s/g, '').length) {  // if empty or only spaces and tabs
                input = "BLABLABLA"
                // }
                $('#' + this.id).next().text("Your input: " + input)
            }, cur_time);
            cur_time += 1000
            window.setTimeout(() => {
                let requiredSpaces = "_".repeat(violatedRule.value.length)
                $('#' + this.id).next().text("Change to: " + input.slice(0, 3) + requiredSpaces + input.slice(3))
            }, cur_time);
            cur_time += 1000
            window.setTimeout(() => {
                $('#' + this.id).next().text("Change to: " + input.slice(0, 3) + violatedRule.value + input.slice(3))
            }, cur_time);
            cur_time += 1000
        }


        $('#warningLabelAbove').show()
        // this.rexs.push(1)
    },

    addRules: function (rule) {
        if (!['missing-front', 'missing-back', 'missing', 'lengthAtLeast', 'lengthAtMost', 'other'].includes(rule.type)) {
            console.log("Rule type must be one of 'missing-front', 'missing', 'lengthAtLeast' or 'other'")
            return
        }
        if (rule.type === 'lengthAtLeast' && !Number.isInteger(rule.value)) {
            console.log("Length must be an integer")
            return
        }
        this.checkButton.rexs.push(rule)
    },

    clearRules: function () {
        this.checkButton.rexs = []
    }

}
