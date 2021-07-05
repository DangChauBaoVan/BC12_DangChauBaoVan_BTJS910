function Validator() {
    this.kiemTraRong = function (value, spanId, mess) {
        // falsy value: 0, '', "", ``, null, undefined, false, NaN (Not a Number)
        // còn lại là truthy value
        if (!value) {
            getEle(spanId).style.display = 'block';
            getEle(spanId).innerHTML = mess;
            return false;
        }

        getEle(spanId).style.display = 'none';
        getEle(spanId).innerHTML = '';
        return true;
    }
    this.kiemTraDoDaiKiSo = function (value, spanId, mess, min, max) {
        var pattern = new RegExp("^[0-9]*$");
        if (pattern.test(value)) {
            if (value.length >= min && value.length <= max) {
                getEle(spanId).style.display = 'none';
                getEle(spanId).innerHTML = '';
                return true;
            }
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraDoDaiKiTu = function (value, spanId, mess, min, max) {
        if (value.length >= min && value.length <= max) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }

        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraChuoi = function (value, spanId, mess) {
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +

            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +

            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
        if (pattern.test(value)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraEmail = function (value, spanId, mess) {
        var pattern = new RegExp("^[a-z][a-z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$");
        if (pattern.test(value)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraPass = function (value, spanId, mess) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        if (value.match(pattern)) {
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraLuong = function (value, spanId, mess) {
        if(value >= 1000000 && value <= 20000000){
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraKiSo = function (value, spanId, mess) {
        var pattern = new RegExp("^[0-9]*$");
        if(pattern.test(value)){
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraChucVu =function (value, spanId, mess) {
        if( value == "Giám đốc" || value == "Trưởng phòng" || value == "Nhân viên"){
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
    this.kiemTraGioLam = function (value, spanId, mess){
        if(value >= 80 && value <=200){
            getEle(spanId).style.display = 'none';
            getEle(spanId).innerHTML = '';
            return true;
        }
        getEle(spanId).style.display = 'block';
        getEle(spanId).innerHTML = mess;
        return false;
    }
}