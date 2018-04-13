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
    const autoIncFreqRange = document.createElement('input');
    autoIncFreqRange.type = 'range';
    autoIncFreqRange.id = `range-${id}`
    autoIncFreqRange.min = 1;
    autoIncFreqRange.max = 10;
    autoIncFreqRange.value = 1;
    const rangeLabel = document.createElement('label');
    rangeLabel.htmlFor = autoIncFreqRange.id;
    [value, decButton, incButton, delButton, autoIncCheckbox, 
        checkboxLabel, autoIncFreqRange, rangeLabel].forEach(e => counter.appendChild(e));
    document.body.appendChild(counter);
    delButton.addEventListener('click', () => counter.remove());

    const state = {
        counterValue: 0,
        intervalId: null,
        incFrequency: 1
    }

    const incWithRender = withRender(() => state.counterValue += 1);
    const decWithRender = withRender(() => state.counterValue -= 1);
    
    incButton.addEventListener('click', incWithRender);
    decButton.addEventListener('click', decWithRender);

    autoIncCheckbox.addEventListener('change', () => {
        if (autoIncCheckbox.checked) {
            state.intervalId = setInterval(incWithRender, 1000 / state.incFrequency);
        } else {
            clearInterval(state.intervalId);
            state.intervalId = null;
        }
    });

    autoIncFreqRange.addEventListener('input', () => {
        state.incFrequency = autoIncFreqRange.value;
        if (state.intervalId !== null) {
            clearInterval(state.intervalId);
            state.intervalId = setInterval(incWithRender, 1000 / state.incFrequency);
        } else {
            render();
        }
    })

    render();

    function render() {
        value.innerText = state.counterValue;
        rangeLabel.innerText = autoIncFreqRange.value;
    }

    function withRender(action) {
        return function() {
            action();
            render();
        }
    }
}


document.getElementById('add-counter').addEventListener('click', () => createCounter(Date.now()));