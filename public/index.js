let controller = null;
let frame = null;
let iframe = null;
const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");

async function registerSW() {
    if (!("serviceWorker" in navigator)) {
        throw new Error("Service workers are not supported.");
    }

    const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/"
    });

    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
        await new Promise((resolve) => {
            navigator.serviceWorker.addEventListener(
                "controllerchange",
                resolve,
                { once: true }
            );
        });
    }

    return registration;
}

async function initScramjet() {
    if (controller) {
        return;
    }

    await registerSW();

    const serviceWorker =
        navigator.serviceWorker.controller;

    if (!serviceWorker) {
        throw new Error(
            "Scramjet service worker is not controlling this page."
        );
    }

    const wispUrl =
        (location.protocol === "https:" ? "wss" : "ws") +
        "://" +
        location.host +
        "/wisp/";

    const { default: LibcurlClient } =
        await import("/libcurl/index.mjs");

    const transport = new LibcurlClient({
        wisp: wispUrl
    });

    controller = new $scramjetController.Controller({
        serviceworker: serviceWorker,
        transport: transport
    });
    await controller.wait();

    console.log("Scramjet 2 initialized.");
}


async function navigate(url) {
    await initScramjet();
	iframe = document.querySelector(`iframe[style*="display: block"]`);
    if (!frame) {
        frame = controller.createFrame(iframe);
    }
    frame.go(url);
}


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const url = input.value.trim();

    if (!url) {
        return;
    }

    try {
        await navigate(url);
    } catch (err) {
        console.error("Scramjet error:", err);

        const error = document.getElementById("error");
        const errorCode = document.getElementById("errorCode");

        if (error) {
            error.textContent = "Failed to start Scramjet.";
        }

        if (errorCode) {
            errorCode.textContent = String(err);
        }
    }
});
