// Create a timeline with default parameters
var introTL = anime.timeline({
    easing: 'easeInOutCubic'
});

window.addEventListener('DOMContentLoaded', (event) => {
    let projectThumbs = document.getElementsByClassName('project-thumb');

    for (let thumb of projectThumbs) {
        thumb.addEventListener('click', openProjectContent);
    }

    const linkEls = document.querySelectorAll(".top-link");

    introTL.add({
        targets: linkEls,
        translateX: ['100%', '0%'],
        duration: 500,
        delay: anime.stagger(100)
    }).add ({
        targets: '#about',
        scaleX: [0, 1],
        duration: 400
    }, '-=300').add ({
        targets: '#about-content',
        translateY: ['-100%', '0%'],
        duration: 400
    }).add({
        targets: '#projects',
        scaleX: [0, 1],
        scaleY: [0, 1],
        duration: 1000
    }, '-=400').add({
        targets: projectThumbs,
        duration: 50,
        scaleX: [0, 1],
        scaleY: [0, 1],
        delay: anime.stagger(50)
    }, '-=200');
});

//opens lightbox with content for requested project
var openProjectContent = (e) => {
    e.preventDefault();
    alert('project clicked')
    //determine which project was clicked on
    let projectClicked = null;
    let liElement = null;
    if (e.target.localName !== "li") {
        for (let parent of e.path) {
            if (parent.localName === "li") {
                projectClicked = parent.id;
                liElement = parent;
            }
        }
    }
    else {
        projectClicked = e.srcElement.id;
        liElement = e.srcElement;
    }

    alert(projectClicked)

    let projectLink = liElement.getElementsByClassName('thumbnail-title')[0];


    //choose what content to render based on the project clicked
    let contentToRender = null;
    switch (projectClicked) {
        case "twitter-emojis":
            contentToRender = twitterEmojiContent;
            break;
        case "syllabus-archive":
            contentToRender = syllabusArchiveContent;
            break;
        case "habits":
            contentToRender = habitsContent;
            break;
        case "driving-sucks":
            contentToRender = drivingSucksContent;
            break;
        case "finals-countdown":
            contentToRender = finalsCountdownContent;
            break;
        case "complete-a-tweet-2000":
            contentToRender = completeATweetContent;
            break;
        case "lab-help-queue":
            contentToRender = labHelpQueueContent;
            break;
        case "teaching":
            contentToRender = teachingContent;
            break;
        default:
            console.error("Unknown project selected.")
            break;
    }

    //render the content in lightbox if we have it
    if (contentToRender !== null) {
        SimpleLightbox.open({
            content: contentToRender,
            elementClass: 'slbContentEl',
            beforeClose: () => { returnFocus(projectLink) }
        });

        //lightbox accesibility considerations (trapping and transferring focus)
        let projectTitle = document.getElementsByClassName('project-title')[0];
        let modal = document.getElementsByClassName("slbContentEl")[0];
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labeledby", projectTitle.id);
        trapFocus(modal);

        //add label to close button for screenreader
        let closeButton = document.getElementsByClassName("slbCloseBtn")[0];
        closeButton.setAttribute('aria-label', 'close');
        closeButton.setAttribute('aria-role', 'close');
    }


}

var returnFocus = (prevActive) => {
    prevActive.focus();
}


//used to trap focus to light box when open
var trapFocus = (element, namespace) => {
    var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'),
        firstFocusableEl = focusableEls[0];
    lastFocusableEl = focusableEls[focusableEls.length - 1];
    KEYCODE_TAB = 9;

    document.activeElement.blur();

    element.addEventListener('keydown', function (e) {
        var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) /* shift + tab */ {
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else /* tab */ {
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }

    });
}



