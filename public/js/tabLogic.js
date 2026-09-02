function autoRenameIframeAndTabs() {
    document.querySelectorAll('.tabExample').forEach((tab, index) => {
        tab.classList.remove(tab.classList[1])
        tab.classList.add(`tab${index}`)
        console.log(tab)
    });
    let allIframes = document.getElementsByTagName('iframe')
    for (let i = 0; i < allIframes.length; i++) {
        allIframes[i].classList.remove(allIframes[i].classList[1])
        allIframes[i].classList.add(`tab${i}`)
        console.log(allIframes[i])
    }
}

function hideIframes() {
    let allIframes = document.getElementsByTagName('iframe')
    console.log(allIframes)
    for (let i = 0; i < allIframes.length; i++) {
        allIframes[i].style.display = 'none'
    }
}

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
    let tabCount = document.getElementById('tabHolder').getElementsByClassName('tabExample').length
    let newTab = document.createElement('div')
    newTab.id = 'tab'
    newTab.classList.add('tabExample')
    newTab.classList.add(`tab${tabCount}`)
    newTab.style.height = '30px'
    newTab.style.width = '150px'
    newTab.style.backgroundColor = '#080808'
    newTab.style.borderRadius = '5px'
    let button1 = document.createElement('button')
    button1.style.color = 'white'
    button1.style.width = '80%'
    button1.innerHTML = 'New Tab'
    button1.onclick = function() {switchTab(this)}
    let button2 = document.createElement('button')
    button2.innerHTML = 'X'
    button2.style.color = 'white'
    button2.onclick = function() {deleteTab(this)}
    let newIframe = document.createElement('iframe')
    hideIframes()
    newIframe.classList.add('search-iframe')
    newIframe.classList.add(`tab${tabCount}`)
    newIframe.style.display = 'block'
    newIframe.style.width = '100%'
    newIframe.style.height = '100%'
    newIframe.src = 'p.html'
    document.getElementById('tabHolder').appendChild(newTab)
    document.getElementById('tabHolder').lastChild.appendChild(button1)
    document.getElementById('tabHolder').lastChild.appendChild(button2)
    document.getElementById('iframeContainer').appendChild(newIframe)
    const element = document.getElementById("closeDiv");
    element.parentNode.appendChild(element);
    autoRenameIframeAndTabs()


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
    autoRenameIframeAndTabs()
}