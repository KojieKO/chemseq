document.getElementById('equationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const equation = document.getElementById('equation').value;
    const separator = equation.includes('=>') ? '=>' : '=';
    const [reactants, products] = equation.split(separator).map(side => side.trim());
    
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
