-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-12-2020 a las 11:35:35
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbqcode`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre`) VALUES
(1, 'Admin'),
(2, 'empleado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_bin NOT NULL,
  `apellido` varchar(50) COLLATE utf8_bin NOT NULL,
  `telefono` varchar(15) COLLATE utf8_bin DEFAULT NULL,
  `correo` varchar(45) COLLATE utf8_bin NOT NULL,
  `contrasena` varchar(200) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `id_rol`, `nombre`, `apellido`, `telefono`, `correo`, `contrasena`) VALUES
(1, 1, 'admin', 'admin', '1234', 'admin@gmail.com', '$2b$10$9OGFyqe993Fvf.ZOR5MZJu88Wy8qtvGlC.iRoKAYz28hyp9Vb9OIa'),
(2, 2, 'empleado1', 'empleado1', '555', 'empleado1@gmail.com', '$2b$10$xOM96MeLQO6r85IJGMSE9eJw5QuN.g01Ackb7kr4t7cf0WeSqhNfu'),
(3, 2, 'empleado2', 'empleado', '301459', 'empleado2@gmail.com', '$2b$10$N0uYu5VyZ6275Gdk8Tp0v.vvj6ZvZrRsrNTsJJaFqUiPYx5bNKrX.'),
(4, 2, 'empleado3', 'empleado', '888', 'empleado3@gmail.com', '$2b$10$k8Wrb3jVo5WY0FN/KAYX3ussRcHQuePSQa9Hy/zMfd1KLwQ12uxz.'),
(12, 2, 'Juan', 'Torres', '3107259180', 'juan@gmail.com', '$2b$10$VVtX.psXP36Qp1tG/nWJguk4mCPEW4D/2UNddX4k5qXWtWS2HteHe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id_vehiculo` int(11) NOT NULL,
  `placa` varchar(10) COLLATE utf8_bin NOT NULL,
  `marca` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `modelo` varchar(4) COLLATE utf8_bin DEFAULT NULL,
  `color` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `detalle` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `imagen` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_insert` datetime DEFAULT NULL,
  `fecha_update` datetime DEFAULT NULL,
  `estado` tinyint(4) DEFAULT 1,
  `valor` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id_vehiculo`, `placa`, `marca`, `modelo`, `color`, `detalle`, `imagen`, `id_usuario`, `fecha_insert`, `fecha_update`, `estado`, `valor`) VALUES
(9, 'TSL-342', 'TESLA', '2019', 'NEGRO', 'Motor', '9rPfVvgvAt1SmyQO_XjByHwW.png', 2, '2020-11-22 16:00:00', '2020-12-05 04:54:50', 1, 210000),
(22, 'CVT-345', 'CHEVROLET', '2012', 'ROJO', 'Frenos', 'hCVvusputzaECotLePCB6jEU.png', 2, '2020-12-05 04:08:25', '2020-12-04 17:58:11', 1, 210000),
(24, 'MRC-142', 'MERCEDES BENZ', '1990', 'BLANCO', 'Reparo de frenos', 'TxMV7yRNjYd8-2rhhLFxhzHA.png', 2, '2020-12-05 04:08:25', '2020-12-04 11:38:10', 1, 250000),
(25, 'TYT-634', 'TOYOTA', '2020', 'AZUL', 'Arreglo de pistón', 'KnFpcgk1GY7q9PSXpwp67Fvg.png', 2, '2020-12-05 04:08:25', '2020-12-04 17:52:24', 1, 210000),
(27, 'CMR-840', 'CHEVROLET', '2019', 'AMARILLO', 'Cambio de aceite ', '4-ok-m023Z4CLwI-OrbJKG1K.png', 2, '2020-12-05 04:08:25', '2020-12-04 22:02:31', 1, 210000),
(32, 'TSL-225', 'AUDI', '2015', 'NEGRO', 'Motor', 'fvm1OqJGyLBvS5c7d5tyLEBm.png', 2, '2020-11-23 14:30:00', '2020-12-05 04:55:13', 1, 200000),
(103, 'HYU-234', 'HYUNDAI', '2020', 'GRIS', 'Cambio de llantas', 'czPqJLfLdcxMPde0nve-e1Rg.png', 2, '2020-12-05 04:57:24', '2020-12-05 04:57:24', 1, 200000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_roles` (`id_rol`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id_vehiculo`),
  ADD KEY `fk_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `id_vehiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_roles` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
