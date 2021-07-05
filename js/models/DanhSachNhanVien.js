function DanhSachNhanVien() {
    this.arr = [];
    
    this.themNhanVien = function(nhanVien) {
        this.arr.push(nhanVien);
    }
}
DanhSachNhanVien.prototype.timViTri = function(taiKhoan){
    var _index = this.arr.findIndex(function(item){
        return taiKhoan === item.taiKhoan;
    })
    return _index;
}

DanhSachNhanVien.prototype.xoaNhanVien = function(taiKhoan){
    var viTri = this.timViTri(taiKhoan);
    if( viTri != -1 ){
        this.arr.splice(viTri,1);
    }
}

DanhSachNhanVien.prototype.getNhanVien = function(taiKhoan){
    var viTri = this.timViTri(taiKhoan)
    if ( viTri != -1){
        return this.arr[viTri];
    }
}