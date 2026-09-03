function goForward() {

    const iframe = document.querySelector(`iframe[style*="display: block"]`);
    iframe.contentWindow.history.forward()
}

function goBack() {
    const iframe = document.querySelector(`iframe[style*="display: block"]`);
    iframe.contentWindow.history.back()
}

function refreshPage() {
    const iframe = document.querySelector(`iframe[style*="display: block"]`);
    iframe.contentWindow.location.reload()
}