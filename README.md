## Para que sirve
Este script sirve para poder descargar las imágenes y videos de una publicación de instagram, ojo, este script solo funciona estando dentro de una publicación de instagram, de lo contrario no funcionará, solo sirve para poder descargar las imágenes y videos de una publicación de instagram, pronto agregaré más funciones.

## Como usar
Estando dentro de una publicación de instagram, abre la consola del navegador, copia el codigo de abajo y pégalo en la consola, le das enter, y listo.

```js data-copy
(async()=>{if(void 0===typeof window)throw alert("This script must be run in the browser");const t=new URL(window.location.href);if("https://www.instagram.com"!==t.origin)throw alert("This script must be run on Instagram");const e=t.pathname.split("/");if("p"!==e[1])throw alert("This script must be run on a post");t.pathname=e.slice(0,3).join("/"),t.search="__a=1&__d=dis";const i=await fetch(t);if(!i.ok)throw alert("Failed to fetch post");const n=await i.json();if(!n.items[0])throw alert("Uknow fetch data");const s=n.items[0];let a;switch(s.media_type){case 1:a={type:"image",sources:[s.image_versions2.candidates[0].url]};break;case 2:a={type:"video",sources:[s.video_versions[0].url]};break;case 8:a={type:"image",sources:s.carousel_media.map((t=>t.image_versions2.candidates[0].url))};break;default:throw alert("Uknow post type")}const r=s.caption.user.hd_profile_pic_url_info.url,o=document.createElement("div");o.innerHTML=`<h6 style="font-style:italic;margin-bottom:10px;text-align:center">Aviso: Para quitar este cuadro tienes que recargar la página, si lo haces, tendrás que volver a ejecutar el script.</h6><h1 style="text-align:center;margin-bottom:10px;font-size:20px">Resultado</h1><div style="width:100%;display:flex;flex-direction:column;align-items:center;jutify-content:center;gap:5px"><div style="display:flex;align-items:center;jutify-content:center;gap:10px"><div><img src="${r}" style="width:50px;height:50px;object-fit:cover;border-radius:5px" /></div><div><a href="${r}" target="_blank">Ver imagen de perfil en HD</a></div></div>${a.sources.map((t=>"image"===a.type?`<div style="display:flex;align-items:center;jutify-content:center;gap:10px"><div><img src="${t}" style="width:50px;height:50px;object-fit:cover;border-radius:5px" /></div><div><a href="${t}" target="_blank">Ver en HD</a></div></div>`:`<video src="${t}" controls></video>`)).join("")}</div>`,o.style.position="fixed",o.style.inset="0",o.style.margin="auto",o.style.width="15rem",o.style.height="21rem",o.style.padding="1rem",o.style.background="blue",o.style.color="white",o.style.borderRadius="5px",o.style.boxShadow="0 0 10px rgba(0,0,0,0.5)",o.style.overflow="auto",o.style.zIndex="99999",document.body.appendChild(o)})();  
```

## Como usar en celular
Primero copia el código de arriba, luego estando dentro de una publicación de instagram, en la barra de navegación, borra todo y escribe lo siguiente:
```
javascript:
```

Luego pega el codigo copiado, te quedaría así:
```
javascript:(async()=>{if(void 0===typ...
```

Recuerda escribir "javascript:" manualmente y despues pegar el código, debido a que no se puede pegar directamente todo.

Si usas el teclado GBoard y tienes activado el portapales, puedes copiar lo siguiente de uno en uno y despues pegarlo en la barra de navegación para que te sea más fácil.

```txt data-copy
javascript
```
```txt data-copy
:
```
```js data-copy
(async()=>{if(void 0===typeof window)throw alert("This script must be run in the browser");const t=new URL(window.location.href);if("https://www.instagram.com"!==t.origin)throw alert("This script must be run on Instagram");const e=t.pathname.split("/");if("p"!==e[1])throw alert("This script must be run on a post");t.pathname=e.slice(0,3).join("/"),t.search="__a=1&__d=dis";const i=await fetch(t);if(!i.ok)throw alert("Failed to fetch post");const n=await i.json();if(!n.items[0])throw alert("Uknow fetch data");const s=n.items[0];let a;switch(s.media_type){case 1:a={type:"image",sources:[s.image_versions2.candidates[0].url]};break;case 2:a={type:"video",sources:[s.video_versions[0].url]};break;case 8:a={type:"image",sources:s.carousel_media.map((t=>t.image_versions2.candidates[0].url))};break;default:throw alert("Uknow post type")}const r=s.caption.user.hd_profile_pic_url_info.url,o=document.createElement("div");o.innerHTML=`<h6 style="font-style:italic;margin-bottom:10px;text-align:center">Aviso: Para quitar este cuadro tienes que recargar la página, si lo haces, tendrás que volver a ejecutar el script.</h6><h1 style="text-align:center;margin-bottom:10px;font-size:20px">Resultado</h1><div style="width:100%;display:flex;flex-direction:column;align-items:center;jutify-content:center;gap:5px"><div style="display:flex;align-items:center;jutify-content:center;gap:10px"><div><img src="${r}" style="width:50px;height:50px;object-fit:cover;border-radius:5px" /></div><div><a href="${r}" target="_blank">Ver imagen de perfil en HD</a></div></div>${a.sources.map((t=>"image"===a.type?`<div style="display:flex;align-items:center;jutify-content:center;gap:10px"><div><img src="${t}" style="width:50px;height:50px;object-fit:cover;border-radius:5px" /></div><div><a href="${t}" target="_blank">Ver en HD</a></div></div>`:`<video src="${t}" controls></video>`)).join("")}</div>`,o.style.position="fixed",o.style.inset="0",o.style.margin="auto",o.style.width="15rem",o.style.height="21rem",o.style.padding="1rem",o.style.background="blue",o.style.color="white",o.style.borderRadius="5px",o.style.boxShadow="0 0 10px rgba(0,0,0,0.5)",o.style.overflow="auto",o.style.zIndex="99999",document.body.appendChild(o)})();
```

## Como volver a compilar
Si tienes dudas sobre el código, puedes revisar los archivos del respositorio y ver que hace el codígo que estás usando. Para compilar (minificar) el codigo ejecuta el siguiente comando en NodeJS, este comando regenerará tambien el README.md (Este mismo archivo) con el código actulizado.

```txt data-copy
npm run build
```