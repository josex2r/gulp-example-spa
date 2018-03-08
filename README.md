# gulp-example-spa

Aplicación hecha con [gulp](https://gulpjs.com/) y [React](https://reactjs.org/) para el [Curso de NodeJS](https://github.com/Fictizia/Curso-Node.js-para-desarrolladores-Front-end_ed5) de [@Fictizia](https://github.com/Fictizia);

El objetivo es completar el fichero `gulpfile.js` para construir la aplicación React.

## Instalación

> Por defecto la aplicación arrancará en el puerto **8080**.

```
git clone https://github.com/josex2r/gulp-example-spa.git
cd gulp-example-spa
npm install
gulp server
```

## Plantilla

En la rama [#template](https://github.com/josex2r/gulp-example-spa/tree/template) se encuentra el proyecto con el gulpfile en blanco para completarlo.

## Ejercicio

Crear los siguientes tareas de gulp:

- `default`: Construirá la aplicación mediante la tarea `build`.
- `server`: Construirá la aplicación, arrancará un servidor web y escuchará cambios en los ficheros fuentes para reconstruir la aplicación.
- `build`: Limpiará el directorio de construcción mediante la tarea `clean` y creará los ficheros de la aplicación en el directorio `dist/` ejecutando las tareas: `public`, `vendor`, `images`, `styles`, `scripts`.
- `clean`: Limpiará el directorio de construcción.
- `images`: Copiará todo el contenido del directorio `src/images/` a `dist/`.
- `vendor`: Transforma el fichero `node_modules/requirejs/require.js` en `dist/scripts/vendor.js` (opcionalmente minificará el resultado). 
- `styles`: A partir del fichero `src/styles/index.scss` se generará el fichero `dist/styles/app.css` utilizando [sass](https://sass-lang.com/).
- `public`: Copiará todos los ficheros de `public/` a `dist/`.
- `scripts`: Utilizando [browserify](http://browserify.org/) y [babelify](https://github.com/babel/babelify) se generará el fichero `dist/scripts/app.js` que contiene toda la lógica de la aplicación (opcionalmente minificará el resultado).
- `lint`: Ejecutará el validador [eslint](https://eslint.org/) en todos los ficheros javascript del directorio `src`.