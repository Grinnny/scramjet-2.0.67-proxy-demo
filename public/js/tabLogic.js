

function findIframeByClass(className) {
    let allIframes = document.getElementsByTagName('iframe')
    console.log(allIframes)
    for (let i = 0; i < allIframes.length; i++) {
        if (allIframes[i].classList.contains(className)) {
            return allIframes[i]
        }
    }
}

function createTab() {
    
}

function hideIframes() {
    let allIframes = document.getElementsByTagName('iframe')
    console.log(allIframes)
    for (let i = 0; i < allIframes.length; i++) {
        allIframes[i].style.display = 'none'
    }
}

function switchTab(e) {
    hideIframes()
    let parent = e.parentElement
    let className = parent.classList[1]
    console.log(className)
    let iframe = findIframeByClass(className)
    iframe.style.display = 'block'
}

function deleteTab(e) {
    let xButton = e
    let parent = e.parentElement
    const iframe = findIframeByClass(parent.classList[1])
    if (iframe) {
        iframe.remove()
    }
    
    parent.remove()
    console.log(xButton)
}