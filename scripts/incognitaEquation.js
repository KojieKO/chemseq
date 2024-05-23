document.getElementById('equationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const reactantsList = document.getElementById('reactants').children;
    const productsList = document.getElementById('products').children;
    
    const symbols = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let symbolIndex = 0;
    
    Array.from(reactantsList).forEach((li, index) => {
        li.setAttribute('data-symbol', symbols[symbolIndex++]);
    });
    
    Array.from(productsList).forEach((li, index) => {
        li.setAttribute('data-symbol', symbols[symbolIndex++]);
    });
});
