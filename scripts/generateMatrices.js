function generateMatrices(reactants, products) {
    const elementCounts = {};
    const allCompounds = reactants.concat(products);
    const allElements = new Set();

    allCompounds.forEach(compound => {
        const parsed = parseCompound(compound);
        elementCounts[compound] = parsed;
        Object.keys(parsed).forEach(element => allElements.add(element));
    });

    const elementArray = Array.from(allElements);
    const matrix = elementArray.map(element => {
        const row = [];

        reactants.forEach(compound => {
            row.push(elementCounts[compound][element] || 0);
        });

        products.forEach(compound => {
            row.push(-(elementCounts[compound][element] || 0));
        });

        return row;
    });

    const identityMatrix = Array(allCompounds.length).fill().map((_, i) => {
        const row = Array(allCompounds.length).fill(0);
        row[i] = 1;
        return row;
    });

    console.log("Matriz del sistema:");
    console.table(matrix);

    console.log("Matriz de identidad:");
    console.table(identityMatrix);
}

document.getElementById('equationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const equationInput = document.getElementById('equation');
    const equation = equationInput.value.trim();
    let separator = '';

    if (equation.includes('=>')) {
        separator = '=>';
    } else if (equation.includes('=')) {
        separator = '=';
    } else {
        alert('La ecuación debe contener "=>" o "=" para separar reactivos y productos.');
        return;
    }

    const [reactants, products] = equation.split(separator).map(side => side.trim().split('+').map(s => s.trim()));

    generateMatrices(reactants, products);
});
