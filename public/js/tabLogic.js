document.querySelectorAll('.tabExample').forEach((tab) => {
        tab.style.backgroundColor = '#080808'
        tab.children[0].style.color = `#d4f0f7`
    })

function autoRenameIframeAndTabs() {
    document.querySelectorAll('.tabExample').forEach((tab, index) => {
        tab.classList.remove(tab.classList[1])
        tab.classList.add(`tab${index}`)
    });
    let allIframes = document.getElementsByTagName('iframe')
    for (let i = 0; i < allIframes.length; i++) {
        allIframes[i].classList.remove(allIframes[i].classList[1])
        allIframes[i].classList.add(`tab${i}`)
    }
}

function hideIframes() {
    let allIframes = document.getElementsByTagName('iframe')
    for (let i = 0; i < allIframes.length; i++) {
        allIframes[i].style.display = 'none'
    }
}

function findIframeByClass(className) {
    let allIframes = document.getElementsByTagName('iframe')
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
    newTab.style.backgroundColor = '#0f0f0f'
    newTab.style.borderRadius = '5px'
    let button1 = document.createElement('button')
    button1.style.color = '#d4f0f7'
    button1.style.width = '80%'
    button1.style.height = '100%'
    button1.innerHTML = 'New Tab'
    button1.onclick = function() {switchTab(this)}
    let button2 = document.createElement('button')
    button2.innerHTML = '<img src="img/icons8-close-48.png" style="width: 12px; height: 12px;">'
    button2.style.color = '#d4f0f7'
    button2.onclick = function() {deleteTab(this)}
    let newIframe = document.createElement('iframe')
    hideIframes()
    newIframe.classList.add('search-iframe')
    newIframe.classList.add(`tab${tabCount}`)
    newIframe.style.display = 'block'
    newIframe.style.width = '100%'
    newIframe.style.height = '100%'
    newIframe.src = 'p.html'
    document.querySelectorAll('.tabExample').forEach((tab) => {
        tab.style.backgroundColor = '#080808'
    })
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
    let iframe = findIframeByClass(className)
    document.querySelectorAll('.tabExample').forEach((tab) => {
        tab.style.backgroundColor = '#080808'
    })
    let childButton = parent.children[0]
    parent.style.backgroundColor = '#0f0f0f'
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