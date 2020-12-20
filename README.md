# specify.js
A JavaScript library used for specifying text input.

Link to the landing page:
```
https://specify-library-xingkun.herokuapp.com/example.html
```

Getting Started
```
First create an instace of Specify.js by

const sp = new Specify({"selfId"}, {"parentId"})

selfId: the id of the textbox you want specify you attach to

parentId: the id of the parent of the text boxs

Then attch the rule to the newly created button

sp.checkButton.addEventListener("click", sp.checkRules)

Finally, we can start adding rules in the following way:

sp.addRules({ type: "{rule}", value: "{value}", errorMessage: "{errorMessage}", warningColor: "{warningColor}", animation: "{animation}" })

rule: the rule to use

value: the value to use for rule, for lengh related rule, it should be an int; for missing related rult, it should be the value that is missing; for other, it should be a regex exression

errorMessage: the error message that shold appear

warningColor: the warning color to use

animation: the animation to use

There are several pre-defined warning rules:

missing-front
missing-back
missing
lengthAtLeast
lengthAtMost
If non of the predefined rule is useful to you, you can define your own rule with regex and set the type of rule to:

other
There are several warning animation:

rotate-c (rotate counter clockwise)
rotate-cc (rotate counterclockwise)
shake
bounce
float
warning-colorChange
```

Link to the landing page:
```
https://specify-library-xingkun.herokuapp.com/documentation.html
```
