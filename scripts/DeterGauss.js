function applyDeterGauss(matrix) {
    // Cambiar el signo de la primera columna
    const modifiedMatrix = matrix.map(row => {
        const newRow = [...row];
        newRow[0] = -newRow[0];
        return newRow;
    });

    // Mover la primera columna al final
    const transformedMatrix = modifiedMatrix.map(row => {
        const [first, ...rest] = row;
        return [...rest, first];
    });

    console.log("New preset matrix:");
    console.table(transformedMatrix);

    return transformedMatrix;
}

function isIndeterminateSystem(matrix) {
    return matrix.length < matrix[0].length;
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

    if (isIndeterminateSystem(matrix)) {
        applyDeterGauss(matrix);
    } else {
        console.log("Sistema determinado. No se aplican cambios.");
    }
});
