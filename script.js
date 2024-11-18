// بيانات الحجز
const schedule = {
    'الأحد': ["", "", "", "", "", "", "", "", ""],
    'الإثنين': ["", "", "", "", "", "", "", "", ""],
    'الثلاثاء': ["", "", "", "", "", "", "", "", ""],
    'الأربعاء': ["", "", "", "", "", "", "", "", ""],
    'الخميس': ["", "", "", "", "", "", "", "", ""]
};

// دالة لعرض الجدول الأسبوعي مع الحصص المحجوزة
function renderSchedule() {
    const tableBody = document.getElementById("schedule-table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ''; // مسح محتوى الجدول لإعادة تعبئته

    // حساب تاريخ بداية الأسبوع
    const weekInput = document.getElementById('week').value;
    const startDate = new Date(weekInput + "-1"); // الأحد في الأسبوع المختار

    // تكرار لكل يوم في الجدول
    let currentDate = startDate;
    for (const day in schedule) {
        const row = document.createElement("tr");

        // إدخال اليوم والتاريخ
        const dayCell = document.createElement("td");
        dayCell.textContent = day; // إدخال اسم اليوم في العمود الأول
        row.appendChild(dayCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = currentDate.toLocaleDateString('ar-EG'); // عرض التاريخ
        row.appendChild(dateCell);

        // تكرار لكل حصة في اليوم
        schedule[day].forEach((period, index) => {
            const cell = document.createElement("td");
            if (period === "") { // إذا كانت الحصة متاحة
                cell.textContent = "متاح";
                cell.classList.add("available");
                cell.setAttribute("onclick", `bookSlot(this, '${day}', ${index})`);
            } else { // إذا كانت الحصة محجوزة
                cell.textContent = `${period.teacher} - ${period.subject} - ${period.class}`;
                cell.classList.add("booked");
            }
            row.appendChild(cell);
        });

        tableBody.appendChild(row); // إضافة الصف للجدول

        // الانتقال إلى اليوم التالي
        currentDate.setDate(currentDate.getDate() + 1);
    }
}

// دالة لحجز الحصة
function bookSlot(cell, day, periodIndex) {
    const teacherName = document.getElementById("teacher-name").value;
    const subject = document.getElementById("subject").value;
    const className = document.getElementById("class").value;

    if (teacherName && subject && className) {
        // حجز الحصة
        schedule[day][periodIndex] = {
            teacher: teacherName,
            subject: subject,
            class: className
        };

        // تحديث الجدول
        renderSchedule();

        // تغيير لون الخلية إلى وردي بعد الحجز
        cell.classList.remove("available");
        cell.classList.add("booked");

        // عرض رسالة تأكيد الحجز
        const notification = document.getElementById("notification");
        notification.innerHTML = `تم حجز الحصة بنجاح!<br>المعلم: ${teacherName}<br>المادة: ${subject}<br>الصف: ${className}`;
        notification.style.display = 'block';
    } else {
        alert("يرجى ملء جميع الحقول.");
    }
}

// استدعاء renderSchedule عند تغيير الأسبوع
document.getElementById("week").addEventListener("change", renderSchedule);

// استدعاء renderSchedule عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", renderSchedule);
