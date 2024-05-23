document.getElementById('equationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const equation = document.getElementById('equation').value;
    const [reactants, products] = equation.split('=>').map(side => side.trim());
    
    document.getElementById('reactants').textContent = reactants;
    document.getElementById('products').textContent = products;
});
