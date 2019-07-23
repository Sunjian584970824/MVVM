class compile {
    constructor(el, vm) {
            this.el = this.isElementNode(el) ? el : document.querySelector(el);
            this.vm = vm;
            if (this.el) {
                let frament = this.node2frament(this.el)
                this.compile(frament)
            }

        }
        //判断是否是dom节点
    isElementNode(node) {
        return node.nodeType === 1
    }
    compile(frament) { //递归根元素，并对元素的指令解析，文本解析
        let childnodes = frament.childNodes
        Array.from(childnodes).forEach(node => {
            if (this.isElementNode(node)) { //如果当前节点是元素
                this.renderElement(node) //指令解析
                this.compile(node) // 继续递归解析当前节点
            } else { //如果当前节点是文本
                this.renderText(node)
            }
        })
    }
    isDirective(name) {
        //判断是不是指令
        return name.includes('v-')
    }
    renderElement(node) {
        let itemType = node.attributes; // 去除当前节点的属性
        Array.from(itemType).forEach(attr => {
            var names = attr.name //  获取当前节点的属性名
            if (this.isDirective(names)) { // 判断当前属性是不是指令
                let value = attr.value;
                console.log(names)
                let directive = names.slice(2) // 获取具体的指令名称
                console.log(directive)
                CompileUti[directive](node, this.vm, value) //指令解析

            }
        })
    }
    renderText(node) {
        let text = node.textContent; //获取节点中的文本--末班变量
        var reg = /\{\{([^}]+)\}\}/g
        if (reg.test(text)) {
            CompileUti['text'](node, this.vm, text) //指令解析
        }
    }
    node2frament(el) {
        let frament = document.createDocumentFragment()
        let fristChild;
        while (fristChild = el.firstChild) {
            frament.append(fristChild)
        }
        return frament
    }
}
CompileUti = {
    text(node, vm, value) {
        //节点、mvvm对象、模板变量
        let updaterFn = this.updater['textUPdater']
        updaterFn && updaterFn(node, value)
    },
    model(node, vm, value) {
        let updaterFn = this.updater['modelUpdater']
        updaterFn && updaterFn(node, value)

    },
    updater: {
        textUPdater(node, value) {
            node.textContent = value
        },
        modelUpdater(node, value) {
            node.value = value
        },

    }
}