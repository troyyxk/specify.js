
function Specify(targetId, parentId) {
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



function CircleGenerator(targetId, parentId) {
    // the constructor function shouhld instantiate any variables that
    //  each Circle Generator instance should have a unique version of.
    //  In this case, each CG should have its own array of circles separate from
    //  other CGs.
    this.circles = []
    this.targetId = targetId
    this.parentId = parentId
    const circle = document.createElement('button')
    circle.style = 'width: 60px; height: 60px; border-radius: 50%; margin: 10px; background-color: Aqua;'
    this.circle = circle
    // why not use a little jQuery:
    const body = $('body') // jQuery equivalent to: const body = document.querySelector('body')
    body.append(circle)
    // this..
    // this.. (any values you need for each 'instance' of this library)
}

// For funcionality and values common to all CircleGenerators,
//  we can add to the prototype property of the constructor.
CircleGenerator.prototype = {

    // Every CG will make use of the same makeCircle() and changeCircleColors function
    makeCircle: function () {
        const circle = document.createElement('div')
        circle.style = 'width: 60px; height: 60px; border-radius: 50%; margin: 10px; background-color: Aqua;'

        // why not use a little jQuery:
        const body = $('body') // jQuery equivalent to: const body = document.querySelector('body')
        body.append(circle)

        this.circles.push(circle) // add to the circles list
        console.log(this.circles)
        console.log(this.targetId)
        console.log(this.parentId)
        console.log(this.circle)
    },

    changeCirclesColor: function () {
        for (let i = 0; i < this.circles.length; i++) {
            this.circles[i].style.backgroundColor = 'darkmagenta'
        }
    }

}