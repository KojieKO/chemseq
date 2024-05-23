function formatChemicalFormula(formula) {
    return formula.replace(/([A-Za-z])(\d+)/g, '$1<sub>$2</sub>');
}
