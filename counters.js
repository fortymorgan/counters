function createButton(text) {
    const button = document.createElement('button');
    button.innerText = text;
    return button;
}

function createCounter(id) {
    const counter = document.createElement('div');
    const value = document.createElement('span');
    const decButton = createButton('-');
    const incButton = createButton('+');
    const delButton = createButton('x');
    const autoIncCheckbox = document.createElement('input');
    autoIncCheckbox.type = 'checkbox';
    autoIncCheckbox.id = `checkbox-${id}`;
    const checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = autoIncCheckbox.id;
    checkboxLabel.innerText = 'Auto increment';
    [value, decButton, incButton, delButton, autoIncCheckbox, checkboxLabel].forEach(e => counter.appendChild(e));
    document.body.appendChild(counter);
    delButton.addEventListener('click', () => counter.remove());

    const state = {
        counterValue: 0,
        intervalId: null
    }

    const incWithRender = withRender(() => state.counterValue += 1);
    const decWithRender = withRender(() => state.counterValue -= 1);
    
    incButton.addEventListener('click', incWithRender);
    decButton.addEventListener('click', decWithRender);

    autoIncCheckbox.addEventListener('change', () => {
        if (autoIncCheckbox.checked) {
            state.intervalId = setInterval(incWithRender, 300);
        } else {
            clearInterval(state.intervalId);
        }
    });

    render();

    function render() {
        value.innerText = state.counterValue;
    }

    function withRender(action) {
        return function() {
            action();
            render();
        }
    }
}


document.getElementById('add-counter').addEventListener('click', () => createCounter(Date.now()));