import React, { useEffect, useState } from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

function Hero() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchimage = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/files/hero-image`);
        const data = await res.json();
        setImage(data.image_url);
      } catch (e) {
        console.error("Hero image load failed", e);
      } finally {
        setLoading(false);
      }
    };

    fetchimage();
  }, []);

  if (loading) {
    return (
      <section className="hero">
        <Loader />
      </section>
    );
  }

  return (
    <section className="hero">
      <img src={image} alt="hero section" className="hero-img" />
      <div className="hero-content">
        <h2>Discover your Style Effortlessly</h2>
        <button onClick={() => navigate("/products")}>SHOP NOW</button>
      </div>
    </section>
  );
}

export default Hero;
