function vNode(tag,children,text){
    this.tag=tag
    this.children=children
    this.text=text
}
vNode.prototype.render=function(){
    if (this.tag==='#text'){
        return document.createTextNode(this.text)
    }
    let el=document.createElement(this.tag)
    this.children.forEach(vChild=>{
        el.append(vChild.render())
    })
    return el
}
function v(tag,children,text){
    if (typeof children==='string'){
        text=children
        children=[]
    }
    return new vNode(tag,children,text)
}
let vNodes1=v('div',[
    v('p',[
        v('span',[v('#text',"I'm xzb")]),
    ]),
    v('span',[v('#text','xuanzebin')])
])
let vNodes2=v('div',[
    v('p',[
        v('span',[v('#text',"I'm xzb")]),
    ]),
    v('span',[v('#text','xuanzebin comes back')])
])

function patchElement(parent,newVNode,oldVNode,index=0){
    if (!oldVNode){
        parent.appendChild(newVNode.render())
    } else if (!newVNode){
        parent.removeChild(parent.childNodes[index])
    } else if (newVNode.tag!==oldVNode.tag || newVNode.text!==oldVNode.text){
        parent.replaceChild(newVNode.render(),parent.childNodes[index])
    } else {
        for (let i=0;i<newVNode.children.length||i<oldVNode.children.length;i++){
            patchElement(parent.childNodes[index],newVNode.children[i],oldVNode.children[i],i)
        }
    }
}

root.appendChild(vNodes1.render())

change.onclick=function(){
    patchElement(root,vNodes2,vNodes1)
}