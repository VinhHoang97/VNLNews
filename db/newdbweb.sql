create table PhanHeNguoiDung
(	IDPhanHe varchar(10) not null primary key,
	TenPhanHe varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci not null 
);	
create table TaiKhoanThe
(	SKT varchar(15) not null primary key,
	ChuSoHuu int,
	SoDu FLOAT
	);
create table NguoiDung
( ID INT  not null primary KEY auto_increment,
	UserName varchar(50) not null unique,
	Password varchar(50) not null,
	HoTen varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci,
	GioiTinh varchar(10),
	NgaySinh date,
	Email varchar(50) not null unique,
	SDT varchar(15) not null unique,
	PhanHe varchar(10),
	NgayDangKy datetime,
	NgayHetHan datetime,
	TinhTrang varchar(20)
	 );

create table ChuyenMuc #category
( IDChuyenMuc int not null primary key auto_increment,
	TenChuyenMuc varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci not null,
	TenChuyenMuc_KhongDau varchar(50),
	ChuyenMucCha int
	);
create table Nhan #tag
( IDTag int not null primary key auto_increment,
  TenTag varchar(20) not null
  );
create table Duyet
( IDDuyet int not null primary key auto_increment,
Loai varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci
);
create table BaiViet
( IDBaiViet int not null primary key auto_increment,
  TieuDe varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci not null,
  TieuDe_KhongDau varchar(255),
  ChuyenMuc int,
  NgayDang datetime,
  NoiDung text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  TomTat text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  LuotXem int,
  PhongVien int,
  BienTapVien int,
  DaDuyet int
  );
create table urlHinhAnh
( IDHinh INT  primary KEY auto_increment,
  urllinkHinh VARCHAR(255) not null UNIQUE
  );
create table BinhLuan
( IDBinhLuan int auto_increment,
  BaiViet int not null,
  DocGia int not null,
  NoiDung text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  TinhTrang INT, # 1 : an, 0 : hien thi
   primary key(IDBinhLuan,BaiViet,DocGia)
   );
  
create table Nhan_BaiViet
(  IDBaiViet int not null,
	IDTag int not null,
	primary key(IDBaiViet,IDTag)
	);
create table BaiViet_HinhAnh
( IDBaiViet int,
  IDHinh int,
  primary key(IDBaiViet,IDHinh)
  );
  ----------------------------	KHOA NGOAI	

alter table ChuyenMuc
add constraint Fk_CM_CM	
foreign key (ChuyenMucCha)
references ChuyenMuc(IDChuyenMuc);

alter table NguoiDung
add constraint Fk_user_PH	
foreign key (PhanHe)
references PhanHeNguoiDung(IDPhanHe);

alter table TaiKhoanThe
add constraint Fk_The_user
foreign key (ChuSoHuu)
references NguoiDung(ID);

alter table BaiViet
add constraint Fk_BV_PV
foreign key (PhongVien)
references NguoiDung(ID);

alter table BaiViet
add constraint Fk_BV_BTV
foreign key (BienTapVien)
references NguoiDung(ID);

alter table BaiViet
add constraint Fk_BV_CM
foreign key (ChuyenMuc)
references ChuyenMuc(IDChuyenMuc);

alter table Nhan_BaiViet
add constraint Fk_BV_Nhan
foreign key (IDBaiViet)
references BaiViet(IDBaiViet);

alter table Nhan_BaiViet
add constraint Fk_Nhan
foreign key (IDTag)
references Nhan(IDTag);

alter table BaiViet_HinhAnh
add constraint Fk_BV
foreign key (IDBaiViet)
references BaiViet(IDBaiViet);

alter table BaiViet_HinhAnh
add constraint Fk_image
foreign key (IDHinh)
references urlHinhAnh(IDHinh);

alter table BinhLuan
add constraint Fk_CMT_BV
foreign key (BaiViet)
references BaiViet(IDBaiViet);

alter table BinhLuan
add constraint Fk_CMT_DocGia
foreign key (DocGia)
references NguoiDung(ID);

alter table BaiViet
add constraint Fk_BV_Duyet
foreign key (DaDuyet)
references Duyet(IDDuyet);
-- insert table select * from urlhinhanh
insert into urlhinhanh(urllinkHinh) values('img/product_img/1.jpg');
insert into urlhinhanh(urllinkHinh) values('img/product_img/2.jpg');
insert into urlhinhanh(urllinkHinh) values('img/product_img/3.jpg');
insert into urlhinhanh(urllinkHinh) values('img/product_img/4.jpg');
insert into urlhinhanh(urllinkHinh) values('img/product_img/5.jpg');
insert into urlhinhanh(urllinkHinh) values('img/product_img/6.jpg');
insert into urlhinhanh(urllinkHinh) values('img/product_img/7.jpg');
insert into urlhinhanh(urllinkHinh) values('img/product_img/8.jpg');
insert into urlhinhanh(urllinkHinh) values('img/product_img/9.jpg');
insert into urlhinhanh(urllinkHinh) values('img/product_img/10.jpg');
insert into urlhinhanh(urllinkHinh) values('img/product_img/11.jpg');
insert into urlhinhanh(urllinkHinh) values('img/product_img/12.jpg');
insert into urlhinhanh(urllinkHinh) values('img/product_img/13.jpg');
insert into urlhinhanh(urllinkHinh) values('img/product_img/14.jpg');
-- insert table select * from Duyet
insert into Duyet( Loai) values('Đã được duyệt & chờ xuất bản');
insert into Duyet(Loai) values('Đã xuất bản');
insert into Duyet(Loai) values('Bị từ chối');
insert into Duyet(Loai) values('Chưa được duyệt');
-- insert table Nhan
-- function tạo IDNhan
insert into Nhan( TenTag) values('Marvel');
insert into Nhan( TenTag) values('Triệu Lệ Dĩnh');
insert into Nhan( TenTag) values('Nhạc Việt');
insert into Nhan( TenTag) values('Lễ hội');
insert into Nhan( TenTag) values('Du lịch');
insert into Nhan( TenTag) values('Sam');
insert into Nhan( TenTag) values('Cá');
insert into Nhan( TenTag) values('Vú sữa');
insert into Nhan( TenTag) values('Ớt');
insert into Nhan( TenTag) values('Cắt tay');
insert into Nhan( TenTag) values('Hỗn chiến');
-- insert table chuyenmuc
insert into chuyenmuc( TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Đời sống','Doi song', null);
insert into chuyenmuc( TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Kinh doanh','Kinh doanh', null);
insert into chuyenmuc( TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Văn hóa','Van hoa', null);
insert into chuyenmuc( TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Giải trí','Giai tri', null);
insert into chuyenmuc( TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Thể thao','The thao', null);
insert into chuyenmuc( TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Xã hội','Xa hoi', 1);
insert into chuyenmuc( TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Pháp luật','Phap luat', 1);
insert into chuyenmuc( TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Nông sản','Nong san', 2);
insert into chuyenmuc( TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Hải sản','Hai san', 2);
insert into chuyenmuc( TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Du lịch','Du lich', 3);
insert into chuyenmuc(TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Ẩm thực','Am thuc', 3);
insert into chuyenmuc(TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Âm nhạc','Am nhac', 4);
insert into chuyenmuc( TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Điện ảnh, Truyền hình','Dien anh, Truyen hinh', 4);
insert into chuyenmuc(TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Bóng đá','Bong da', 5);
insert into chuyenmuc(TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('Các môn khác','Cac mon khac', 5);
-- insert table PhanHeNguoiDung
insert into phanhenguoidung(IDPhanHe, TenPhanHe) values('PH001','Admin');
insert into phanhenguoidung(IDPhanHe, TenPhanHe) values('PH002','Biên tập viên');
insert into phanhenguoidung(IDPhanHe, TenPhanHe) values('PH003','Phóng viên');
insert into phanhenguoidung(IDPhanHe, TenPhanHe) values('PH004','Độc giả');


-- insert table select * from NguoiDung
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('Admin','123456','Admin','Nam/Nữ',Null, 'abc@gmail.com', '0326418677', 'PH001',Null, Null,Null);
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('BTV1','123456','Nguyễn Mỹ Linh','Nữ','1997-09-09', 'nmlinh@gmail.com', '0923456177', 'PH002',Null, Null,Null);
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('BTV2','123456','Bùi Thanh Nguyệt','Nữ','1997-01-29', 'btnguyet@gmail.com', '0977776566', 'PH002',Null, Null,Null);
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('BTV3','123456','Hoàng Nguyễn Quốc Vinh','Nam','1997-02-07', 'hnqvinh@gmail.com', '0325656899', 'PH002',Null, Null,Null);
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('PV1','123456','Nguyễn Văn An','Nam','1990-11-01', 'nvan@gmail.com', '0901220007', 'PH003',Null, Null,Null);
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('PV2','123456','Nguyễn Thành Thái','Nam','1892-01-02', 'ntthai@gmail.com', '0911110007', 'PH003',Null, Null,Null);
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('PV3','123456','Hoàng Hồng Hà','Nữ','1899-05-03', 'hhha@gmail.com', '0322130007', 'PH003',Null, Null,Null);
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('PV4','123456','Tống Thiện Hưng','Nam','1992-09-04', 'tthung@gmail.com', '0909992349', 'PH003',Null, Null,Null);
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('PV5','123456','Tăng Thanh Hằng','Nữ','1890-10-05', 'tthang@gmail.com', '0928761894', 'PH003',Null, Null,Null);
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('DG1','123456','Nguyễn Thanh Tâm','Nữ','1995-12-17', 'nttam@gmail.com', '0655410009', 'PH004','2019-05-16', '2019-05-23','VIP');
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('DG2','123456','Nguyễn Thành Nam','Nam','1992-10-19', 'ntnam@gmail.com', '0305416089', 'PH004','2019-04-16', '2019-04-23','NOT VIP');
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('DG3','123456','Lê Quang Nhật','Nam','1998-10-19', 'lqnhat@gmail.com', '0356742844', 'PH004','2019-05-12', '2019-05-19','VIP');
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('DG4','123456','Lê Thiên Thiên','Nữ','1999-11-21', 'ltthien@gmail.com', '0346677804', 'PH004','2019-05-12', '2019-05-19','VIP');
insert into nguoidung(UserName, Password, HoTen, GioiTinh, NgaySinh, Email, SDT, PhanHe,  NgayDangKy, NgayHetHan, TinhTrang) values('DG5','123456','Lê Ý Nhan','Nữ','1991-06-07', 'lynhan@gmail.com', '0987901844', 'PH004','2019-05-11', '2019-05-18','VIP');
-- insert table TaiKhoanThe
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('123456789',2, 500000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('091248973',3, 1500000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('143646576',4, 400000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('143647834',5, 500000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('154365886',6, 100000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('134365786',7, 500000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('814873684',8, 900000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('198398798',9, 500000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('174682357',10, 1800000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('120746833',11, 5100000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('192870972',12, 3200000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('197489891',13, 1600000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('889102383',14, 1500000);
---------------- insert table BaiViet
insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Iron Man & Captain America bắt tay làm hòa trong trailer Avengers: Endgame chỉ là cảnh quay giả?', 'Iron Man & Captain America bat tay lam hoa trong trailer Avengers: Endgame chi la canh quay gia?', 13, '2019-04-10 16:00:00',
'Mặc dù liên tục quảng bá cho Avengers: Endgame (Hồi kết) suốt nhiều tháng trời nhưng Marvel Studios đặc biệt giữ bí mật về nội dung phim, không để lộ ra ngoài dù chỉ là một chi tiết nhỏ. Chính vì thế, những gì mà fan biết được qua các teaser, trailer hầu hết chỉ là hình ảnh rời rạc, không thể dự đoán chuyện gì sẽ xảy ra. Tuy nhiên gần đây, trong trailer mới nhất, các fan đã vô cùng thích thú khi chứng kiến cảnh hội ngộ giữa Iron Man và Captain America.
Sau khi Iron Man bị kẹt ở hành tinh Titan không rõ sống chết, nhiều người cho rằng anh và Nebula sẽ trở về trái đất, tìm cách hội ngộ với các Avengers còn lại. Và cảnh Iron Man gặp Captain America cũng là một phân đoạn khi tất cả đoàn tụ. Thế nhưng khi được hỏi về điều này, chính đạo diễn Joe Russo cho biết cảnh đặc biệt đó sẽ không xuất hiện trong phim.
Mặc dù câu trả lời khá bâng quơ và kết thúc bằng một nụ cười nhưng có lẽ điều mà Joe nói là sự thật. Sau đó, Anthony Russo cố gắng kể nhiều hơn về câu chuyện và đánh lạc hướng khán giả, nhằm không để Joe tiết lộ về nội dung phim. Cuối cùng, Joe cũng nói: “Cũng có thể cảnh đó sẽ xuất hiện trong phim”. Tuy nhiên lúc này, có rất ít người tin vào cách cả hai đang cố gắng che giấu sự thật.
Iron Man & Captain America bắt tay làm hòa trong trailer Avengers: Endgame chỉ là cảnh quay giả? SaoStar 10/04/19 16:00 GMT+7122 liên quanGốc Thông tin được úp mở bởi chính Joe Russo - một trong cặp đôi anh em đạo diễn trong phim Avengers: Endgame (Hồi kết). Mặc dù liên tục quảng bá cho Avengers: Endgame (Hồi kết)suốt nhiều tháng trời nhưng Marvel Studios đặc biệt giữ bí mật về nội dung phim, không để lộ ra ngoài dù chỉ là một chi tiết nhỏ. Chính vì thế, những gì mà fan biết được qua các teaser, trailer hầu hết chỉ là hình ảnh rời rạc, không thể dự đoán chuyện gì sẽ xảy ra. Tuy nhiên gần đây, trong trailer mới nhất, các fan đã vô cùng thích thú khi chứng kiến cảnh hội ngộ giữa Iron Man và Captain America. Cảnh gặp nhau giữa 2 nhân vật trong trailer. Sau khi Iron Man bị kẹt ở hành tinh Titan không rõ sống chết, nhiều người cho rằng anh và Nebula sẽ trở về trái đất, tìm cách hội ngộ với các Avengers còn lại. Và cảnh Iron Man gặp Captain America cũng là một phân đoạn khi tất cả đoàn tụ. Thế nhưng khi được hỏi về điều này, chính đạo diễn Joe Russo cho biết cảnh đặc biệt đó sẽ không xuất hiện trong phim. Trailer cuối của Avengers: Endgame Mặc dù câu trả lời khá bâng quơ và kết thúc bằng một nụ cười nhưng có lẽ điều mà Joe nói là sự thật. Sau đó, Anthony Russo cố gắng kể nhiều hơn về câu chuyện và đánh lạc hướng khán giả, nhằm không để Joe tiết lộ về nội dung phim. Cuối cùng, Joe cũng nói: “Cũng có thể cảnh đó sẽ xuất hiện trong phim”. Tuy nhiên lúc này, có rất ít người tin vào cách cả hai đang cố gắng che giấu sự thật. Mặc dù nhiều lần bị sự cố “lỡ miệng” do diễn viên, những người được thưởng thức trước bộ phim hay chính ekip, thế nhưng nhìn chung, việc giữ bí mật về nội dung Avengers: Endgameđược thực hiện khá tốt. Chính bộ đôi đạo diễn cũng thừa nhận rằng đã đưa những cảnh quay không có trong phim vào trailer để nhằm đánh lạc hướng suy nghĩ và tạo bất ngờ cho mọi người khi thưởng thức tác phẩm. Đây là một điều khá thú vị, thúc đẩy trí tưởng tượng của khán giả về nội dung phim và nhận lại một cái kết bất ngờ nằm ngoài mong đợi. 
Iron Man & Captain America bắt tay làm hòa trong trailer Avengers: Endgame chỉ là cảnh quay giả? SaoStar 10/04/19 16:00 GMT+7122 liên quanGốc Thông tin được úp mở bởi chính Joe Russo - một trong cặp đôi anh em đạo diễn trong phim Avengers: Endgame (Hồi kết). Mặc dù liên tục quảng bá cho Avengers: Endgame (Hồi kết)suốt nhiều tháng trời nhưng Marvel Studios đặc biệt giữ bí mật về nội dung phim, không để lộ ra ngoài dù chỉ là một chi tiết nhỏ. Chính vì thế, những gì mà fan biết được qua các teaser, trailer hầu hết chỉ là hình ảnh rời rạc, không thể dự đoán chuyện gì sẽ xảy ra. Tuy nhiên gần đây, trong trailer mới nhất, các fan đã vô cùng thích thú khi chứng kiến cảnh hội ngộ giữa Iron Man và Captain America. Cảnh gặp nhau giữa 2 nhân vật trong trailer. Sau khi Iron Man bị kẹt ở hành tinh Titan không rõ sống chết, nhiều người cho rằng anh và Nebula sẽ trở về trái đất, tìm cách hội ngộ với các Avengers còn lại. Và cảnh Iron Man gặp Captain America cũng là một phân đoạn khi tất cả đoàn tụ. Thế nhưng khi được hỏi về điều này, chính đạo diễn Joe Russo cho biết cảnh đặc biệt đó sẽ không xuất hiện trong phim. Trailer cuối của Avengers: Endgame Mặc dù câu trả lời khá bâng quơ và kết thúc bằng một nụ cười nhưng có lẽ điều mà Joe nói là sự thật. Sau đó, Anthony Russo cố gắng kể nhiều hơn về câu chuyện và đánh lạc hướng khán giả, nhằm không để Joe tiết lộ về nội dung phim. Cuối cùng, Joe cũng nói: “Cũng có thể cảnh đó sẽ xuất hiện trong phim”. Tuy nhiên lúc này, có rất ít người tin vào cách cả hai đang cố gắng che giấu sự thật. Mặc dù nhiều lần bị sự cố “lỡ miệng” do diễn viên, những người được thưởng thức trước bộ phim hay chính ekip, thế nhưng nhìn chung, việc giữ bí mật về nội dung Avengers: Endgameđược thực hiện khá tốt. Chính bộ đôi đạo diễn cũng thừa nhận rằng đã đưa những cảnh quay không có trong phim vào trailer để nhằm đánh lạc hướng suy nghĩ và tạo bất ngờ cho mọi người khi thưởng thức tác phẩm. Đây là một điều khá thú vị, thúc đẩy trí tưởng tượng của khán giả về nội dung phim và nhận lại một cái kết bất ngờ nằm ngoài mong đợi. Hơn ai hết, có lẽ anh em nhà Russo là những người mong chờ bộ phim lên sóng nhất, vì đến lúc họ được chứng kiến thành quả mà mình dày công tạo ra trong suốt thời gian dài. Đâu là những cảnh thật và đâu là cảnh thêm vào để “tung hỏa mù” trước người hâm mộ trong trailer của bộ phim? Câu trả lời sẽ được hé lộ khi tác phẩm chính thức công chiếu ngày 26/4 này!'
,'Iron Man & Captain America bắt tay làm hòa trong trailer Avengers: Endgame chỉ là cảnh quay giả?', 100, 5, 2, 1);

insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Triệu Lệ Dĩnh che kín mặt trong lần đầu xuất hiện sau 2 tháng sinh con','Trieu Le Dinh che kin mat trong lan dau xuat hien sau 2 thang sinh con', 13, '2019-04-04 09:40:00',
'Triệu Lệ Dĩnh không xuất hiện trước công chúng kể từ khi sinh con cách đây 2 tháng. Mới đây, phóng viên bắt gặp cô và chồng đến một trung tâm nghệ thuật.
Ngày 4/6, trang Sohu đưa tin Triệu Lệ Dĩnh cùng chồng là nam diễn viên Phùng Thiệu Phong bị bắt gặp khi đi ăn cùng bạn bè. Đây là lần đầu tiên nữ diễn viên Minh Lan truyện xuất hiện sau thời gian ở cữ. Sohu cho rằng Triệu Lệ Dĩnh đang chuẩn bị cho sự trở lại của mình sau khoảng 10 tháng rời xa làng giải trí.
Theo hình ảnh phóng viên chụp được, Triệu Lệ Dĩnh mặc kín đáo với váy dài, đội nón, đeo khẩu trang che kín mặt, choàng khăn mặc thời tiết mùa hè khá nóng bức. Trong khi đó Phùng Thiệu Phong mặc áo thun đơn giản, trẻ trung. Nam diễn viên ân cần mở cửa xe cho vợ rồi cùng bước lên xe và rời đi.
Trước đó, truyền thông Trung Quốc đưa tin Triệu Lệ Dĩnh bị trầm cảm sau khi sinh, cảm xúc thay đổi đột ngột trở nên dễ khóc và nổi nóng. Tuy nhiên, một người bạn thân thiết của nữ diễn viên đã lên tiếng phủ nhận.
Ngoài ra cũng có tin đồn nữ diễn viên đang tích cực giảm cân để trở lại làng giải trí. Trong thời gian ở cữ, ngoài việc chăm con, Triệu Lệ Dĩnh còn tranh thủ học lái xe và trau dồi thêm tiếng Anh.
Triệu Lệ Dĩnh và Phùng Thiệu Phong thông báo kết hôn vào ngày 16/10/2018, trùng với ngày sinh nhật của nữ diễn viên. Cô sinh con trai đầu lòng vào ngày 8/3.
Hiện tại, Triệu Lệ Dĩnh vẫn chưa nhận dự án nghệ thuật mới. Trong khi vợ ở nhà, Phùng Thiệu Phong vẫn chăm chỉ tham dự các sự kiện và chuẩn bị đóng phim. Anh thỉnh thoảng chia sẻ một số tin tức về con trai nhỏ.
Triệu Lệ Dĩnh đã ký hợp đồng với công ty Hòa Tụng của Lý Băng Băng, nên người hâm mộ hy vọng cô sẽ tìm được những vai diễn hay. Mới đây, Triệu Lệ Dĩnh cũng được đề cử tranh giải Nữ chính xuất sắc nhất của Bạch Ngọc Lan cho phim Minh Lan truyện. Đây là một trong những giải thưởng truyền hình danh giá nhất của làng giải trí Trung Quốc.
', 'Triệu Lệ Dĩnh che kín mặt trong lần đầu xuất hiện sau 2 tháng sinh con', 250, 7, 3, 2);

insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Tuấn Ngọc chê học trò Hồ Hoài Anh hát nhạc Trịnh rời rạc', 'Tuan Ngoc che hoc tro Ho Hoai Anh hat nhac Trinh roi rac', 12, '2019-06-03 06:10:00',
'Anh nhận xét nhóm S2 và Mystery hát nhạc Trịnh chưa tốt. Cách hát rời rạc của thí sinh đội Hồ Hoài Anh khiến nam HLV không hài lòng.
Chiếc ghế nóng đặc biệt nhất chương trình thuộc về Hồ Hoài Anh. Vòng Đối đầu, anh tự chọn cách thức lựa chọn thí sinh cho đội mình. Cụ thể, trước khi chính thức bước vào vòng thi, anh đưa học trò tới ký túc xá Đại học Quốc gia và biểu diễn trước khán giả. Ý định ban đầu, anh muốn chọn ra ba thí sinh chinh phục khán giả tốt nhất để vào vòng trong. Cuối cùng, một phút yếu lòng khiến huấn luyện viên (HLV) thay đổi quyết định. Tất cả thí sinh có thêm cơ hội ở vòng Đối đầu.
Hồ Hoài Anh thông minh trong việc dàn dựng tiết mục. Anh chọn bài phù hợp để học trò tỏa sáng bằng cá tính của riêng mình. Dù không tránh khỏi những lỗi nhỏ về giọng hát, cách xử lý nhưng các tiết mục của đội nam HLV đều được đồng nghiệp khen ngợi. Đặc biệt, phần thi đội anh mang lại cảm giác thoải mái, nhiều năng lượng hơn là sự nặng nề, áp lực thi đấu.
Thanh Hà, Tuấn Ngọc hạnh phúc khi dõi theo Công Luận và Juky San.
Đội Hồ Hoài Anh dù đặc biệt nhưng yếu thế về hiệu ứng truyền thông. Thí sinh đội anh đều là trường hợp không được ba HLV còn lại chọn lựa, ngoại trừ Juky San. Cô nổi tiếng trên mạng xã hội từ trước cuộc thi nhờ những bản cover trong trẻo và ngoại hình xinh đẹp.
Ở phần thi trước khán giả Đại học Quốc gia, cô cũng là thí sinh đầu tiên được Hồ Hoài Anh gọi tên, chắc chắn vào vòng trong.
Với phần thi Đối đầu, Juky San và Huỳnh Công Luận thể hiện Thời thanh xuân sẽ qua - một sáng tác của Phạm Hồng Phước. Màn trình diễn nhẹ nhàng, ngọt ngào và bình yên đúng như những ca từ của bài hát. “Đồi xanh thơm mát những lá trà/ Trong lành hát những khúc ca/ Hương chiều quê nghe lúa thơm tình ta”. Juky San hát ngọt ngào, mộc mạc. Cô tạo cảm giác thoải mái cho người nghe qua chất giọng trong trẻo.
"Yêu quá", Thanh Hà thốt lên trước sự ăn ý của hai thí sinh. "Chị cảm thấy thoải mái khi hai em diễn. Juky San rất tự nhiên và hoàn toàn làm chủ. Vừa hát, vừa diễn, thỉnh thoảng em cười khiến chị hoàn toàn yêu mến tiết mục của hai em".
Tuấn Hưng thừa nhận anh thích thú khi theo dõi. Tuy nhiên, anh đánh giá cả hai chưa tiết chế được cảm xúc, dẫn đến đôi chỗ "lệch quỹ đạo".
Hồ Hoài Anh đồng tình với người bạn thân. Anh cho biết hai thí sinh thể hiện chưa tốt bằng lúc diễn tập. Tuy nhiên, anh không đặt nặng áp lực mà muốn học trò trình diễn thoải mái, gạt vấn đề thi đấu, cạnh tranh sang một bên.
Tuấn Ngọc mượn Lady Gaga để nói về học trò Hồ Hoài Anh.
Nhóm S2 và Mystery làm mới âm nhạc của cố nhạc sĩ Trịnh Công Sơn. Hai ca khúc Để gió cuốn đi và Hãy yêu nhau đi được thể hiện bằng bản mashup và giọng hát mới mẻ. Có tới 7 người nên bè phối là thử thách lớn với nhóm thí sinh.
Tuy nhiên, theo nhận xét của Thanh Hà, họ giải quyết tốt bài toán này. “Chị từng khuyên các em tiết chế, hát bớt gào rú. Anh Hồ Hoài Anh đã giúp các em làm được điều đó”, nữ HLV nhận xét. Cô nói thêm: “Chị không nghĩ các em sẽ hát nhạc Trịnh Công Sơn. Các em làm rất tốt”.
Riêng Tuấn Ngọc có ý kiến ngược lại: "Các em chưa thoải mái, câu hát rời rạc, cách hát có thể tốt hơn".
Đáp lại bình luận của đàn anh, Hồ Hoài Anh giải thích: "Em luôn thích sự tương phản, ví dụ với bài hát mới, có người sẽ hát theo lối opera".
"Một người đã đành, đây là 7 người hát. Không thể nào để tất cả hòa hợp với bài hát. Thế nhưng, em vẫn muốn cho khán giả thấy được cá tính của từng người", anh nói thêm.
Lúc này, HLV Tuấn Ngọc xin cắt lời và đưa ra ví dụ là Lady Gaga. Theo anh, khi hát sang bất cứ dòng nhạc nào, nữ ca sĩ nổi tiếng thế giới đều hát theo cách của mình nhưng chạm đến trái tim khán giả. Anh nhấn mạnh rằng có nhiều hướng để hát một bài hát nhưng cách xử lý cần trau chuốt, thoải mái.
Kết thúc tập thi, Hồ Hoài Anh chọn Juky San và Công Luận vào vòng tiếp theo. Những thí sinh còn lại phải vượt qua thử thách mới do chính anh đặt ra để giành cơ hội đồng hành cùng chương trình. Cụ thể, họ tự chọn một ca khúc, quay video thể hiện sự sáng tạo trong cách hát, dàn dựng… để làm bài thi quyết định việc ai đi, ai ở.
', 'Tuấn Ngọc chê học trò Hồ Hoài Anh hát nhạc Trịnh rời rạc', 500, 8, 4, 4
);

insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Hòa Minzy hát ballad ngọt ngào sau nửa năm bị bệnh, mất giọng', 'Hoa Minzy hat ballad ngot ngao sau nua nam bi benh, mat giong' , 12, '2019-05-29 19:40:00',
'Hòa Minzy cho biết nửa năm qua, cô bị viêm xoang, ảnh hưởng đến giọng hát. Thời gian đó, cô sợ phòng thu vì không thể thu âm hoàn chỉnh một ca khúc.
Hòa Minzy cho biết nửa năm qua, cô bị viêm xoang, ảnh hưởng đến giọng hát. Thời gian đó, cô sợ phòng thu vì không thể thu âm hoàn chỉnh một ca khúc.
Sau thời gian im ắng, Hòa Minzy trở lại cùng ca khúc mới Chỉ là tình cờ. Nữ ca sĩ thừa nhận sản phẩm chưa có đột phá hay độc đáo so với những ca khúc trước của cô. Với Chỉ là tình cờ, Hòa Minzy tiếp tục hát ballad. Bài hát có giai điệu và ca từ nhẹ nhàng, sâu lắng - không mới với cả nữ ca sĩ lẫn Vpop.
Tuy nhiên, theo Hòa Minzy chia sẻ, đây là bài hát đầu tiên cô được là chính mình và giúp bản thân thoát khỏi nỗi sợ phòng thu.
Có lẽ vì tìm được cảm xúc của chính mình nên Hòa Minzy hát Chỉ là tình cờ khá ngọt ngào. Câu chữ đầy thổn thức, cách luyến láy nhẹ nhàng, da diết.
“Thích giọng hát của Hoà đã lâu nhưng tới bài hát này mới thật sự ấn tượng, đặc biệt phần cuối. Cách luyến láy, lên tông khá tốt”, khán giả phản hồi về sản phẩm.
“Giọng hát nhẹ nhàng nhưng đầy nội lực”, người nghe đánh giá Hòa Minzy phù hợp với thể loại ballad.
Chỉ là tình cờ đánh dấu sự trở lại của Hòa Minzy sau thời gian im ắng vì sức khỏe và ồn ào với fan Kpop.
Cuối năm 2018, cô bị cộng đồng fan Kpop tẩy chay vì đeo thẻ nhân viên, vào hậu trường một lễ trao giải để gặp nhóm nhạc BTS. Đây là tranh cãi nghiêm trọng nhất, khiến Hòa Minzy vấp phải nhiều lời chỉ trích. 
Cộng thêm việc bị viêm xoang, cô không có sản phẩm mới sau Chấp nhận ra mắt cách đây 6 tháng. 
Theo ca sĩ gốc Bắc Ninh, đó là giai đoạn cô thấy khó khăn. Bệnh viêm xoang ảnh hưởng đến giọng hát khiến cô không thể hoàn thành tốt bài hát. Nữ ca sĩ không dám bước vào phòng thu, thậm chí sợ hãi mỗi khi nghe đến thu âm. Sau nửa năm chữa trị dứt điểm, lấy lại giọng hát, cô nhanh chóng hoàn thành ca khúc mới. 
', 'Hòa Minzy hát ballad ngọt ngào sau nửa năm bị bệnh, mất giọng', 620, 5,2,1);

insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Lễ hội văn hóa Ẩm thực Hà Nội 2019','Le hoi van hoa Am thuc Ha Noi 2019', 11, '2019-05-19 11:44:00',
'Lễ hội văn hóa ẩm thực Hà Nội 2019 sẽ diễn ra trong thời gian từ 7 – 9/6 tại Công viên Thống Nhất, Hà Nội.
Thành phố Hà Nội đã mời Hội Đầu Bếp Việt Nam (VICA), Hiệp Hội Du lịch Việt Nam, Hội ẩm thực văn hóa Việt Nam, một số tỉnh, thành phố tham gia Lễ hội văn hóa ẩm thực Hà Nội 2019.
Lễ hội giới thiệu các món ăn do các cơ sở, gia đình có nghề chế biến ẩm thực gia truyền, các nghệ nhân ẩm thực đại diện cho các vùng miền, gồm 30 gian, được chia thành 3 khu vực: Khu ẩm thực miền Bắc có các món ăn của vùng cao Hà Giang, các món Tây Bắc như gà nướng mắc kén, cá nướng Pa pỉnh tộp Tây Bắc, cơm lam Pắc Pó, bánh đa cua Hải Phòng, nem cua Hải Phòng.
Các món ăn đại diện của Hà Nội như: Phở cuốn diếp Hà Nội, bánh tôm Hồ Tây, bún chả, bánh cuốn… các sản phẩm của các làng nghề như; Cốm Mễ Trì, xôi Phú Thượng...
Khu ẩm thực miền Trung giới thiệu các món: Súp lươn Nghệ An, mỳ Quảng, cơm gà Hội An, bún bò Huế, bánh bột lọc, nem lụi... và khu ẩm thực miền Nam với các món xôi chiên phồng quả bóng ăn kèm gà quay lá trúc, gỏi cuốn, chạo tôm bao mía ăn, bánh xèo Cần Thơ và hải sản nướng Nha Trang.  
Cùng với đó, trong không gian lễ hội, du khách sẽ được thưởng lãm các tác phẩm nghệ thuật chủ đề 3 miền Bắc - Trung - Nam xưa và nay, những ký ức 3 miền về lịch sử văn hóa nói chung và văn hóa ẩm thực nói riêng; khu gian hàng giới thiệu sản phẩm và thưởng thức ẩm thực.
Đến với lễ hội, du khách còn được tham gia vào các hoạt động giao lưu, trải nghiệm ẩm thực Hà Nội với các nghệ nhân, các nhà nghiên cứu về Hà Nội, trình diễn một số loại hình nghệ thuật, trò chơi truyền thống, không gian trải nghiệm ẩm thực dành riêng cho thiếu nhi.
Lễ hội văn hóa ẩm thực Hà Nội 2019 sẽ chính thức khai mạc vào lúc 20h00 ngày 7/6/2019 tại Công viên Thống Nhất.', 'Lễ hội văn hóa Ẩm thực Hà Nội 2019', 739, 9, 3, 4);

insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Cá nướng Pa pỉnh tộp Tây Bắc tham dự Lễ hội văn hoá ẩm thực Hà Nội', 'Ca nuong Pa pinh top Tay Bac tham du Le hoi van hoa am thuc Ha Noi', 11, '2019-05-19 11:49:00',
'Cá nướng Pa pỉnh tộp Tây Bắc, gà nướng mắc kén, các món ăn của vùng cao Hà Giang, cơm lam Pắc Bó (Cao Bằng) sẽ xuất hiện tại Lễ hội văn hoá ẩm thực Hà Nội năm 2019.
Cá nướng Pa pỉnh tộp, cái tên nghe là lạ, là món cá nướng đặc biệt của người Thái ở Tây Bắc. Pa pỉnh tộp theo tiếng Thái có nghĩa là cá nướng gập. Nét độc đáo của món này là cách chế biến. Pa pỉnh tộp được ướp rất nhiều loại gia vị như gừng, xả, ớt tươi, rau mùi, rau thơm, hành tươi, húng… Đặc biệt, Pa pỉnh tộp không thể thiếu mắc khén, một loại gia vị đặc trưng Tây Bắc.
Pa pỉnh tộp nướng trên lửa than, khi nướng phải dùng thanh tre kẹp lại để vị cá thêm đậm đà, các loại gia vị thấm sâu vào từng thớ thịt và tỏa hương thơm.
Lễ hội văn hoá ẩm thực Hà Nội năm 2019 được tổ chức tại Công viên Thống Nhất (Hà Nội) từ 19h00 ngày 07/6/2019 đến 20h ngày 09/6/2019.
Với sự tham gia của Hội Đầu Bếp Việt Nam (VICA), Hiệp Hội Du lịch Việt Nam, Hội ẩm thực văn hóa Việt Nam, Lễ hội văn hoá ẩm thực Hà Nội năm nay gồm 30 gian, được chia thành 3 khu vực giới thiệu các món ăn do các cơ sở, gia đình có nghề chế biến ẩm thực gia truyền, các nghệ nhân ẩm thực đại diện cho các vùng miền.
', 'Cá nướng Pa pỉnh tộp Tây Bắc tham dự Lễ hội văn hoá ẩm thực Hà Nội', 172, 6, 2, 1);

insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Chương trình "Khai trương mùa du lịch biển" Đà Nẵng 2019 có gì mới?','Chuong trinh "Khai truong mua du lich bien" Da Nang 2019 co gi moi?', 10, '2019-04-20 01:39:00',
'Chương trình "Khai trương mùa du lịch biển" Đà Nẵng 2019 sẽ tiếp tục diễn ra từ ngày 26/4 đến ngày 01/5/2019 tại Công viên Biển Đông, các bãi biển du lịch Đà Nẵng.
Chiều 22/3, Sở Du lịch Đà Nẵng cho hay, chương trình "Khai trương mùa du lịch biển Đà Nẵng" là sự kiện được UBND thành phố Đà Nẵng cho phép Ban quản lý bán đảo Sơn Trà và các bãi biển du lịch Đà Nẵng tổ chức thường niên vào dịp lễ 30/4 – 1/5 hàng năm, chương trình đã trở thành một sự kiện văn hóa, thể thao và du lịch thu hút đông đảo người dân và du khách tham gia.
Năm 2019, Chương trình "Khai trương mùa du lịch biển" sẽ tiếp tục diễn ra từ ngày 26/4 đến ngày 01/5/2019 tại Công viên Biển Đông, các bãi biển du lịch Đà Nẵng, khu vực Lăng Ông và bán đảo Sơn Trà với các hoạt động tuyên truyền bảo vệ môi trường, quảng bá du lịch tại bán đảo Sơn Trà và các bãi biển du lịch Đà Nẵng.
Năm nay, bên cạnh việc duy trì chuỗi hoạt động đặc trưng như: Chương trình ca nhạc hàng đêm; trưng bày ảnh "Đa dạng sinh học Sơn Trà"; khu lưu niệm - ẩm thực; thả diều nghệ thuật; cuộc thi Đắp tượng cát; các khu vực Check in: thuyền thúng, ván lướt, không gian sắp đặt đèn lồng, chong chóng… Ban tổ chức sẽ giới thiệu các hoạt động mới phục vụ du khách tham quan trong dịp lễ 30/4 – 1/5 như: Chương trình "Nhặt rác trao yêu thương", trưng bày sản phẩm tái chế từ rác thải, hội thi cờ tướng tại Đỉnh Bàn Cờ - bán đảo Sơn Trà, hội thi bơi cho người yêu biển, trình diễn khinh khí cầu, chạy bộ bãi biển, đêm đại nhạc hội với sự góp mặt của các ca sỹ nổi tiếng.
Đặc biệt, chương trình Lễ khai mạc 16h30 - thứ 6 ngày 26/4 sẽ đem đến những tiết mục đặc sắc phục vụ người dân và du khách.', 'Chương trình "Khai trương mùa du lịch biển" Đà Nẵng 2019 có gì mới?', 102, 7,2,1);

insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Ninh Thuận - trung tâm du lịch mới bên bờ biển Đông', 'Ninh Thuan - trung tam du lich moi ben bo bien Dong',10 , '2019-05-20 05:39:00',
'Sở hữu nhiều hạ tầng lưu trú 5 sao, tiện ích - dịch vụ quy mô lớn hiện đại... Ninh Thuận được kỳ vọng sẽ thu hút nhiều du khách.
Ở vị trí "trái tim" của du lịch Nam miền Trung, Ninh Thuận được chọn để đặt nền móng cho những trải nghiệm đẳng cấp. Hệ sinh thái du lịch hoàn chỉnh từ lưu trú, nghỉ dưỡng, dịch vụ, giải trí... chuẩn 5 sao sẽ giúp Ninh Thuận thu hút du khách đến trải nghiệm và khám phá.
Tiềm năng du lịch tại Ninh Thuận.
Chỉ cách sân bay quốc tế Cam Ranh 1 giờ đi ôtô, lại kết nối với 4 tuyến giao thông đường bộ, hàng không, đường sắt và đường biển là lợi thế giúp Ninh Thuận đón khách từ mọi ngả đường Bắc - Trung - Nam và quốc tế.
Bên cạnh vịnh Vĩnh Hy thuộc Top 40 vịnh đẹp nhất thế giới, vườn quốc gia Núi Chúa, đồng muối Cà Ná, Hang Rái, đồng cừu, cánh đồng điện gió, vườn nho... thì Ninh Chữ - Bình Sơn là một trong những điểm đến hấp dẫn tại Ninh Thuận.
Vùng đất này còn được bao phủ bởi khí hậu nắng quanh năm, gió khô mát, thuận lợi cho mọi hoạt động của du khách. Ở Ninh Thuận, du lịch không có mùa vụ. 105km đường bờ biển, cùng 2 vườn quốc gia, bát ngát những cánh đồng nho, nhiều làng nghề truyền thống lâu đời, các tiểu sa mạc với cảnh quan độc đáo... là những lợi thế của Ninh Thuận.
Tiềm năng tự nhiên đã biến Ninh Thuận thành xứ sở hội tụ của mọi hình thái du lịch xu hướng và hấp dẫn như: sinh thái, nghỉ dưỡng, du lịch biển, thể thao, trải nghiệm, MICE hay mạo hiểm.
Nhờ tiềm năng tự nhiên phong phú, lại được mở đường bởi những chính sách ưu đãi đầu tư lớn, Ninh Thuận đang là trong những miền đất tụ hội các nhà phát triển du lịch, doanh nghiệp hàng đầu cả nước. Ngoài ra, những dự án hấp dẫn cùng nhau xuất hiện tạo điểu kiện cho Ninh Thuận triển toàn diện theo cả chiều rộng lẫn chiều sâu.
', 'Ninh Thuận - trung tâm du lịch mới bên bờ biển Đông', 149, 7, 3, 2);


insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Hải sản bình thường ở Việt Nam, chích máu bán 300 triệu/lít', 'Hai san binh thuong o Viet Nam, chich mau ban 300 trieu/lit', 9, '2019-05-22 05:13:00',
'Máu sam có giá trị rất lớn trong lĩnh vực y tế với những công dụng tuyệt vời. Máu của loài vật này có giá lên tới 60.000 USD cho 1 gallon (tương đương 3,8 lít).
','Hải sản bình thường ở Việt Nam, chích máu bán 300 triệu/lít', 10, 8, 3, 4);

insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Nếu hay ăn cá biển, tốt nhất đừng ham... cá to, vì sao vậy?','Neu hay an ca bien, tot nhat dung ham... ca to, vi sao vay?', 9 ,  '2019-05-26 07:13:00',
'Gia đình chị Hoa (Hà Nội) được biếu một khúc cá Thu to hơn 10kg. Nghĩ rằng cá ngon nên chị Hoa chế biến và mời bố mẹ hai bên nội ngoại sang ăn tối cùng gia đình.
Tuy nhiên, nửa đêm hai con gái chị Hoa bị đau bụng, nôn mửa, tiêu chảy. Rất may sau gần một đêm cả nhà thức trắng vì các con chạy ra chạy vào toilet, gần sáng hai bé cũng yên bụng và ngủ tiếp.
Chưa hết, sáng hôm sau, mẹ đẻ chị Hoa gọi điện cho con gái hỏi nguồn gốc các món ăn tối qua vì về nhà bà bị mẩn ngứa, nổi mề đay. Chị Hoa cũng kể cho mẹ chuyện hai con gái bị “miệng nôn, trôn tháo” tối qua. Hai mẹ con chị Hoa đã nghĩ đến nguyên nhân do thức ăn, nhưng lại gạt đi vì nghĩ cá biển tươi, sạch như thế thì làm sao gây ngộ độc được.
Theo các chuyên gia dinh dưỡng, có khá nhiều người cho rằng nước biển mặn sẽ không có vi khuẩn hoặc hạn chế vi khuẩn phát triển. Nhưng thực ra có những loại vi khuẩn ưa mặn sống được cả trong nước biển. Vì vậy, các loại: tôm, cua, ốc, cá… đều có thể nhiễm vi khuẩn.
Đáng chú ý là vi khuẩn Vibrio parahaemolyticus, một trong những nguyên nhân gây ra những vụ ngộ độc thức ăn ở vùng biển. Vi khuẩn này gây ra hai loại hội chứng lâm sàng là tiêu chảy kiểu tả nhẹ và tiêu chảy phân có nhiều máu kèm theo đau bụng và sốt nhẹ.
Trong hải sản có thể chứa các độc tố từ tảo gây nguy hiểm cho người ăn. Độc tố tảo phycotoxins sinh sản trong các rạn san hô ven bờ, là nơi sinh sống của các loài thân mềm như: nghêu, sò, cua, tôm… Các độc tố tảo này không nguy hại đến các sinh vật biển nhưng chúng sẽ gây ngộ độc cho người nếu ăn phải. Độc tố tảo phycotoxins không bị phân hủy khi đun nấu, có thể gây tiêu chảy, đau bụng, đau đầu, gây liệt cơ, mất trí nhớ.
Cá biển cũng có thể nhiễm kim loại nặng như: asen, thủy ngân do môi trường ô nhiễm. Cá càng to thì thường bị nhiễm độc nặng hơn do quá trình tích lũy thức ăn. Vì vậy, các nhà khoa học khuyến cáo, không nên ăn các loại cá lớn như: cá mập, cá kiếm, cá thu loại lớn, cá kình… vì hàm lượng thủy ngân tích lũy trong chúng khá lớn. Ngoài ra, do các chất độc hại thường lắng đọng ở lớp bùn nên ngoài các loài cá biển to, các loài sống ở tầng đáy như: ngao, sò, ốc, hến… rất dễ bị nhiễm độc.
Hải sản là loại thực phẩm có hàm lượng protein cao, chứa các axít béo omega 3, nhiều canxi, kẽm rất tốt cho sức khỏe trẻ em. Tuy nhiên, thủy - hải sản là một trong 20 loại thực phẩm dễ gây dị ứng, ngộ độc nhất.
Các triệu chứng của dị ứng thường là mẩn ngứa, nổi mề đay, sổ mũi, mắt ngứa đỏ, tụt huyết áp, khó thở, nôn mửa, tiêu chảy… Nhiều người vẫn nghĩ rằng tiêu chảy là do thức ăn này lạnh, nhưng thực ra là do trong hải sản có độc tố.
', 'Nếu hay ăn cá biển, tốt nhất đừng ham... cá to, vì sao vậy?', 780, 9, 1, 1);

insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Trái vú sữa Việt tại Mỹ có giá 350.000 đồng/kg','Trai vu sua Viet tai My co gia 350.000 dong/kg', 8, '2019-05-28 09:15:00',
'Tại Mỹ trái vú sữa có giá 60 USD/thùng 4 kg (tương đương 15 USD/kg, khoảng 350.000 đồng/kg). 
Theo tin tức từ báo Đầu tư,  lễ xuất khẩu lô hàng trái vú sữa đầu tiên sang thị trường Mỹ vừa được Công ty TNHH Thương mại Dịch vụ Xuất nhập khẩu Vina T&T tổ chức tại  ấp Phèn Đen, thị trấn An Lạc Thôn, huyện Kế Sách, tỉnh Sóc Trăng.
Hiện nay Vina T&T cho biết đã ký hợp đồng xuất khẩu sang Mỹ với số lượng cung cấp 1,5 tấn/ngày vào mùa thu hoạch chính vụ, từ tháng 12/2018 đến tháng 3/2019.
Theo hợp đồng, mỗi tuần công ty sẽ thu mua 10 tấn trái vú sữa từ HTX này để xuất khẩu với giá 36.000 đồng/kg. Tại lô đầu tiên, tỉ lệ hàng đạt chuẩn thu mua đến 65% (còn lại không đạt về mẫu mã) do DN và HTX đã có sự chuẩn bị kỹ lưỡng từ đầu vụ.
Trái vú sữa tươi xuất khẩu sang thị trường Mỹ phải được thu mua từ vùng nguyên liệu đã được Cục Bảo vệ thực vật cấp mã số. Vùng nguyên liệu này phải tuân thủ đúng việc sử dụng thuốc bảo vệ thực vật theo quy định của Mỹ để bảo đảm an toàn thực phẩm. Sau khi thu hoạch, quả phải được đóng gói tại nhà máy đã được Mỹ cấp mã số, bảo đảm không có dịch hại, sâu bệnh và xử lý chiếu xạ trước khi xuất khẩu.
Theo các DN, do trái vú sữa mua hư, vòng đời ngắn, nếu bảo quản tốt chỉ được 7 ngày kể từ thời điểm hái nên thời gian bán hàng tại Mỹ rất ngắn, tối đa chỉ được 4 ngày. Vì những yếu tố đặc thù trên, để bán được trái vú sữa vào thị trường Mỹ là không dễ dàng. Nhưng bù lại, thị trường lại chấp nhận giá cao để thưởng thức đặc sản của Việt Nam.
Ông Nguyễn Đình Tùng - giám đốc T&T cho biết trên tờ Người lao động vào đầu vụ, tại Mỹ trái vú sữa có giá 60 USD/thùng 4 kg (tương đương 15 USD/kg, khoảng 350.000 đồng/kg). Thời điểm hiện tại vú sữa đã vào mùa nên giá giảm còn 50 USD/thùng 4 kg, vẫn bảo đảm hiệu quả cho DN xuất khẩu.
Với mức giá này, vú sữa Việt Nam nằm trong tốp những loại quả đắt đỏ ở thị trường Mỹ.', 'Trái vú sữa Việt tại Mỹ có giá 350.000 đồng/kg', 999, 6,2,3
);

insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Nông dân "đắng lòng" phá bỏ đồng ớt cao sản', 'Nong dan "dang long" pha bo dong ot cao san', 8, '2019-05-11 19:15:00',
'Cho rằng bị doanh nghiệp "ép giá" nên mặc dù mới thí điểm được 2 năm nhưng nhiều hộ nông dân đã mang cả máy lồng, cuốc, liềm phá bỏ những thửa ớt cao sản để lấy đất trồng lại các loại hoa màu truyền thống.
Vụ việc ớt cao sản bị rớt giá thảm hại khiến bà con bức xúc tới mức phá bỏ cả cánh đồng ớt xảy ra tại xã Thăng Bình, huyện Nông Cống, tỉnh Thanh Hóa. 
Theo phản ánh của người dân, loại ớt cao sản này được chính quyền vận động trồng thí điểm ở 3 thôn của xã là Ngọ Thượng, Ngọ Trung và Ngọ Hạ trong gần 2 năm nay. Và loại nông sản này được Công ty Rau quả Nga Sơn (huyện Nga Sơn, Thanh Hóa) cam kết thu mua. Một năm trước, bà con thu hoạch ớt và nhập bán bình thường cho doanh nghiệp với giá 9.000 đồng/kg, nhưng đến thời điểm bây giờ, giá ớt rớt xuống còn 4.500 đồng với điều kiện phải làm sạch cả tai ớt. 
Bức xúc vì tiền bán ớt quá "bèo", không đủ bù lại chi phí phân tro, thuốc trừ sâu, công làm đất nên bà con cả 3 thôn quyết định phá bỏ đồng ớt, chuẩn bị đất trồng lại các loại hoa màu truyền thống của địa phương là lạc và ngô.
Thông tin về vụ việc, ông Lê Văn Chiến - Chủ tịch UBND xã cho biết, trước đây, khi ký hợp đồng, doanh nghiệp cam kết thu mua ớt của bà con giá 4.500 đồng/kg ớt chín. Giống ớt là do phía doanh nghiệp cung cấp, còn bà con tự trang trải các chi phí về phân bón, thuốc bảo vệ thực vật. Tổng diện tích trồng ớt tại địa bàn của cả 3 thôn vào khoảng 7 ha. 
Được biết, ớt sau khi thu mua tại ruộng sẽ được công ty chuyển sang bên Trung Quốc. Năm ngoái, dù ký kết mua ớt chín nhưng do nhu cầu của thị trường bên kia thay đổi nên doanh nghiệp thu mua ớt của bà con khi còn xanh. Giá mua cao nhất thời điểm đó khoảng 9 nghìn đồng/kg. Còn năm nay, doanh nghiệp lại quay lại thu mua ớt chín như với giá cam kết trước đó là 4.500 đồng/kg. 
"Bà con thì muốn bán ớt khi còn xanh để kịp thời gian làm đất trồng hoa màu, trong khi doanh nghiệp lại chỉ mua ớt chín. Chiều ngày 15/2 vừa qua, doanh nghiệp vẫn cân ớt chín cho bà con bình thường với khối lượng lên tới hơn 10 tấn. Tuy nhiên, cũng cần nhìn nhận thực tế rằng, nếu giá ớt cao hơn chút thì bà con còn có đồng lời, chứ giá mua như hiện nay thì có khi chỉ đủ cho tiền vật tư đầu tư ban đầu. Đấy cũng là vấn đề khó khăn không riêng gì ở Thăng Bình, mà ngay các xã lân cận tham gia trồng ớt cao sản cũng đang phải đối mặt " - ông Chiến cho biết.
', 'Nông dân "đắng lòng" phá bỏ đồng ớt cao sản', 235, 5, 3, 4);

insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Nguyên nhân chủ tiệm may tử vong với nhiều vết cắt trên cổ tay', 'Nguyen nhan chu tiem may tu vong voi nhieu vet cat tren co tay', 7, '2019-06-06 18:15:00',
'Lộ nguyên nhân chủ tiệm may chết gục với nhiều vết cắt trên cổ tay.
Theo thông tin trên báo Người Đưa Tin, sáng 5/6, người dân sống gần tiệm may Sinh Sài Gòn (thuộc địa bàn phường Quang Trung, TP.Thái Nguyên, tỉnh Thái Nguyên) không thấy tiệm này mở cửa, khi nhìn vào thì phát hiện chủ tiệm tử vong trong tư thế nằm gục dưới sàn nhà, cổ tay nạn nhân có vết cắt, máu chảy nhiều, cạnh đó là 1 con dao.
Nhận được tin báo, cơ quan chức năng đã có mặt khám nghiệm hiện trường, điều tra nguyên nhân tử vong của nạn nhân. Theo đó, danh tính nạn nhân được xác định là anh Nghiêm Văn S. (SN 1973, ngụ tại huyện Ứng Hòa, TP.Hà Nội).
Trao đổi với phóng viên, Đại tá Phạm Thanh Hải - Trưởng Công an TP.Thái Nguyên cho biết: “Sau khi khám nghiệm thì xác định nạn nhân tử vong là do tự tử. Còn nguyên nhân khiến nạn nhân vì sao phải tự tử thì vẫn đang được công an tích cực điều tra và làm rõ”.
Được biết, nơi phát hiện thi thể được nạn nhân thuê lại và mở tiệm may quần áo khoảng vài năm trở lại đây. Hiện vụ việc đang được điều tra làm rõ theo quy định pháp luật.
', 'Nguyên nhân chủ tiệm may tử vong với nhiều vết cắt trên cổ tay', 1354, 7,2,1);

insert into BaiViet( TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet)
values('Hàng chục "giang hồ" hỗn chiến giữa trung tâm Sài Gòn', 'Hang chuc "giang ho" hon chien giua trung tam Sai Gon', 7, '2019-06-05 17:15:00',
'Công an quận Phú Nhuận (TP HCM) đang điều tra, truy xét các đối tượng tham gia vụ hỗn chiến xảy ra vào chiều 4/6 ngay giữa trung tâm TP.
Nhiều nhân chứng cho hay, 14h chiều 4/6 một nhóm khoảng 5 người đi trên xe ô tô dừng lại ở 1 địa điểm trên đường Lê Văn Sỹ (đoạn qua P.13, Q.Phú Nhuận). Khi nhóm này vừa đến thì một nhóm khác khoảng 20 đối tượng đi trên nhiều xe gắn máy ập đến.
2 nhóm gặp nhau cự cãi lớn tiếng và lao vào hỗn chiến. Nhiều người dân cho hay, nhóm đông người có mang theo hung khí gậy gộc.
Nhóm 5 người bị yếu thế, trong đó có 1 người bị tấn công, gục tại chỗ. 1 người khác trong nhóm bị thương tích ở đầu nhưng cố gắng chạy về hướng trung tâm TP để thoát thân. Nhóm đi xe máy nhanh chóng rời hiện trường. 2 người bị thương tích được đưa vào bệnh viện cấp cứu.
Hiện trường chiếc ô tô của nhóm 5 người bị đập bể cửa kính sau. Thông tin ban đầu, 2 nhóm này có phát sinh mâu thuẫn trong việc thuê mặt bằng kinh doanh.
Công an quận Phú Nhuận đã vào cuộc điều tra, truy xét các đối tượng liên quan.', 'Hàng chục "giang hồ" hỗn chiến giữa trung tâm Sài Gòn', 1928, 7,2,1);
---------------- insert table nhan_baiViet
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(1,1);
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(2,2);
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(3,3);
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(4,3);
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(5,4);
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(6,4);
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(7,5);
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(8,5);
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(9,6);
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(10,7);
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(11,8);
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(12,9);
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(13,10);
insert into Nhan_BaiViet(IDBaiViet, IDTag) values(14,11);
---------------- insert table baiviet_hinhanh
insert into baiviet_hinhanh(IDBaiViet,IDHinh) values(1,1);
insert into baiviet_hinhanh(IDBaiViet,IDHinh) values(2,2);
insert into baiviet_hinhanh(IDBaiViet,IDHinh) values(3,3);
insert into baiviet_hinhanh(IDBaiViet,IDHinh) values(4,4);
insert into baiviet_hinhanh(IDBaiViet,IDHinh) values(6,6);
insert into baiviet_hinhanh(IDBaiViet,IDHinh) values(7,7);
insert into baiviet_hinhanh(IDBaiViet,IDHinh) values(8,8);
insert into baiviet_hinhanh(IDBaiViet,IDHinh) values(9,9);
insert into baiviet_hinhanh(IDBaiViet,IDHinh) values(10,10);
insert into baiviet_hinhanh(IDBaiViet,IDHinh) values(11,11);
insert into baiviet_hinhanh(IDBaiViet,IDHinh) values(12,12);
insert into baiviet_hinhanh(IDBaiViet,IDHinh) values(13,13);
insert into baiviet_hinhanh(IDBaiViet,IDHinh) values(14,14);
--------------- insert table BinhLuan
insert into BinhLuan(baiviet, DocGia, NoiDung, TinhTrang) values (1, 10, 'Hay qua', 1);
insert into BinhLuan(baiviet, DocGia, NoiDung, TinhTrang) values (1, 11, 'Thật mong đợi', 0);
insert into BinhLuan(baiviet, DocGia, NoiDung, TinhTrang) values (2, 12, 'Ủa Triệu Lệ Dĩnh lấy chồng hồi nào vậy?', 0);
insert into BinhLuan(baiviet, DocGia, NoiDung, TinhTrang) values (2, 13, 'Thì ra lâu rồi không thấy Triệu Lệ Dĩnh là do đẻ con à?', 1);
insert into BinhLuan(baiviet, DocGia, NoiDung, TinhTrang) values (3, 12, 'Bác nhận xét gắt vậy', 1);
insert into BinhLuan(baiviet, DocGia, NoiDung, TinhTrang) values (4, 14, 'Mãi mới thấy chị comeback', 1);
insert into BinhLuan(baiviet, DocGia, NoiDung, TinhTrang) values (6, 14, 'Nhìn ngon ghê', 1);

