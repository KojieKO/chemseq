document.getElementById('equationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const equation = document.getElementById('equation').value;
    const [reactants, products] = equation.split('=>').map(side => side.trim());
    
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
