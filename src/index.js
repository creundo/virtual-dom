function dom(type, props, ...children) {
    return {type, props, children};
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