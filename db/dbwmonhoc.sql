drop database vnlnews
create database vnlnews
create table PhanHeNguoiDung
(	IDPhanHe varchar(10) not null primary key,
	TenPhanHe varchar(50) not null
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
	HoTen varchar(50),
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
( IDChuyenMuc varchar(10) not null primary key,
	TenChuyenMuc varchar(50) not null,
	TenChuyenMuc_KhongDau varchar(50),
	ChuyenMucCha varchar(10)
	);
create table Nhan #tag
( IDTag varchar(10) not null primary key,
  TenTag varchar(20) not null
  );
create table Duyet
( IDDuyet int not null primary key,
Loai varchar(50)
);
create table BaiViet
( IDBaiViet varchar(15) not null primary key,
  TieuDe varchar(255) not null,
  TieuDe_KhongDau varchar(255),
  ChuyenMuc varchar(10),
  NgayDang datetime,
  NoiDung text,
  TomTat text,
  LuotXem int,
  PhongVien int,
  BienTapVien int,
  DaDuyet int,
  TinNoiBat int
  );
create table urlHinhAnh
( IDHinh INT  primary KEY auto_increment,
  urllinkHinh VARCHAR(255) not null UNIQUE
  );
create table BinhLuan
( IDBinhLuan int auto_increment,
  BaiViet varchar(15) not null,
  DocGia int not null,
  NoiDung text,
  TinhTrang INT, # 1 : an, 0 : hien thi
   primary key(IDBinhLuan,BaiViet,DocGia)
   );
  
create table Nhan_BaiViet
(  IDBaiViet varchar(15) not null,
	IDTag varchar(10) not null,
	primary key(IDBaiViet,IDTag)
	);
create table BaiViet_HinhAnh
( IDBaiViet varchar(15),
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
insert into urlhinhanh(urllinkHinh) values('https://freetuts.net/lenh-insert-them-du-lieu-trong-mysql-321.html');

-- insert table select * from Duyet
insert into Duyet(IDDuyet, Loai) values(1,'Đã được duyệt & chờ xuất bản');
insert into Duyet(IDDuyet,Loai) values(2,'Đã xuất bản');
insert into Duyet(IDDuyet,Loai) values(3,'Bị từ chối');
insert into Duyet(IDDuyet,Loai) values(4,'Chưa được duyệt');
-- insert table Nhan
insert into Nhan(IDTag,TenTag) values('T1','Marvel');
-- insert table chuyenmuc
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM001','Đời sống','Doi song', null);
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM002','Kinh doanh','Kinh doanh', null);
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM003','Văn hóa','Van hoa', null);
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM004','Giải trí','Giai tri', null);
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM005','Thể thao','The thao', null);
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM006','Xã hội','Xa hoi', 'CM001');
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM007','Pháp luật','Phap luat', 'CM001');
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM008','Nông sản','Nong san', 'CM002');
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM009','Hải sản','Hai san', 'CM002');
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM010','Du lịch','Du lich', 'CM003');
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM011','Ẩm thực','Am thuc', 'CM003');
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM012','Âm nhạc','Am nhac', 'CM004');
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM013','Điện ảnh, Truyền hình','Dien anh, Truyen hinh', 'CM004');
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM014','Bóng đá','Bong da', 'CM005');
insert into chuyenmuc(IDChuyenMuc, TenChuyenMuc, TenChuyenMuc_KhongDau, ChuyenMucCha) values('CM015','Các môn khác','Cac mon khac', 'CM005');
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
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('TK1',2, 500000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('TK2',3, 1500000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('TK3',4, 400000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('TK4',5, 500000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('TK5',6, 100000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('TK6',7, 500000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('TK7',8, 900000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('TK8',9, 500000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('TK9',10, 1800000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('TK10',11, 5100000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('TK11',12, 3200000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('TK12',13, 1600000);
insert into TaiKhoanThe(SKT,ChuSoHuu, SoDu) values('TK13',14, 1500000);
---------------- insert table BaiViet
insert into BaiViet(IDBaiViet, TieuDe, TieuDe_KhongDau, ChuyenMuc, NgayDang, NoiDung, TomTat, LuotXem, PhongVien , BienTapVien, DaDuyet, TinNoiBat)
values('BV0001', 'Iron Man & Captain America bắt tay làm hòa trong trailer Avengers: Endgame chỉ là cảnh quay giả?', 'Iron Man & Captain America bat tay lam hoa trong trailer Avengers: Endgame chi la canh quay gia?', 'CM013', '2019-04-10 16:00:00',
'Mặc dù liên tục quảng bá cho Avengers: Endgame (Hồi kết) suốt nhiều tháng trời nhưng Marvel Studios đặc biệt giữ bí mật về nội dung phim, không để lộ ra ngoài dù chỉ là một chi tiết nhỏ. Chính vì thế, những gì mà fan biết được qua các teaser, trailer hầu hết chỉ là hình ảnh rời rạc, không thể dự đoán chuyện gì sẽ xảy ra. Tuy nhiên gần đây, trong trailer mới nhất, các fan đã vô cùng thích thú khi chứng kiến cảnh hội ngộ giữa Iron Man và Captain America.
Sau khi Iron Man bị kẹt ở hành tinh Titan không rõ sống chết, nhiều người cho rằng anh và Nebula sẽ trở về trái đất, tìm cách hội ngộ với các Avengers còn lại. Và cảnh Iron Man gặp Captain America cũng là một phân đoạn khi tất cả đoàn tụ. Thế nhưng khi được hỏi về điều này, chính đạo diễn Joe Russo cho biết cảnh đặc biệt đó sẽ không xuất hiện trong phim.
Mặc dù câu trả lời khá bâng quơ và kết thúc bằng một nụ cười nhưng có lẽ điều mà Joe nói là sự thật. Sau đó, Anthony Russo cố gắng kể nhiều hơn về câu chuyện và đánh lạc hướng khán giả, nhằm không để Joe tiết lộ về nội dung phim. Cuối cùng, Joe cũng nói: “Cũng có thể cảnh đó sẽ xuất hiện trong phim”. Tuy nhiên lúc này, có rất ít người tin vào cách cả hai đang cố gắng che giấu sự thật.
Iron Man & Captain America bắt tay làm hòa trong trailer Avengers: Endgame chỉ là cảnh quay giả? SaoStar 10/04/19 16:00 GMT+7122 liên quanGốc Thông tin được úp mở bởi chính Joe Russo - một trong cặp đôi anh em đạo diễn trong phim Avengers: Endgame (Hồi kết). Mặc dù liên tục quảng bá cho Avengers: Endgame (Hồi kết)suốt nhiều tháng trời nhưng Marvel Studios đặc biệt giữ bí mật về nội dung phim, không để lộ ra ngoài dù chỉ là một chi tiết nhỏ. Chính vì thế, những gì mà fan biết được qua các teaser, trailer hầu hết chỉ là hình ảnh rời rạc, không thể dự đoán chuyện gì sẽ xảy ra. Tuy nhiên gần đây, trong trailer mới nhất, các fan đã vô cùng thích thú khi chứng kiến cảnh hội ngộ giữa Iron Man và Captain America. Cảnh gặp nhau giữa 2 nhân vật trong trailer. Sau khi Iron Man bị kẹt ở hành tinh Titan không rõ sống chết, nhiều người cho rằng anh và Nebula sẽ trở về trái đất, tìm cách hội ngộ với các Avengers còn lại. Và cảnh Iron Man gặp Captain America cũng là một phân đoạn khi tất cả đoàn tụ. Thế nhưng khi được hỏi về điều này, chính đạo diễn Joe Russo cho biết cảnh đặc biệt đó sẽ không xuất hiện trong phim. Trailer cuối của Avengers: Endgame Mặc dù câu trả lời khá bâng quơ và kết thúc bằng một nụ cười nhưng có lẽ điều mà Joe nói là sự thật. Sau đó, Anthony Russo cố gắng kể nhiều hơn về câu chuyện và đánh lạc hướng khán giả, nhằm không để Joe tiết lộ về nội dung phim. Cuối cùng, Joe cũng nói: “Cũng có thể cảnh đó sẽ xuất hiện trong phim”. Tuy nhiên lúc này, có rất ít người tin vào cách cả hai đang cố gắng che giấu sự thật. Mặc dù nhiều lần bị sự cố “lỡ miệng” do diễn viên, những người được thưởng thức trước bộ phim hay chính ekip, thế nhưng nhìn chung, việc giữ bí mật về nội dung Avengers: Endgameđược thực hiện khá tốt. Chính bộ đôi đạo diễn cũng thừa nhận rằng đã đưa những cảnh quay không có trong phim vào trailer để nhằm đánh lạc hướng suy nghĩ và tạo bất ngờ cho mọi người khi thưởng thức tác phẩm. Đây là một điều khá thú vị, thúc đẩy trí tưởng tượng của khán giả về nội dung phim và nhận lại một cái kết bất ngờ nằm ngoài mong đợi. 
Iron Man & Captain America bắt tay làm hòa trong trailer Avengers: Endgame chỉ là cảnh quay giả? SaoStar 10/04/19 16:00 GMT+7122 liên quanGốc Thông tin được úp mở bởi chính Joe Russo - một trong cặp đôi anh em đạo diễn trong phim Avengers: Endgame (Hồi kết). Mặc dù liên tục quảng bá cho Avengers: Endgame (Hồi kết)suốt nhiều tháng trời nhưng Marvel Studios đặc biệt giữ bí mật về nội dung phim, không để lộ ra ngoài dù chỉ là một chi tiết nhỏ. Chính vì thế, những gì mà fan biết được qua các teaser, trailer hầu hết chỉ là hình ảnh rời rạc, không thể dự đoán chuyện gì sẽ xảy ra. Tuy nhiên gần đây, trong trailer mới nhất, các fan đã vô cùng thích thú khi chứng kiến cảnh hội ngộ giữa Iron Man và Captain America. Cảnh gặp nhau giữa 2 nhân vật trong trailer. Sau khi Iron Man bị kẹt ở hành tinh Titan không rõ sống chết, nhiều người cho rằng anh và Nebula sẽ trở về trái đất, tìm cách hội ngộ với các Avengers còn lại. Và cảnh Iron Man gặp Captain America cũng là một phân đoạn khi tất cả đoàn tụ. Thế nhưng khi được hỏi về điều này, chính đạo diễn Joe Russo cho biết cảnh đặc biệt đó sẽ không xuất hiện trong phim. Trailer cuối của Avengers: Endgame Mặc dù câu trả lời khá bâng quơ và kết thúc bằng một nụ cười nhưng có lẽ điều mà Joe nói là sự thật. Sau đó, Anthony Russo cố gắng kể nhiều hơn về câu chuyện và đánh lạc hướng khán giả, nhằm không để Joe tiết lộ về nội dung phim. Cuối cùng, Joe cũng nói: “Cũng có thể cảnh đó sẽ xuất hiện trong phim”. Tuy nhiên lúc này, có rất ít người tin vào cách cả hai đang cố gắng che giấu sự thật. Mặc dù nhiều lần bị sự cố “lỡ miệng” do diễn viên, những người được thưởng thức trước bộ phim hay chính ekip, thế nhưng nhìn chung, việc giữ bí mật về nội dung Avengers: Endgameđược thực hiện khá tốt. Chính bộ đôi đạo diễn cũng thừa nhận rằng đã đưa những cảnh quay không có trong phim vào trailer để nhằm đánh lạc hướng suy nghĩ và tạo bất ngờ cho mọi người khi thưởng thức tác phẩm. Đây là một điều khá thú vị, thúc đẩy trí tưởng tượng của khán giả về nội dung phim và nhận lại một cái kết bất ngờ nằm ngoài mong đợi. Hơn ai hết, có lẽ anh em nhà Russo là những người mong chờ bộ phim lên sóng nhất, vì đến lúc họ được chứng kiến thành quả mà mình dày công tạo ra trong suốt thời gian dài. Đâu là những cảnh thật và đâu là cảnh thêm vào để “tung hỏa mù” trước người hâm mộ trong trailer của bộ phim? Câu trả lời sẽ được hé lộ khi tác phẩm chính thức công chiếu ngày 26/4 này!'
,'Iron Man & Captain America bắt tay làm hòa trong trailer Avengers: Endgame chỉ là cảnh quay giả?', 100, 5, 2, 1, 1);
---------------- insert table nhan_baiViet
insert into Nhan_BaiViet(IDBaiViet, IDTag) values('BV0001','T1');
---------------- insert table baiviet_hinhanh
insert into baiviet_hinhanh(IDBaiViet,IdHinh) values('BV0001',1);
--------------- insert table BinhLuan
insert into BinhLuan(baiviet, DocGia, NoiDung, TinhTrang) values ('BV0001', 10, 'Hay qua', 1);
insert into BinhLuan(baiviet, DocGia, NoiDung, TinhTrang) values ('BV0001', 11, 'Thật mong đợi', 0);

