/* eslint-disable no-irregular-whitespace */
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addFavorites, getProductById } from '../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { HeartFill } from 'react-bootstrap-icons';
import { FaHamburger } from 'react-icons/fa';
import { BsCupStraw, BsCheck2Circle } from 'react-icons/bs';
import { GiFrenchFries } from 'react-icons/gi';
import { TbPlant, TbChartBubble, TbCandy } from 'react-icons/tb';
import { CgSize } from 'react-icons/cg';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const producto = useSelector((state) => state.productDetail);
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const addFav = () => {
    dispatch(addFavorites(id));
  };

  return (
    <div>
      <Container className="productDetail__container">
        <Link
          onClick={() => addFav(id)}
          to="/userfavorites"
          className="mt-3 mb-5 productDetail__link"
        >
          <HeartFill className="productDetail__link__Svg " />
          Agregar a Favoritos
        </Link>
        <hr />
        <Row>
          <Col lg={6} sm={12} className="mb-2">
            <h1 className="productDetail__tittle">{producto.name}</h1>
            <img
              src={producto.imgUri}
              className="productDetail__img img-fluid"
              alt="imagen del producto"
            />
          </Col>
          <Col lg={6} sm={12}>
            <section className="productDetail__map__container">
              <h2>Descripción:</h2>

              <p>
                <TbPlant />
                 Veggie: {producto.isVeggie ? 'Si' : 'No'}
              </p>

              {producto.ingredient &&
                producto.ingredient?.map((p) => (
                  <div key={p.name.length}>
                    <p className="productDetail__text">
                      <BsCheck2Circle /> {p.name}
                    </p>
                  </div>
                ))}

              {producto.burger &&
                producto.burger?.map((p) => (
                  <div key={p.name.length}>
                    <p className="productDetail__text">
                      <FaHamburger /> {p.name}
                    </p>
                  </div>
                ))}
              {producto.beverage &&
                producto.beverage?.map((p) => (
                  <div key={p.name.length}>
                    <p className="productDetail__text">
                      <BsCupStraw /> {p.name}
                    </p>
                  </div>
                ))}

              {producto.fries &&
                producto.fries?.map((p) => (
                  <div key={p.name.length}>
                    <p className="productDetail__text">
                      <GiFrenchFries /> {p.name}
                    </p>
                  </div>
                ))}
              {producto.size && (
                <p>
                  <CgSize />
                   Tamaño: {producto.size}
                </p>
              )}

              {producto.isCarbonated && (
                <p>
                  <TbChartBubble />
                   Tiene gas: {producto.isCarbonated ? 'Si' : 'No'}
                </p>
              )}
              {producto.isSugar && (
                <p>
                  <TbCandy />
                   Tiene azúcar: {producto.isSugar ? 'Si' : 'No'}
                </p>
              )}
              <p>
                <strong>Precio: $ {producto.price}</strong>
              </p>
            </section>
          </Col>
        </Row>
        <hr />
        <Button as={Link} to="/menu" className="mt-3 mb-5">
          Volver al Menú
        </Button>
      </Container>
    </div>
  );
}

export default ProductDetail;
