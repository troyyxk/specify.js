
function Specify(targetId, parentId) {
    this.targetId = targetId
    this.parentId = parentId
    this.target = document.getElementById(targetId);
    cur_target = document.getElementById(targetId);
    this.parent = document.getElementById(parentId);

    // warning label above
    this.warningLabel = document.createElement('div');
    this.warningLabel.className = 'specify'
    this.warningLabel.id = 'warningLabel'
    // this.warningLabel.style = 'background-color: Aqua;';

    // check button
    this.checkButton = document.createElement('button');
    this.checkButton.className = 'specify'
    this.checkButton.id = 'checkButton'
    let buttonText = document.createTextNode("check");
    this.checkButton.appendChild(buttonText);
    this.checkButton.rexs = []
    // this.checkButton.addEventListener("click", { this.warningLabel.style.display = true; });

    this.parent.insertBefore(this.checkButton, this.target.nextSibling)
    this.parent.insertBefore(this.warningLabel, this.target)

    // force them to have the same width
    $('#warningLabel').width($('#' + this.targetId).width() * 1.2)
    $('#' + this.warningLabel.id).hide()
}

Specify.prototype = {
    checkRules: async function () {
        let allRulesPass = true
        let input = $('#' + this.id).prev().val()
        violatedRule = null
        for (rule of this.rexs) {
            // console.log(rule)
            switch (rule.type) {
                case 'missing':
                    if (input.includes(rule.value)) { continue; }
                    console.log("Violate rule of type: missing")
                    violatedRule = rule
                    allRulesPass = false
                    break
                case 'lengthAtLeast':
                    if (input.length >= rule.value) { continue; }
                    console.log("Violate rule of type: lengthAtLeast")
                    violatedRule = rule
                    allRulesPass = false
                    break
                case 'other':
                    let cur_regex = new RegExp(rule.value)
                    if (input.match(cur_regex)) { continue; }
                    console.log("Violate rule of type: other")
                    violatedRule = rule
                    allRulesPass = false
                    break
            }
            if (!allRulesPass) break
        }
        if (allRulesPass) {
            console.log("All rules passed")
            $('#' + this.id).prev().prev().css('background-color', "Aqua")
            $('#' + this.id).prev().prev().text("All rules passed")
            $('#warningLabel').show()
            window.setTimeout(() => {
                $('.' + this.className).remove();
            }, 2000);
            return
        }
        // not all cases passed
        // common to all rules
        warningLabelColor = violatedRule.warningColor ? violatedRule.warningColor : 'red';
        $('#' + this.id).prev().prev().text(violatedRule.errorMessage)
        $('#' + this.id).prev().prev().css('background-color', warningLabelColor)
        $('#' + this.id).parent().css('background-color', warningLabelColor)
        $('#warningLabel').show()
        this.rexs.push(1)
    },

    addRules: function (rule) {
        if (!['missing', 'lengthAtLeast', 'other'].includes(rule.type)) {
            console.log("Rule type must be one of 'missing', 'lengthAtLeast' or 'other'")
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
