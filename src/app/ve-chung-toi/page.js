export default function AboutUs() {
  return (
    <>
      <div className="container my-5">
        {/* Phần tiêu đề */}
        <div className="row">
          <div className="col-md-12 text-center">
            <h2>VỀ CHÚNG TÔI</h2>
            <p>
              Dự án Dreamers - Building online store for men's fashion được thực
              hiện với mục tiêu xây dựng một website bán hàng chuyên nghiệp, tập
              trung vào thời trang nam. Trong thời đại công nghệ hiện nay, việc
              sở hữu một trang web không chỉ giúp các cửa hàng tiếp cận được
              nhiều khách hàng hơn mà còn tối ưu hóa quy trình bán hàng, quản lý
              hàng hóa và đơn hàng hiệu quả. Nhóm Dreamers hướng đến việc tạo ra
              một trang web có giao diện hiện đại, dễ sử dụng, với trải nghiệm
              người dùng thân thiện và trực quan. Website sẽ hiển thị sản phẩm
              một cách sinh động và rõ ràng, giúp khách hàng dễ dàng tìm kiếm và
              mua sắm các sản phẩm thời trang nam phù hợp. Hơn nữa, hệ thống còn
              tích hợp các tính năng quản lý kho hàng và xử lý đơn hàng, hỗ trợ
              người quản lý cửa hàng kiểm soát hiệu quả các hoạt động kinh
              doanh. Dự án không chỉ dừng lại ở việc xây dựng một cửa hàng trực
              tuyến mà còn hướng tới việc tạo ra một giải pháp toàn diện cho
              doanh nghiệp, giúp nâng cao hiệu quả vận hành và đem lại sự hài
              lòng cho khách hàng.
            </p>
          </div>
        </div>
        {/* Phần nội dung */}
        <div className="row mt-4">
          {/* Google Maps */}
          <div className="col-md-6">
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d415.8350065856255!2d106.62617862981467!3d10.853860978820471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b6c59ba4c97%3A0x535e784068f1558b!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2sus!4v1733735653673!5m2!1svi!2sus"
                width={600}
                height={400}
                style={{ border: 0 }}
                loading={"lazy"}
                referrerpolicy={"no-referrer-when-downgrade"}
              ></iframe>
            </div>
          </div>
          {/* Thông tin chi nhánh */}
          <div className="col-md-5">
            <div className="branch">
              <img
                src="../img-gioithieu/chi-nhanh1.jpg"
                className="img-fluid"
                alt="Chi nhánh 01"
              />
              <p>
                Chi nhánh 01
                <br />
                Địa chỉ: 123 Trần Hữu Trang, Phú Nhuận, Hồ Chí Minh
              </p>
            </div>
            <div className="branch">
              <img
                src="../img-gioithieu/chi-nhanh2.jpg"
                className="img-fluid"
                alt="Chi nhánh 02"
              />
              <p>
                Chi nhánh 02
                <br />
                Địa chỉ: 125 Trần Hữu Trang, Phú Nhuận, Hồ Chí Minh
              </p>
            </div>
            <div className="branch">
              <img
                src="../img-gioithieu/chi-nhanh3.jpg"
                className="img-fluid"
                alt="Chi nhánh 03"
              />
              <p>
                Chi nhánh 03
                <br />
                Địa chỉ: 130 Trần Hữu Trang, Phú Nhuận, Hồ Chí Minh
              </p>
            </div>
            <div className="branch">
              <img
                src="../img-gioithieu/chi-nhanh4.jpg"
                className="img-fluid"
                alt="Chi nhánh 04"
              />
              <p>
                Chi nhánh 04
                <br />
                Địa chỉ: 140 Trần Hữu Trang, Phú Nhuận, Hồ Chí Minh
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
