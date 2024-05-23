document.getElementById('equationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const equationInput = document.getElementById('equation');
    const equation = equationInput.value.trim();

    if (!equation.includes('=>')) {
        alert('La ecuación debe contener "=>" para separar reactivos y productos.');
        return;
    }

    const [reactants, products] = equation.split('=>').map(side => side.trim());

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
        li.textContent = reactant.trim();
        reactantsList.appendChild(li);
    });
    
    products.split('+').forEach(product => {
        const li = document.createElement('li');
        li.textContent = product.trim();
        productsList.appendChild(li);
    });
});
