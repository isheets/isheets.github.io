window.addEventListener('DOMContentLoaded', (event) => {
    let projectThumbs = document.getElementsByClassName('project-thumb');

    for (let thumb of projectThumbs) {
        //thumb.addEventListener('keydown', openProjectContent);
        thumb.addEventListener('click', openProjectContent);
    }
});

//opens lightbox with content for requested project
var openProjectContent = (e) => {
    e.preventDefault();
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
        default:
            break;
    }

    //render the content in lightbox if we have it
    //TODO: need to add callback function for on close to return focus to closed link
    if (contentToRender !== null) {
        SimpleLightbox.open({
            content: contentToRender,
            elementClass: 'slbContentEl',
            beforeClose: () => {returnFocus(projectLink)}
        });

        let projectTitle = document.getElementsByClassName('project-title')[0];
        let modal = document.getElementsByClassName("slbContentEl")[0];
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labeledby", projectTitle.id);
        trapFocus(modal);
        projectTitle.focus();

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



