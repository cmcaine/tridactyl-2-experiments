import * as m from 'mithril'

function renderIntoIframe(vnode: any) {
    m.render(vnode.dom.contentDocument.documentElement, vnode.children)
}

function tryRenderIntoIframe(vnode: any){
    var doc = vnode.dom.contentDocument || vnode.dom.contentWindow.document;

    if (doc.readyState === "complete") {
        renderIntoIframe(vnode)
    } else{
        doc.addEventListener("readystatechange", (event) => {
            if (event.target.readyState == 'complete') {
                renderIntoIframe(vnode)
            }
        })
    }
}

const Iframe = {
    oncreate: tryRenderIntoIframe,
    onupdate: tryRenderIntoIframe,
    view: ({attrs}) =>
        m('iframe', attrs)
}

export default Iframe
