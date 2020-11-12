
function Specify(targetId, parentId) {

    this.circles = []

    this.targetId = targetId
    this.parentId = parentId
    this.target = document.getElementById(targetId);
    cur_target = document.getElementById(targetId);
    this.parent = document.getElementById(parentId);

    // console.log(this.target)
    // console.log(this.parent)

    // warning label
    this.warningLabel = document.createElement('div');
    this.warningLabel.className = 'specify'
    this.warningLabel.id = 'warningLabel'
    this.warningLabel.style = 'background-color: Aqua;';
    // console.log($('#' + this.targetId).width())

    // check button
    this.checkButton = document.createElement('button');
    this.checkButton.className = 'specify'
    let buttonText = document.createTextNode("check");
    this.checkButton.appendChild(buttonText);
    // this.checkButton.addEventListener("click", { this.warningLabel.style.display = true; });

    this.parent.insertBefore(this.checkButton, this.target.nextSibling)
    this.parent.insertBefore(this.warningLabel, this.target)

    // force them to have the same width
    $('#warningLabel').width($('#' + this.targetId).width() * 1.2)
    this.warningLabel.style.display = 'none';
    // document.getElementById('warningLabel').style.display = "none"
    // this.warningLabel.style.display = "block";

}

Specify.prototype = {
    check: function () {
        console.log("hi")
        // this.warningLabel.style.display = true;
        console.log(this.targetId)
        // document.getElementById('warningLabel').style.display = 'block';

    }

}
