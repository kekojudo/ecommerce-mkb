create table usuarios(
id_usu BIGINT PRIMARY KEY AUTO_INCREMENT,
email_usu VARCHAR(255) NOT NULL UNIQUE,
nombre_usu varchar(100) not null,
apellido_usu varchar(100) not null,
telefono_usu varchar(20) unique not null,
contra_usu varchar(255) not null,
foto_usu varchar(255) null,
creado_usu timestamp(0) not null,
modificado_usu timestamp(0) not null
);


create table roles(
id_rol bigint primary key auto_increment,
nombre_rol varchar(90) not null unique,
imagen_rol varchar(255) null,
route varchar(255) not null,
creado timestamp(0) not null,
modificado timestamp(0) not null
);


insert into roles(
nombre_rol,
route,
creado,
modificado)values(
'Almacen',
'/almacen/orders/list',
'2023-01-03',
'2023-01-03'
);

insert into roles(
nombre_rol,
route,
creado,
modificado)values(
'Bodeguero',
'/delivery/orders/list',
'2023-01-03',
'2023-01-03'
);

insert into roles(
nombre_rol,
route,
creado,
modificado)values(
'Cliente',
'/client/products/list',
'2023-01-03',
'2023-01-03'
);

create table detalle_roles(
id_usu BIGINT not null,
id_rol Bigint not null,
creado timestamp(0) not null,
modificado timestamp(0) not null,
foreign key(id_usu) references usuarios(id_usu) on update cascade on delete cascade,
foreign key(id_rol) references roles(id_rol) on update cascade on delete cascade,
primary key (id_usu, id_rol)
);

CREATE TABLE `categorias` (
  `id_cat` bigint NOT NULL AUTO_INCREMENT,
  `nombre_cat` varchar(100) NOT NULL,
  `desc_cat` text NOT NULL,
  `creado` timestamp NOT NULL,
  `modificado` timestamp NOT NULL,
  PRIMARY KEY (`id_cat`),
  UNIQUE KEY `nombre_cat_UNIQUE` (`nombre_cat`)
) 
create table productos(
id_pro bigint primary key auto_increment,
nombre_pro varchar(180) not null unique,
desc_pro text not null,
precio_pro decimal not null,
stock_pro int not null,
foto1_pro varchar(255) not null,
foto2_pro varchar(255) not null,
id_cat bigint not null,
creado timestamp(0) not null,
modificado timestamp(0) not null,
foreign key(id_cat) references categorias(id_cat) on update cascade on delete cascade
);
create table direcciones(
id_dir bigint primary key auto_increment,
direccion_dir varchar(255) not null,
provincia_dir varchar(100) not null,
ciudad_dir varchar(100) not null,
latitud_dir double not null,
longitud_dir double  not null,
creado timestamp(0) not null,
modificado timestamp(0) not null,
id_usu bigint not null,
foreign key(id_usu) references usuarios(id_usu) on update cascade on delete cascade
);
create table pedidos (
id_ped bigint primary key auto_increment,
id_cliente bigint not null,
id_bodega bigint null,
id_dir bigint not null,
foto_guia_ped varchar(255) null,
status varchar(90) not null,
timestamp bigint not null,
creado timestamp(0) not null,
modificado timestamp(0) not null,
foreign key(id_cliente) references usuarios(id_usu) on update cascade on delete cascade,
foreign key (id_bodega) references usuarios(id_usu) on update cascade on delete cascade,
foreign key(id_dir) references direcciones(id_dir) on update cascade on delete cascade
);
create table detalle_pedidos(
	id_ped bigint not null,
    id_pro bigint not null,
    cantidad_pro int not null,
    creado timestamp(0) not null,
    modificado timestamp(0) not null,
    primary key(id_ped, id_pro),
    foreign key(id_ped) references pedidos(id_ped) on update cascade on delete cascade,
    foreign key(id_pro) references productos(id_pro) on update cascade on delete cascade
);