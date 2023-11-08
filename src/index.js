async function open() {
	if (typeof window === undefined) {
		throw alert('This script must be run in the browser')
	}

	const url = new URL(window.location.href)

	if (url.origin !== 'https://www.instagram.com') {
		throw alert('This script must be run on Instagram')
	}

	const pathname = url.pathname.split('/')

	if (pathname[1] !== 'p') {
		throw alert('This script must be run on a post')
	}

	url.pathname = pathname.slice(0, 3).join('/')

	url.search = '__a=1&__d=dis'

	const result = await fetch(url)

	if (!result.ok) {
		throw alert('Failed to fetch post')
	}

	const data = await result.json()

	if (!data.items[0]) {
		throw alert('Uknow fetch data')
	}

	const post = data.items[0]
	let media

	switch (post.media_type) {
		case 1:
			media = {
				type: 'image',
				sources: [post.image_versions2.candidates[0].url],
			}
			break
		case 2:
			media = { type: 'video', sources: [post.video_versions[0].url] }
			break
		case 8:
			media = {
				type: 'image',
				sources: post.carousel_media.map(
					(v) => v.image_versions2.candidates[0].url
				),
			}
			break
		default:
			throw alert('Uknow post type')
	}

	const div = document.createElement('div')
	div.innerHTML = `
		<style>
			.modalIGPF {
				position: fixed;
				inset: 0;
				margin: auto;
				width: 15rem;
				height: 21rem;
				padding: 1rem;
				background: blue;
				color: white;
				border-radius: 5px;
				box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
				overflow: auto;
				z-index: 99999;
			}
	
			.fcIGPF {
				display:flex;
				align-items:center;
				jutify-content:center;
			}
	
			.imgIGPF {
				width: 50px;
				height: 50px;
				object-fit: cover;
				border-radius: 5px;
			}
		</style>
		<h1 style="margin-bottom:12px;text-align:center;font-size:20px">Resultado</h1>
		<div class="fcIGPF" style="width:100%;flex-direction:column;gap:5px">
			${media.sources
				.map((v) =>
					media.type === 'image'
						? `
						<div class="fcIGPF" style="gap:10px">
							<div>
								<img src="${v}" class="imgIGPF" />
							</div>
							<div>
								<a href="${v}" target="_blank">Ver en HD</a>
							</div>
						</div>
					`
						: `
						<div class="fcIGPF" style="gap:10px">
							<div>
								<video src="${v}" class="imgIGPF"></video>
							</div>
							<div>
								<a href="${v}" target="_blank">Ver en HD</a>
							</div>
						</div>
					`
				)
				.join('')}
		</div>
	`

	div.classList.add('modalIGPF')
	document.body.appendChild(div)
	return div
}

let opened = false
let loading = false
let modalEl

const toggleEl = document.createElement('div')
toggleEl.role = 'button'
toggleEl.textContent = 'Abrir'

toggleEl.addEventListener('click', async () => {
	if (opened) {
		modalEl.remove()
		modalEl = null
		opened = false
		toggleEl.textContent = 'Abrir'
	} else {
		if (loading) return
		loading = true
		toggleEl.textContent = 'Cargando...'

		try {
			modalEl = await open()
		} catch (error) {
			loading = false
			toggleEl.textContent = 'Abrir'
			return
		}

		loading = false
		opened = true
		toggleEl.textContent = 'Cerrar'
	}
})

toggleEl.style.position = 'fixed'
toggleEl.style.bottom = '1rem'
toggleEl.style.right = '1rem'
toggleEl.style.padding = '10px'
toggleEl.style.zIndex = '99999'
toggleEl.style.backgroundColor = 'blue'
toggleEl.style.color = 'white'
toggleEl.style.borderRadius = '5px'
toggleEl.style.cursor = 'pointer'

toggleEl.addEventListener('mouseover', () => {
	toggleEl.style.backgroundColor = 'darkblue'
})

toggleEl.addEventListener('mouseout', () => {
	toggleEl.style.backgroundColor = 'blue'
})

document.body.appendChild(toggleEl)
