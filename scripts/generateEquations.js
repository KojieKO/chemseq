function parseCompound(compound) {
    const elements = {};
    const regex = /([A-Z][a-z]*)(\d*)/g;
    let match;
    
    while ((match = regex.exec(compound)) !== null) {
        const element = match[1];
        const count = match[2] ? parseInt(match[2]) : 1;
        elements[element] = (elements[element] || 0) + count;
    }

    return elements;
}

function generateEquations(reactants, products) {
    const elementCounts = {};
    const allCompounds = reactants.concat(products);
    const allElements = new Set();

    allCompounds.forEach(compound => {
        const parsed = parseCompound(compound);
        elementCounts[compound] = parsed;
        Object.keys(parsed).forEach(element => allElements.add(element));
    });

    const equations = Array.from(allElements).map(element => {
        const reactantSide = reactants.map((compound, i) => {
            const count = elementCounts[compound][element] || 0;
            return count ? `${count > 1 ? count : ''}${String.fromCharCode(97 + i)}` : null;
        }).filter(Boolean).join(' + ');
        
        const productSide = products.map((compound, i) => {
            const count = elementCounts[compound][element] || 0;
            return count ? `${count > 1 ? count : ''}${String.fromCharCode(97 + reactants.length + i)}` : null;
        }).filter(Boolean).join(' + ');

        return `${reactantSide} = ${productSide}`;
    });

    return equations;
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

    const equations = generateEquations(reactants, products);

    const latexEquations = equations.map(eq => `\\[${eq.replace(/ /g, '\\ ')}\\]`).join('');
    const equationsContainer = document.getElementById('equations');
    equationsContainer.innerHTML = '<h2>Sistema de Ecuaciones</h2>' + latexEquations;

    MathJax.typeset(); // Renderizar las ecuaciones con MathJax
});
