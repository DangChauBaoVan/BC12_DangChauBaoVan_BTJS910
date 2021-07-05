var dsnv = new DanhSachNhanVien();
var validator = new Validator();
function getEle(id) {
    return document.getElementById(id);
}

//Function hiển thị danh sách nhân viên
var hienThiDanhSachNV = function (arr) {
    var content = "";

    arr.map(function (nv, index) {

        content += `
                  <tr>
                      <td>${nv.taiKhoan}</td>
                      <td>${nv.hoTen}</td>
                      <td>${nv.email}</td>
                      <td>${nv.ngayLam}</td>
                      <td>${nv.chucVu}</td>
                      <td>${nv.tongLuong}</td>
                      <td>${nv.loaiNhanVien}</td>
                      <td>
                          <button class="btn btn-info" onclick ="suaNhanVien('${nv.taiKhoan}')" data-toggle="modal"
                          data-target="#myModal">Sửa</button>
                          <button class="btn btn-danger" onclick ="_xoaNhanVien('${nv.taiKhoan}')">Xoá</button>
                      </td>
                  </tr>
          `;
    });
    getEle("tableDanhSach").innerHTML = content;
};

//Function tính lương
var tinhTongLuong = function (luongCoBan, chucVu) {
    var tongLuong = 0;
    switch (chucVu) {
        case "Giám đốc":
            tongLuong = luongCoBan * 3;
            break;
        case "Trưởng phòng":
            tongLuong = luongCoBan * 2;
            break;
        case "Nhân viên":
            tongLuong = luongCoBan;
            break;
    }
    return tongLuong;
}

//Function xếp loại nhân viên
var xepLoaiNhanVien = function (gioLam) {
    var xepLoai;
    if (gioLam >= 192) {
        xepLoai = 'Xuất Sắc';
    } else if (gioLam >= 176 && gioLam < 192) {
        xepLoai = 'Giỏi';
    } else if (gioLam >= 160 && gioLam < 176) {
        xepLoai = 'Khá';
    } else {
        xepLoai = 'Trung Bình';
    }
    return xepLoai;
}

//Lưu dữ liệu vào localStorage
var setLocalStorage = function () {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.arr));
};

//Lấy dữ liệu từ localStorage
var getLocalStorage = function () {
    if (localStorage.getItem("DSNV")) {
        dsnv.arr = JSON.parse(localStorage.getItem("DSNV"));
        hienThiDanhSachNV(dsnv.arr);
    }
};

//Function lấy ngày hiện tại
var getTheDayToDay = function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

//Xóa dữ liệu đã điền
var clearInput = function () {
    getEle("tknv").value = "";
    getEle("name").value = "";
    getEle("email").value = "";
    getEle("password").value = "";
    getEle("datepicker").value = getTheDayToDay();
    getEle("luongCB").value = "";
    getEle("chucvu").value = "Chọn chức vụ";
    getEle("gioLam").value = "";
}
//Xóa thông báo lỗi
var clearThongBao = function () {
    getEle("tbTKNV").style.display = 'none';
    getEle("tbTen").style.display = 'none';
    getEle("tbEmail").style.display = 'none';
    getEle("tbMatKhau").style.display = 'none';
    getEle("tbNgay").style.display = 'none';
    getEle("tbLuongCB").style.display = 'none';
    getEle("tbChucVu").style.display = 'none';
    getEle("tbGiolam").style.display = 'none';
}

getLocalStorage();

//Xóa nhân viên
function _xoaNhanVien(taiKhoan) {
    dsnv.xoaNhanVien(taiKhoan);
    hienThiDanhSachNV(dsnv.arr);
    setLocalStorage();
}

getEle("btnThem").addEventListener("click", function () {
    btnThemNV.style.display = 'block';
    btnCapNhat.style.display = 'block';
    btnCapNhat.style.display = 'none';
    if (btnThemNV.style.display == "none") {
        btnThemNV.style.display = "block";
    }
})
getEle("btnDong").addEventListener("click", function () {
    clearInput();
    clearThongBao();
})
// Show/Hide Password
getEle("passwordToggle").addEventListener("click", function () {
    var password = getEle('password');
    if (password.type === "password") {
        password.type = "text";
        getEle("passwordToggle").src = "./img/visibility.png";
    } else {
        password.type = "password";
        getEle("passwordToggle").src = "./img/private.png";
    }
})
// Allow only Number and Dot
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
getEle("btnThemNV").addEventListener("click", function () {
    /**
     * Lấy giá trị người dùng nhập vào
     */
    var taiKhoan = getEle("tknv").value;
    var tenNV = getEle("name").value;
    var email = getEle("email").value;
    var matKhau = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCoBan = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLam = getEle("gioLam").value;

    luongCoBan = Number(luongCoBan.replace(/[^0-9.-]+/g, ""));

    var isValid = true;
    //Validate taiKhoan
    isValid &=
        validator.kiemTraRong(taiKhoan, "tbTKNV", "(*) Tài khoản nhân viên không được rỗng") &&
        validator.kiemTraDoDaiKiSo(
            taiKhoan,
            "tbTKNV",
            "(*) Vui lòng nhập từ 4 - 6 kí số",
            4,
            6
        );
    //Validate tenNV
    isValid &=
        validator.kiemTraRong(
            tenNV,
            "tbTen",
            "(*) Tên nhân viên không được rỗng"
        ) &&
        validator.kiemTraChuoi(
            tenNV,
            "tbTen",
            "(*) Tên nhân viên không được chứa số"
        );
    //Validate email
    isValid &= validator.kiemTraRong(email, "tbEmail", "(*) Email không được bỏ trống") && validator.kiemTraEmail(email, "tbEmail", "(*) Email không đúng định dạng");
    //Validate password
    isValid &= validator.kiemTraRong(matKhau, "tbMatKhau", "(*) Mật khẩu không được bỏ trống") && validator.kiemTraPass(matKhau, "tbMatKhau", "(*) Password từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)");
    //Validate luongCoBan
    isValid &= validator.kiemTraRong(luongCoBan, "tbLuongCB", "(*) Lương cơ bản không được bỏ trống") &&
        validator.kiemTraLuong(luongCoBan, "tbLuongCB", "(*) Lương cơ bản phải từ 1.000.000-20.000.000");
    //Validate chucVu
    isValid &= validator.kiemTraChucVu(chucVu, "tbChucVu", "(*) Bạn chưa chọn chức vụ");
    //Validate gioLam

    isValid &= validator.kiemTraRong(gioLam, "tbGiolam", "(*) Giờ làm không được bỏ trống") && validator.kiemTraGioLam(gioLam, "tbGiolam", "(*) Giờ làm phải nằm trong khoảng 80-200");
    if (!isValid) return;

    var tongLuong = Intl.NumberFormat().format(tinhTongLuong(luongCoBan, chucVu));

    var xepLoai = xepLoaiNhanVien(gioLam);



    var nhanVien = new NhanVien(taiKhoan, tenNV, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam, tongLuong, xepLoai);
    dsnv.themNhanVien(nhanVien);

    hienThiDanhSachNV(dsnv.arr);
    setLocalStorage();
    clearInput();
});

// Lấy nhân viên theo tài khoản
function suaNhanVien(tk) {
    var nv = dsnv.getNhanVien(tk);
    console.log(nv.hoTen)
    var btnThemNV = getEle("btnThemNV");

    var btnCapNhat = getEle("btnCapNhat");

    btnThemNV.style.display = 'none';

    if (btnCapNhat.style.display === "none") {
        btnCapNhat.style.display = 'block';
    }
    var taiKhoan = getEle("tknv");
    var tenNV = getEle("name");
    var email = getEle("email");
    var matKhau = getEle("password");
    var ngayLam = getEle("datepicker");
    var luongCoBan = getEle("luongCB");
    var chucVu = getEle("chucvu");
    var gioLam = getEle("gioLam");

    taiKhoan.value = nv.taiKhoan;
    tenNV.value = nv.hoTen;
    email.value = nv.email;
    matKhau.value = nv.matKhau;
    ngayLam.value = nv.ngayLam;
    luongCoBan.value = nv.luongCoBan;
    chucVu.value = nv.chucVu;
    gioLam.value = nv.gioLam;

    
    btnCapNhat.addEventListener("click", function () {
       
        luongCoBan.value = Number((luongCoBan.value).replace(/[^0-9.-]+/g, ""));
        var isValid = true;
        //Validate taiKhoan
        isValid &=
            validator.kiemTraRong(taiKhoan.value, "tbTKNV", "(*) Tài khoản nhân viên không được rỗng") &&
            validator.kiemTraDoDaiKiSo(
                taiKhoan.value,
                "tbTKNV",
                "(*) Vui lòng nhập từ 4 - 6 kí số",
                4,
                6
            );
        //Validate tenNV
        isValid &=
            validator.kiemTraRong(
                tenNV.value,
                "tbTen",
                "(*) Tên nhân viên không được rỗng"
            ) &&
            validator.kiemTraChuoi(
                tenNV.value,
                "tbTen",
                "(*) Tên nhân viên không được chứa số"
            );
        //Validate email
        isValid &= validator.kiemTraRong(email.value, "tbEmail", "(*) Email không được bỏ trống") && validator.kiemTraEmail(email.value, "tbEmail", "(*) Email không đúng định dạng");
        //Validate password
        isValid &= validator.kiemTraRong(matKhau.value, "tbMatKhau", "(*) Mật khẩu không được bỏ trống") && validator.kiemTraPass(matKhau.value, "tbMatKhau", "(*) Password từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)");
        //Validate luongCoBan
        isValid &= validator.kiemTraRong(luongCoBan.value, "tbLuongCB", "(*) Lương cơ bản không được bỏ trống") &&
            validator.kiemTraLuong(luongCoBan.value, "tbLuongCB", "(*) Lương cơ bản phải từ 1.000.000-20.000.000");
        //Validate chucVu
        isValid &= validator.kiemTraChucVu(chucVu.value, "tbChucVu", "(*) Bạn chưa chọn chức vụ");
        //Validate gioLam
        isValid &= validator.kiemTraRong(gioLam.value, "tbGiolam", "(*) Giờ làm không được bỏ trống") && validator.kiemTraGioLam(gioLam.value, "tbGiolam", "(*) Giờ làm phải nằm trong khoảng 80-200");
        if (!isValid) return;
        var tongLuong = Intl.NumberFormat().format(tinhTongLuong(luongCoBan.value, chucVu.value));

        var xepLoai = xepLoaiNhanVien(gioLam.value);

        nv.taiKhoan = taiKhoan.value;
        nv.hoTen = tenNV.value;
        nv.email = email.value;
        nv.matKhau = matKhau.value;
        nv.ngayLam = ngayLam.value;
        nv.luongCoBan = luongCoBan.value;
        nv.chucVu = chucVu.value;
        nv.gioLam = gioLam.value;
        nv.tongLuong = tongLuong;
        nv.loaiNhanVien = xepLoai;
        debugger
        setLocalStorage();
        location.reload();

    })




}
var search = function(arr,value){
    var result = [];
    arr.map(function(nv,index){
        if(nv.loaiNhanVien === value){
            result.push(nv);
        }
    })
    return result;
}
getEle("searchName").addEventListener("keyup", function (event){
    if (event.keyCode === 13) {
        event.preventDefault();
        getEle("btnTimNV").click();
      }
})
getEle("btnTimNV").addEventListener("click", function (){
    var searchValue = getEle("searchName").value;
    var result = [];
    result = search(dsnv.arr,searchValue);
    console.log(result.length)
    if(result.length == 0){
        getEle("tableDanhSach").innerHTML = `
        <tr>
            <td colspan="8" class="text-center">
                <h2>Không tìm thấy kết quả!</h2>
                <img src="./img/no-search-found.png">
            </td>
        </tr>
        `;
        return;
    }
    hienThiDanhSachNV(result);

})


