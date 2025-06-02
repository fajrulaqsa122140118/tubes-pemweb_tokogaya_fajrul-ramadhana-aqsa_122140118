import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import "./Home.css";

import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const carouselRef = useRef(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => setError("Gagal memuat produk"));
  }, []);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="welcome-section">
          <h1 className="welcome-title">TokoGaya</h1>
          <p className="welcome-description">
            TokoGaya menyediakan berbagai macam produk fashion berkualitas
            dengan harga terjangkau. Dapatkan penawaran menarik setiap hari!
          </p>
        </div>

        <h2>Daftar Produk</h2>
        {error && <p className="error">{error}</p>}
        <div className="carousel-section">
          <button className="carousel-button left" onClick={scrollLeft}>
            <FaArrowLeft />
          </button>
          <div className="carousel-scroll" ref={carouselRef}>
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <h3>{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="bottom-info">
                  <p className="product-price">
                    Rp {(product.price * 16000).toLocaleString()}
                  </p>
                  <Link to="/filter">
                    <button className="btn-cart">Beli Sekarang</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-button right" onClick={scrollRight}>
            <FaArrowRight />
          </button>
        </div>

        <div className="store-info-section">
          <div className="store-map">
              <iframe
                title="Lokasi TokoGaya"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.2842255735975!2d112.7322361!3d-7.2072698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf771fdfe11%3A0x47b3efba5c0d2285!2sJl.%20Merdeka%20No.123%2C%20Surabaya%2C%20Jawa%20Timur!5e0!3m2!1sen!2sid!4v1716942931040!5m2!1sen!2sid"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>
          <div className="store-info">
            <h2>
              <FaMapMarkerAlt
                style={{ color: "crimson", marginRight: "8px" }}
              />{" "}
              Lokasi Toko Kami
            </h2>
            <a
              href="https://www.google.com/maps/place/Institut+Teknologi+Sumatera/@-5.3501053,105.2664505,13.4z/data=!4m6!3m5!1s0x2e40c35634c1a611:0xcb3cf692dbb4f26!8m2!3d-5.3582643!4d105.3148495!16s%2Fg%2F119pgszv6?entry=ttu&g_ep=EgoyMDI1MDUyNi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noreferrer"
              className="promo-button"
            >
              Lihat di Google Maps
            </a>
            <p>
              <strong>TokoGaya - Cabang Utama</strong>
            </p>
            <p>
              <strong>Alamat:</strong> Jl. Terusan Ryacudu, Way Huwi, Kec. Jati
              Agung, Kabupaten Lampung Selatan, Lampung 35365
            </p>
            <p>
              <strong>Jam Buka:</strong>
              <br />
              Senin - Sabtu: 09.00 - 21.00
              <br />
              Minggu: Tutup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
