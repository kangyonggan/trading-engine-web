const NumberUtil = {}

NumberUtil.formatUsdt = function (num) {
    return this.format(num, 2)
}

NumberUtil.format = function (num, len) {
    if (len === undefined || len < 0) {
        len = 8
    }
    if (!num) {
        let str = '0.'
        for (let i = 0; i < len; i++) {
            str += '0'
        }
        if (str === '0.') {
            return '0'
        }
        return str
    }
    num += '';
    if (!num.includes('.')) {
        num += '.'
    }
    num += '00000000'
    if (len <= 0) {
        return num.substring(0, num.indexOf("."))
    }
    return num.substring(0, num.indexOf(".") + len + 1);
}

export default NumberUtil