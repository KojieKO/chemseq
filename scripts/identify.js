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

    const [reactants, products] = equation.split(separator).map(side => side.trim());

    if (!reactants || !products) {
        alert('Asegúrese de que la ecuación contenga reactivos y productos.');
        return;
    }
    
    const reactantsList = document.getElementById('reactants');
    const productsList = document.getElementById('products');
    
    reactantsList.innerHTML = '';
    productsList.innerHTML = '';
    
    reactants.split('+').forEach(reactant => {
        const li = document.createElement('li');
        li.innerHTML = formatChemicalFormula(reactant.trim());
        reactantsList.appendChild(li);
    });
    
    products.split('+').forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = formatChemicalFormula(product.trim());
        productsList.appendChild(li);
    });
});

function formatChemicalFormula(formula) {
    return formula.replace(/(\d+)/g, '<sub>$1</sub>');
}
