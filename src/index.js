function dom(type, props, ...children) {
    return {type, props, children};
}

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    } else {
        const $el = document.createElement(node.type);
        setProps($el, node.props);

        node.children
            .map(createElement)
            .forEach($el.appendChild.bind($el));
        return $el;
    }
}

function setProps($target, props) {
    if (!props) {
        return;
    }
    Object.keys(props).forEach(key => {
        setProp($target, key, props);
    });
}

function setProp($target, key, props) {
    $target[key] = props[key];
}

function updateElement($parent, newNode, oldNode, index = 0) {
    const $el = $parent.childNodes[index];
    if (!oldNode) {
        //1. there's no newNode in the oldNode -> appendChild
        $parent.appendChild(createElement(newNode));
    } else if (!newNode) {
        //2. there's oldNode but not newNode -> removeChild
        $parent.removeChild($el);
    } else if (changed(newNode, oldNode)) {
        //3. node has changed -> replaceChild
        $parent.replaceChild(
            createElement(newNode), 
            $el
        );
    } else if (newNode.type) {
        const children = newNode.children.length < oldNode.children.length ? newNode.children : oldNode.children;
        children.forEach((child, i) => {
            updateElement($el, newNode.children[i], oldNode.children[i], i);
        });
    }
}

function changed(node1, node2) {
    //TODO: check for changed props
    return typeof node1 !== typeof node2 ||
        (typeof node1 === 'string' && node1 !== node2) ||
        node1.type !== node2.type
        ;
}

const html = (
    <div>
        <h1 id="title" className="foobar">Hello World!</h1>
        My first test
    </div>
);

const newHtml = (
    <div>
        <h1 id="title" className="foobar">Hello again!</h1>
        My first test was changed!
    </div>
);

const $root = document.getElementById('root');
$root.appendChild(createElement(html));


const $button = document.getElementById('update');
$button.addEventListener('click', () => {
    updateElement($root, newHtml, html);
});