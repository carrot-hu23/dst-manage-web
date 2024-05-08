function add0(m) {
    return m < 10 ? `0${m}` : m
}
function format(unix) {
    // shijianchuo是整数，否则要parseInt转换
    const time = new Date(unix);
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    // var h = time.getHours();
    // var mm = time.getMinutes();
    // var s = time.getSeconds();
    // return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);    
    return `${y}-${add0(m)}-${add0(d)}`
}

function translateFormat(unixs) {
    return unixs.map(unix => format(unix))
}
/**
 * 日期范围工具类
 */
export function startTime(time) {
    const nowTimeDate = new Date(time)
    return nowTimeDate.setHours(0, 0, 0, 0)
}

export function endTime(time) {
    const nowTimeDate = new Date(time)
    return nowTimeDate.setHours(23, 59, 59, 999)
}

/** *
* 当前时间
*/
export function getCurrentDate() {
    return new Date();
}


export function getBeginToday() {
    return new Date(new Date(new Date().toLocaleDateString()).getTime());
}


export function getBeginYesterday() {
    return startTime(getBeginToday() - 24 * 60 * 60 * 1000);
}


/** *
 * 昨天结束时间时间
 */
export function getEndYesterday() {
    return endTime(getBeginToday() - 24 * 60 * 60 * 1000);
}
/** *
 * 本周的第一天时间
 */
export function getBeginWeek() {
    const currentDate = getCurrentDate();
    const week = currentDate.getDay();

    // 一天的毫秒数
    const millisecond = 1000 * 60 * 60 * 24;
    // 减去的天数
    // eslint-disable-next-line eqeqeq
    const minusDay = week != 0 ? week - 1 : 6;
    // 本周 周一
    const monday = new Date(currentDate.getTime() - (minusDay * millisecond));
    return startTime(monday);
}

/** *
 * 本周的最后一天时间
 */
export function getEndWeek() {
    const currentDate = getCurrentDate();
    const week = currentDate.getDay();
    // 一天的毫秒数
    const millisecond = 1000 * 60 * 60 * 24;
    // 减去的天数
    const minusDay = week !== 0 ? week - 1 : 6;
    // 本周 周日
    const monday = new Date(currentDate.getTime() - (minusDay * millisecond));
    const sunday = new Date(monday.getTime() + (6 * millisecond));
    // 返回
    return endTime(sunday);
}

/** *
 * 上周的开始
 */
export function getBeginLastWeek() {
    const currentDate = getCurrentDate();
    const first = currentDate.getDate() - currentDate.getDay() - 6;
    const startDate = new Date(currentDate.setDate(first));
    return startTime(startDate);
}

/** *
 * 上周的结束
 */
export function getEndLastWeek() {
    const currentDate = getCurrentDate();
    const first = currentDate.getDate() - currentDate.getDay() - 6;
    const last = first + 6;
    const endDate = new Date(currentDate.setDate(last));
    return endTime(endDate);
}

/** *
 * 本月的第一天时间
 */
export function getBeginMonth() {
    const currentDate = getCurrentDate();
    const currentMonth = currentDate.getMonth();
    // 获得当前年份4位年
    const currentYear = currentDate.getFullYear();
    // 求出本月第一天
    const firstDay = new Date(currentYear, currentMonth, 1);

    return firstDay;
};

/** *
 * 本月的最后一天时间
 */
export function getEndMonth() {
    // 获取当前时间
    const currentDate = getCurrentDate();
    const fullYear = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
    const endOfMonth = new Date(fullYear, month, 0);
    return endTime(endOfMonth);
};

/** *
 * 上月的第一天时间
 */
export function getBeginLastMonth() {
    // 获取当前时间
    const currentDate = getCurrentDate();
    // 获得当前月份0-11
    const currentMonth = currentDate.getMonth();
    // 获得当前年份4位年
    const currentYear = currentDate.getFullYear();
    // 获得上一个月的第一天
    const priorMonthFirstDay = getPriorMonthFirstDay(currentYear, currentMonth);
    return priorMonthFirstDay;
};

/** *
 * 上月的最后一天时间
 */
export function getEndLastMonth() {
    // 获取当前时间
    const currentDate = getCurrentDate();
    // 获得当前月份0-11
    let currentMonth = currentDate.getMonth();
    // 获得当前年份4位年
    // let currentYear = currentDate.getFullYear();

    // 当为12月的时候年份需要加1
    // 月份需要更新为0 也就是下一年的第一个月
    if (currentMonth === 11) {
        // eslint-disable-next-line no-plusplus
        // currentYear++;
        currentMonth = 0; // 就为
    } else {
        // 否则只是月份增加,以便求的下一月的第一天
        // eslint-disable-next-line no-plusplus
        currentMonth++;
    }

    // 一天的毫秒数
    const millisecond = 1000 * 60 * 60 * 24;
    // 求出上月的最后一天
    const lastDay = new Date(getBeginMonth().getTime() - millisecond);

    return endTime(lastDay);
};

/**
 * 返回上一个月的第一天Date类型
 * @param year 年
 * @param month 月
 * */
export function getPriorMonthFirstDay(year, month) {
    // 年份为0代表,是本年的第一月,所以不能减
    if (month === 0) {
        month = 11; // 月份为上年的最后月份
        // eslint-disable-next-line no-plusplus
        year--; // 年份减1
        return new Date(year, month, 1);
    }
    // 否则,只减去月份
    // eslint-disable-next-line no-plusplus
    month--;
    return new Date(year, month, 1);;
};


function timestampToString(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const dateString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return dateString;
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000); // 将时间戳转换为毫秒数
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function generateUUID() {
    const cryptoObj = window.crypto || window.msCrypto;
    if (!cryptoObj) {
        console.error('Crypto API not supported.');
        return;
    }

    const buffer = new Uint8Array(16);
    cryptoObj.getRandomValues(buffer);

    // Set version (4) and variant (8, 9, a, or b) bits
    // eslint-disable-next-line no-bitwise
    buffer[6] = (buffer[6] & 0x0f) | 0x40;
    // eslint-disable-next-line no-bitwise
    buffer[8] = (buffer[8] & 0x3f) | 0x80;

    const hexCodes = Array.from(buffer)
        .map(byte => byte.toString(16).padStart(2, '0'));

    const uuid = hexCodes.join('');
    // eslint-disable-next-line consistent-return
    return `${uuid.substr(0, 8)}-${uuid.substr(8, 4)}-${uuid.substr(12, 4)}-${uuid.substr(16, 4)}-${uuid.substr(20)}`;
}

export {
    format,
    translateFormat,
    timestampToString,
    formatTimestamp,

    generateUUID
}