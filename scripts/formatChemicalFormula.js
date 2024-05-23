function formatChemicalFormula(formula) {
    return formula.replace(/(\d+)/g, '<sub>$1</sub>');
}
