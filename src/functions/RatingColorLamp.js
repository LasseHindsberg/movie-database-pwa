

// set rating on lamp
export function setRatingLampColor() {
    //  get username
    var userName = "7hVdjNWT6a5nWxJzOMRwZh8L60yvjQpdiy8khFdA"
    // get value from input field
    var color = document.getElementById("voteValue").value
    // rating colors
    var colorRating = {
        0: 40000,
        1: 0,
        2: 5000,
        3: 10000,
        4: 20000,
        5: 25000,
    }
    // get movieRating variable ready
    var movieRating;

    /*
    if (input.value === colorRating)
    */
    var keys = Object.keys(colorRating);
    keys.forEach(function (key) {
        if (key === color) {

            movieRating = colorRating[key];
            console.log(movieRating)
        }
    })

    fetch(`http://192.168.8.100/api/${userName}/lights/17/state`,
        {
            body: JSON.stringify({"bri": parseInt(200), "hue": parseInt(movieRating) }),
            method: "PUT"
        })
}