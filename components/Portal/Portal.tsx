import React from "react";
import { createPortal } from "react-dom";

const PORTAL_ID = "portal-wrapper";

interface PortalProps {
    children: React.ReactNode;
}

function getPortalElement(){
    let div = document.getElementById(PORTAL_ID);

    if(!div){
        div = document.createElement("div");
        div.id = PORTAL_ID;
        document.body.appendChild(div);
    }

    return div;
}

function Portal(props: PortalProps) {
    const [wrapper, setWrapper] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        let div = getPortalElement();
        setWrapper(div);
    }, []);

    if (!wrapper) return null;
    return createPortal(props.children, wrapper);
}

export default Portal;
