export function сurrencyFilter(currency) {
    let currencyList = {
        'kzt': 'KZT',
        'rub': 'RUB',
        'usd': 'USD',
        'eur': 'EUR'
    }

    if (currency in currencyList) {
        return currencyList[currency]
    } else {
        return 'Bitcoin'
    }
}

export function prettyPrice(money) {
    return new String(money).split('').reverse().map((char, index, arr) => {
        if (index !== 0 && index % 3 === 0) return char + ' ';
        return char
    }).reverse().join('');
}