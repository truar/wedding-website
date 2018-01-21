class Screen {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

class Slider {
    constructor(count, currentIndex, left, creen) {
        this.count = count;
        this.currentIndex = currentIndex;
        this.left = left;
        this.screen = screen;
        this.rightOn = true;
        this.leftOn = false;
        this.isEnabled = true;
    }
}

class Wedding {
    constructor(isPresent, email, names, allergies, comments) {
        this.isPresent = isPresent;
        this.email = email;
        this.names = names;
        this.allergies = allergies;
        this.comments = comments;
    }
}