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

    // Remove the article of the slider where the guest is not invited to.
    render(guest) {
        if(guest.category <= 2) {
            $("article#brunch").remove();
            this.count -= 1;
        }
        if(guest.category === 1) {
            $("article#diner, article#danse").remove();
            this.count -= 2;
        }

        // delete the bubble in excess
        var toDelete = this.count - 1;
        $(".bubble:gt(" + toDelete + ")").remove();
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