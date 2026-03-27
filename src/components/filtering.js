import {createComparison, defaultRules} from "../lib/compare.js";

export function initFiltering(elements, indexes) {

    Object.keys(indexes).forEach((name) => {
        elements[name].append(
            ...Object.values(indexes[name]).map(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                return option;
            })
        );
    });

    const compare = createComparison(defaultRules);

    return (data, state, action) => {

        const from = parseFloat(state.totalFrom);
        const to = parseFloat(state.totalTo);

        if (!isNaN(from) || !isNaN(to)) {
            state.total = [from, to];
        }

        if (action && action.name === 'clear') {
            const field = action.dataset.field;

            const input = action.parentElement.querySelector('input');
            if (input) input.value = '';

            state[field] = '';
        }

        return data.filter(row => compare(row, state));
    }
}