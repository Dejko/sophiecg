let unmatchedInkSet = [...this.state.inkSet];
this.querySelectorAll('.inkSet-item').forEach((item) => {
    const itemValue = item.getAttribute('value');

    if (unmatchedInkSet.includes(itemValue)) {
        item.classList.add('selected')
        item.style.color = itemValue
        unmatchedInkSet = unmatchedInkSet.filter(value => value !== itemValue)

    }
    else if (itemValue === 'spot' && unmatchedInkSet.length > 0) {
        const color = unmatchedInkSet.shift()
        item.classList.add('selected')
        item.style.color = color  //asiggn those that didnt match in first condition
        item.setAttribute('value', `${color}`)
        item.innerHTML = color[0].toUpperCase()
    }
});
