# NextJS Tesla Shop

## Ejecutar base de datos

```
  $ docker-compose up -d
```

## MongoDB Local host:

```
mongodb://localhost:27017/
```

## Endpoint para **SEED** [redirect](http://localhost:3000/api/seed)

```
http://localhost:3000/api/seed
```

## Instalar dependencias
```
$ yarn install
```
### Clonar .env.template y configurar
```
MONGODB_URI= URL a la base datos

NEXT_PUBLIC_URL= URL al origen de la web
NEXT_PUBLIC_TAX=impuestos para el summary
```

## Ejecutar modo desarrollo
```
$ yarn dev
```