const btnThem = document.getElementById("btnThem");
const modal = document.getElementById("myModal");
const btnDong = document.getElementById("btnDong");

btnThem.onclick = function () {
  modal.style.display = "block";
  modal.style.marginTop = "200px";
};

btnDong.onclick = function () {
  modal.style.display = "none";
};

let nhanViens = [];

function validateEmail(email) {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
}

function validatePassword(password) {
  const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/;
  return regex.test(password);
}

function validateDate(dateString) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(dateString);
}

function validateSalary(luong) {
  return !isNaN(luong) && luong >= 1000000 && luong <= 20000000;
}

function validateHours(hours) {
  return !isNaN(hours) && hours >= 80 && hours <= 200;
}

//thêm nhân viên
function addnhanVien() {
  const account = document.getElementById("tknv").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const date = document.getElementById("datepicker").value;
  const luong = document.getElementById("luongCB").value;
  const position = document.getElementById("chucvu").value;
  const hours = document.getElementById("gioLam").value;

  if (
    !account ||
    !name ||
    !validateEmail(email) ||
    !validatePassword(password) ||
    !validateDate(date) ||
    !validateSalary(luong) ||
    position === "Chọn chức vụ" ||
    !validateHours(hours)
  ) {
    document.getElementById("tableDanhSach").innerHTML =
      '<tr><td colspan="8">Thông tin không hợp lệ!</td></tr>';
    return;
  }
  
  const nhanVien = {
    account: account,
    name: name,
    email: email,
    password: password,
    date: date,
    luong: parseFloat(luong),
    position: position,
    hours: parseFloat(hours),
    tongLuong: 0,
    danhGia: "",
  };

  if (position === "Giám Đốc") {
    nhanVien.tongLuong = nhanVien.luong * 3;
  } else if (position === "Trưởng phòng") {
    nhanVien.tongLuong = nhanVien.luong * 2;
  } else {
    nhanVien.tongLuong = nhanVien.luong;
  }

  if (nhanVien.hours >= 192) {
    nhanVien.danhGia = "Xuất sắc";
  } else if (nhanVien.hours >= 176) {
    nhanVien.danhGia = "Giỏi";
  } else if (nhanVien.hours >= 160) {
    nhanVien.danhGia = "Khá";
  } else {
    nhanVien.danhGia = "Trung bình";
  }

  nhanViens.push(nhanVien);

  displaynhanViens();
}

function displaynhanViens() {
  const tableBody = document.getElementById("tableDanhSach");
  tableBody.innerHTML = "";

  nhanViens.forEach((nhanVien) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${nhanVien.account}</td>
                        <td>${nhanVien.name}</td>
                        <td>${nhanVien.email}</td>
                        <td>${nhanVien.date}</td>
                        <td>${nhanVien.position}</td>
                        <td>${nhanVien.tongLuong}</td>
                        <td>${nhanVien.danhGia}</td>
                        <td><button onclick="deletenhanVien('${nhanVien.account}')">Xóa</button></td>`;
    tableBody.appendChild(row);
  });
}

function deletenhanVien(account) {
  nhanViens = nhanViens.filter((nhanVien) => nhanVien.account !== account);
  displaynhanViens();
}

const btnThemNV = document.getElementById("btnThemNV").addEventListener("click", addnhanVien);

// cập nhật nhân viên
function updatenhanVien(account) {
   const nhanVienToUpdate = nhanViens.find((nhanVien) => nhanVien.account === account);
 
   if (!nhanVienToUpdate) {
     document.getElementById('tableDanhSach').innerHTML = '<tr><td colspan="8">Nhân viên không tồn tại!</td></tr>';
     return;
   }
 
   const newName = document.getElementById('name').value;
   const newEmail = document.getElementById('email').value;
   const newPassword = document.getElementById('password').value;
   const newDate = document.getElementById('datepicker').value;
   const newSalary = document.getElementById('luongCB').value;
   const newPosition = document.getElementById('chucvu').value;
   const newHours = document.getElementById('gioLam').value;
 
   if (!newName || !validateEmail(newEmail) || !validatePassword(newPassword) ||
       !validateDate(newDate) || !validateSalary(newSalary) || newPosition === "Chọn chức vụ" ||
       !validateHours(newHours)) {
     document.getElementById('tableDanhSach').innerHTML = '<tr><td colspan="8">Thông tin không hợp lệ!</td></tr>';
     return;
   }
 
   nhanVienToUpdate.name = newName;
   nhanVienToUpdate.email = newEmail;
   nhanVienToUpdate.password = newPassword;
   nhanVienToUpdate.date = newDate;
   nhanVienToUpdate.luong = parseFloat(newSalary);
   nhanVienToUpdate.position = newPosition;
   nhanVienToUpdate.hours = parseFloat(newHours);
 
   if (newPosition === "Giám đốc") {
     nhanVienToUpdate.tongLuong = nhanVienToUpdate.luong * 3;
   } else if (newPosition === "Trưởng phòng") {
     nhanVienToUpdate.tongLuong = nhanVienToUpdate.luong * 2;
   } else {
     nhanVienToUpdate.tongLuong = nhanVienToUpdate.luong;
   }
 
   if (nhanVienToUpdate.hours >= 192) {
     nhanVienToUpdate.danhGia = "Xuất sắc";
   } else if (nhanVienToUpdate.hours >= 176) {
     nhanVienToUpdate.danhGia = "Giỏi";
   } else if (nhanVienToUpdate.hours >= 160) {
     nhanVienToUpdate.danhGia = "Khá";
   } else {
     nhanVienToUpdate.danhGia = "Trung bình";
   }
 
   displaynhanViens();
 }
 
 document.getElementById('btnCapNhat').addEventListener('click', function () {
   const accountToUpdate = document.getElementById('tknv').value;
   updatenhanVien(accountToUpdate);
 });
 
