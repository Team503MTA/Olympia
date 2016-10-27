var fdLocale = {
                fullMonths:["Tháng Một","Tháng Hai","Tháng Ba","Tháng 4","Tháng 5","Tháng sáu","Tháng bảy","Tháng tám","Tháng chín","Tháng mười","Tháng mười một","Tháng mười hai"],
                monthAbbrs:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                fullDays:  ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                dayAbbrs:  ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
                titles:    ["Tháng trước","Tháng sau","Năm trước","Năm sau", "Hôm nay", "Mở lịch", "wk", "Tuần [[%0%]]/[[%1%]]", "Tuần", "Chọn ngày", "Click \u0026 Drag to move", "Display \u201C[[%0%]]\u201D first", "Go to Today\u2019s date", "Disabled date:"],
                firstDayOfWeek:0
};
try { 
        if("datePickerController" in window) { 
                datePickerController.loadLanguage(); 
        }; 
} catch(err) {}; 
