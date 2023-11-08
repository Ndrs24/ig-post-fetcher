import { minify } from 'terser'
import fs from 'fs/promises'

let sourceCode = await fs.readFile('./src/index.js', 'utf8')
sourceCode = `(async () => {${sourceCode}})()`

const { code } = await minify(sourceCode, {
	compress: true,
	ecma: 2020,
	module: true,
	mangle: true,
})

const minifyCode = code.replaceAll('\\n', '').replaceAll('\\t', '')

await fs.writeFile('./dist/output.txt', minifyCode)

const readme = `
## Para que sirve
Este script sirve para poder descargar las imágenes y videos de una publicación de instagram, ojo, este script solo funciona estando dentro de una publicación de instagram, de lo contrario no funcionará, solo sirve para poder descargar las imágenes y videos de una publicación de instagram, pronto agregaré más funciones.

## Como usar
Estando dentro de una publicación de instagram, abre la consola del navegador, copia el codigo de abajo y pégalo en la consola, le das enter, y listo.

\`\`\`js data-copy
${minifyCode}  
\`\`\`

## Como usar en celular
Primero copia el código de arriba, luego estando dentro de una publicación de instagram, en la barra de navegación, borra todo y escribe lo siguiente:
\`\`\`
javascript:
\`\`\`

Luego pega el codigo copiado, te quedaría así:
\`\`\`
javascript:(async()=>{if(void 0===typ...
\`\`\`

Recuerda escribir "javascript:" manualmente y despues pegar el código, debido a que no se puede pegar directamente todo.

Si usas el teclado GBoard y tienes activado el portapales, puedes copiar lo siguiente de uno en uno y despues pegarlo en la barra de navegación para que te sea más fácil.

\`\`\`txt data-copy
javascript
\`\`\`
\`\`\`txt data-copy
:
\`\`\`
\`\`\`js data-copy
${minifyCode}
\`\`\`

## Como volver a compilar
Si tienes dudas sobre el código, puedes revisar los archivos del respositorio y ver que hace el codígo que estás usando. Para compilar (minificar) el codigo ejecuta el siguiente comando en NodeJS, este comando regenerará tambien el README.md (Este mismo archivo) con el código actulizado.

\`\`\`txt data-copy
npm run build
\`\`\`
`.trim()

await fs.writeFile('./README.md', readme)
console.log(minifyCode)
