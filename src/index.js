async function main() {
	if (typeof window === undefined) {
		alert('This script must be run in the browser')
		throw ''
	}

	const url = new URL(window.location.href)

	if (url.origin !== 'https://www.instagram.com') {
		alert('This script must be run on Instagram')
		throw ''
	}

	if (url.pathname.split('/')[1] !== 'p') {
		alert('This script must be run on a post')
		throw ''
	}

	url.search = new URLSearchParams({ __a: 1, __d: 'dis' })

	const result = await fetch(url)

	if (!result.ok) {
		alert('Failed to fetch post')
		throw ''
	}

	const data = await result.json()

	if (!data.items[0]) {
		alert('Uknow fetch data')
		throw ''
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
			alert('Uknow post type')
	}

	const profilePicUrl = post.caption.user.hd_profile_pic_url_info.url

	const div = document.createElement('div')

	div.innerHTML = `
			<h6 style="font-style:italic;margin-bottom:10px;text-align:center">Aviso: Para quitar este cuadro tienes que recargar la página, si lo haces, tendrás que volver a ejecutar el script.</h6>
			<h1 style="text-align:center;margin-bottom:10px;font-size:20px">Resultado</h1>
			<div style="width:100%;display:flex;flex-direction:column;align-items:center;jutify-content:center;gap:5px">
				<div style="display:flex;align-items:center;jutify-content:center;gap:10px">
					<div>
						<img src="${profilePicUrl}" style="width:50px;height:50px;object-fit:cover;border-radius:5px" />
					</div>
					<div>
						<a href="${profilePicUrl}" target="_blank">Ver en HD</a>
					</div>
				</div>
				${media.sources
					.map((v) =>
						media.type === 'image'
							? `
							<div style="display:flex;align-items:center;jutify-content:center;gap:10px">
								<div>
									<img src="${v}" style="width:50px;height:50px;object-fit:cover;border-radius:5px" />
								</div>
								<div>
									<a href="${v}" target="_blank">Ver en HD</a>
								</div>
							</div>
						`
							: `<video src="${v}" controls></video>`
					)
					.join('')}
			</div>
	`

	div.style.position = 'fixed'
	div.style.inset = '0'
	div.style.margin = 'auto'
	div.style.width = '15rem'
	div.style.height = '21rem'
	div.style.padding = '1rem'
	div.style.background = 'blue'
	div.style.color = 'white'
	div.style.borderRadius = '5px'
	div.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)'
	div.style.overflow = 'auto'
	div.style.zIndex = '99999'

	document.body.appendChild(div)
}

main()
