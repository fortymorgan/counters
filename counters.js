function createCounter(id) {
    const counter = document.createElement('div');
    counter.innerHTML = `<span id="value-${id}"></span>
        <button id="dec-${id}">-</button>
        <button id="inc-${id}">+</button>
        <button id="del-${id}">x</button>
        <input type="checkbox" id="checkbox-${id}">
        <label for="checkbox-${id}">Auto increment</label>
        <input type="range" id="range-${id}" min="1" max="10" value="1">
        <label for="range-${id}" id="range-label-${id}"></label>`
    document.body.appendChild(counter);
    const value = getElement('value');
    const decButton = getElement('dec');
    const incButton = getElement('inc');
    const delButton = getElement('del');
    const autoIncCheckbox = getElement('checkbox');
    const autoIncFreqRange = getElement('range');
    const rangeLabel = getElement('range-label');
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

    function getElement(prefix) {
        return document.getElementById(`${prefix}-${id}`);
    }
}


document.getElementById('add-counter').addEventListener('click', () => createCounter(Date.now()));