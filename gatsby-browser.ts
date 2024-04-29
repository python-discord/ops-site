import { default as mousetrap } from "mousetrap";

declare global {
    interface Window {
        rick: HTMLIFrameElement | null;
    }
}

export const onInitialClientRender = (
    _: any,
    {
        sequence = "up up down down left right left right b a",
    }: { sequence?: string } = {}
) => {

    mousetrap.bind(sequence, () => {
        let iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0";
        iframe.style.position = "fixed";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.style.zIndex = "999999";
        document.body.appendChild(iframe);
        window.rick = iframe;
    });

    mousetrap.bind("esc", () => {
        if (window.rick) {
            window.rick.remove();
            window.rick = null;
        }
    });
};
