
/**
* Class that handles Date and Time related operations.
*/

//Constructor
function DateTime() {
    moment.locale('en');//set time theo chuan quoc te
};

DateTime.prototype = {

};

//format time full theo chuan vietnam
DateTime.getFullDateTimeFormat = function DateTime$getFullDateTimeFormat() {
    return "DD/MM/YYYY HH:mm:ss";
};

//format date theo chuan vietnam
DateTime.getDateFormat = function DateTime$getDateFormat() {
    return "DD/MM/YYYY";
};

//format time theo chuan vietnam
DateTime.getTimeFormat = function DateTime$getTimeFormat() {
    return "HH:mm:ss";
};

//format time full theo chuan vietnam
DateTime.getFullFileSaverDateTimeFormat = function DateTime$getFullFileSaverDateTimeFormat() {
    return "YYMMDD_HHmmss";
};

//
DateTime.getFullFileSaverDateTimeFormatTtht = function DateTime$getFullFileSaverDateTimeFormatTtht() {
    return "DDMMYYYY";
};

//format thu ngay thang theo chuan vietnam
DateTime.getDateFormatWithWeekday = function DateTime$getDateFormatWithWeekday() {
    return "dddd, DD/MM/YYYY";
};

//lay thu ngay thang theo chuan vietnam
DateTime.getVietnamDate = function DateTime$getVietnamDate(date) {
    return moment(date).locale('vi').format(DateTime.getDateFormatWithWeekday());
};
//format time
DateTime.format = function DateTime$format(date, format) {
    return moment(date).format(format);
};

//truyen vao datetime, tra ra la 1 so tu 0-6
DateTime.getdayOfWeek = function DateTime$getdayOfWeek(date) {
    return moment(date).day();
};


DateTime.getdateTtht = function DateTime$getdateTtht(date) {
    return moment(date).format(DateTime.getFullFileSaverDateTimeFormatTtht());
};

DateTime.getdateTthtSw = function DateTime$getdateTtht(date1) {
    return moment(date1).format(DateTime.getFullFileSaverDateTimeFormatTtht());
};

//check value is Date
DateTime.isValidDate = function DateTime$isValidDate(value) {
    if (value == null) return false;
    if (value.getDate) {
        return true;
    }
    return false;
};

//valid string to date with format
DateTime.validateDateWithFormat = function DateTime$validateDateWithFormat(datetimeString, format) {
    try {
        if (format !== undefined)
            return moment(datetimeString, format, true).isValid();
        return false;
    } catch (e) {
        console.error(e);
    }
    return false;
};


//convert string to date with format
DateTime.convertToDateWithFormat = function DateTime$convertToDateWithFormat(datetimeString, format) {
    try {
        if (format !== undefined)
            return moment(datetimeString, format).toDate();
        return moment(datetimeString).toDate();
    } catch (e) {
        console.error(e);
    }
    return null;
};

//convert string to date
DateTime.convertToDatetime = function DateTime$convertToDatetime(datetimeString) {
    try {
        return moment(datetimeString).toDate();
    } catch (e) {
        console.error(e);
    }
    return null;
};

//tra ve do chenh lech giua 2 khoang thoi gian tinh theo ngay
DateTime.dateDiff = function DateTime$dateDiff(date1, date2) {
    return moment(date1).diff(moment(date2), 'days');
};

//tra ve do chenh lech giua 2 khoang thoi gian tinh theo mili giay
DateTime.timeDiff = function DateTime$timeDiff(date1, date2) {
    return moment(date1).diff(moment(date2));
};

//dau vao la datetime, dau ra la datetime chi ghi nhan ngay, khong co gio
DateTime.getDateOnly = function DateTime$getDateOnly(time) {
    return moment(time).startOf('day').toDate();
};

//lay tong so minisecond theo time truyen vao
DateTime.getMiliSeconds = function DateTime$getMiliSeconds(hour, minutes, second) {
    return hour * 3600000 + minutes * 60000 + second * 1000;
};

//chuyen thoi gian sang UTC
DateTime.convertToUTCTime = function DateTime$convertToUTCTime(localTime) {
    var year = localTime.getUTCFullYear();
    var month = localTime.getUTCMonth();
    var day = localTime.getUTCDate();
    var hour = localTime.getUTCHours();
    var minute = localTime.getUTCMinutes();
    var second = localTime.getUTCSeconds();
    var utcTime = new Date(year, month, day, hour, minute, second, 0);
    return utcTime;
};

//chuyen thoi gian sang UTC
DateTime.convertToUTCTimeTtht = function DateTime$convertToUTCTime(localTime) {
    var strDate = "{0}{1}{2}";
    var year = localTime.getUTCFullYear();
    var month = localTime.getUTCMonth();
    var day = localTime.getUTCDate();
    strDate = String.format(strDate, day, month, year);
    return strDate;
};

//ham tra ve nam tai thoi diem hien tai
DateTime.getCurrentYear = function DateTime$getCurrentYear() {
    var d = new Date();
    var y = d.getFullYear();
    return y;
};

//kiem tra xem time co trong khoang thoi gian start end hay ko?
DateTime.inRange = function DateTime$inRange(timeStart, timeEnd, timeCheck) {
    if (moment(timeStart).isSame(timeCheck))
        return true;
    if (moment(timeEnd).isSame(timeCheck))
        return true;
    else {
        if (moment(timeCheck).isBefore(timeEnd) && moment(timeStart).isBefore(timeCheck))
            return true;
    }
    return false;
};


//neu time1 > time2 => 1
//neu time1 = time2 => 0
//neu time1 < time2 => -1
DateTime.compareDateTime = function DateTime$compareDateTime(time1, time2) {
    if (moment(time1).isSame(time2))
        return 0;
    else {
        if (moment(time1).isBefore(time2))
            return -1;
        else
            return 1;
    }
};

//neu time1 > time2 => 1
//neu time1 = time2 => 0
//neu time1 < time2 => -1
DateTime.compareDate = function DateTime$compareDate(time1, time2) {
    var change = moment(time1).diff(moment(time2), 'days');
    if (change < 0) return -1;
    if (change > 0) return 1;
    return 0;
};

//tra ve ngay dau tien cua thang
DateTime.getStartOfMonth = function DateTime$getStartOfMonth(time, month) {
    var date = new Date(time.getFullYear(), month, 1); //chon ngay dau thang
    if (DateTime.compareDate(time, date) < 0)
        date = moment(date).subtract(1, 'y').toDate(); //lui ve nguyen 1 nam
    return date;
};

//tra ve ngay cuoi cung cua thang
DateTime.getEndOfMonth = function DateTime$getEndOfMonth(time, month) {
    var date = moment({ y: time.getFullYear(), M: month, d: 1 }).add(1, 'M').subtract(1, 'd').toDate(); //chon thang dau thang tiep theo, lui ve ngay cuoi thang
    if (DateTime.compareDate(time, date) < 0) {
        if (DateTime.compareDate(time, moment(date).subtract(1, 'M').toDate()) < 0) { //kiem tra xem co trong thang hay ko
            date = moment(date).subtract(1, 'y').toDate(); //lui ve nguyen 1 nam
        }
    }
    return date;
};

//convert string "DD/MM/YYYY" to date.
DateTime.convertToDate = function DateTime$convertToDate(datetimeString) {
    try {
        if (String.isNullOrEmpty(datetimeString)) return null;
        if (typeof datetimeString != 'string' || !datetimeString instanceof String) {
            return datetimeString;
        }
        return moment(datetimeString, DateTime.getDateFormat()).startOf('day').toDate();
    } catch (e) {
        console.error(e);
    }
    return null;
};

//them sec vao date
DateTime.addSecondsToTime = function DateTime$addSecondsToTime(time, secs) {
    return moment(time).add(secs, 's').toDate();
};
//them sec vao date
DateTime.addHoursToTime = function DateTime$addSecondsToTime(time, hours) {
    return moment(time).add(hours, 'h').toDate();
};
//them ngay vao date va chuyen ve chi ghi nhan ngay, ko co gio
DateTime.addDaysToTime = function DateTime$addDaysToTime(time, days) {
    return moment(time).add(days, 'd').startOf('day').toDate();
};
//them tuan vao date va chuyen ve chi ghi nhan ngay, ko co gio
DateTime.addWeekToTime = function DateTime$addWeekToTime(time, days) {
    return moment(time).add(days, 'w').startOf('day').toDate();
};
//them thang vao date va chuyen ve chi ghi nhan ngay, ko co gio
DateTime.addMonthsToTime = function DateTime$addMonthsToTime(time, months) {
    return moment(time).add(months, 'M').startOf('day').toDate();
};
//chuyen ve gio local
DateTime.convertToLocalTime = function DateTime$convertToLocalTime(utcTime) {
    var offset = '+7';
    var localtime = new Date(utcTime.getTime() + (3600000 * offset));
    return localtime;
};

//chuyen tu string datetime utc thanh gio local
DateTime.convertToLocalTimeString = function DateTime$convertToLocalTimeString(strUtcTime) {
    var utcTime = DateTime.convertToUTCTime(DateTime.convertToDatetime(strUtcTime));
    return DateTime.convertToLocalTime(utcTime);
};

//tra ve string date
DateTime.getDateString = function DateTime$getDateString(input, format) {
    if (input == null) return input;
    if (typeof input === 'string' || input instanceof String) {
        //neu la string thi convert theo format
        if (format)
            return moment(input, format).format(format);
        return moment(input, DateTime.getDateFormat()).format(DateTime.getDateFormat());
    } else {
        if (format)
            return moment(input).format(format);
        //neu khac thi de moment tu convert
        return moment(input).format(DateTime.getDateFormat());
    }
};

//tra ve string time
DateTime.getTimeString = function DateTime$getTimeString(input, format) {
    if (input == null) return input;
    if (typeof input === 'string' || input instanceof String) {
        //neu la string thi convert theo format
        if (format)
            return moment(input, format).format(format);
        return moment(input, DateTime.getTimeFormat()).format(DateTime.getTimeFormat());
    } else {
        if (format)
            return moment(input).format(format);
        return moment(input).format(DateTime.getTimeFormat());
    }
};

//tra ve string date time
DateTime.getDateTimeFullString = function DateTime$getDateTimeFullString(input) {
    if (input == null) return input;
    if (typeof input === 'string' || input instanceof String) {
        //neu la string thi convert theo format
        return moment(input, DateTime.getFullDateTimeFormat()).format(DateTime.getFullDateTimeFormat());
    } else {
        //neu khac thi de moment tu convert
        return moment(input).format(DateTime.getFullDateTimeFormat());;
    }
};

