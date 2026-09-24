import urllib.request
import re
import os

urls = [
    ('ruta_merindades_finde.jpg', 'https://senderosdelasmerindades.es/que-ver-en-las-merindades-en-un-fin-de-semana/'),
    ('ruta_merindades_3_4.jpg', 'https://senderosdelasmerindades.es/que-ver-en-las-merindades-en-3-o-4-dias/'),
    ('ruta_merindades_5dias.jpg', 'https://senderosdelasmerindades.es/que-ver-en-las-merindades-en-5-dias/'),
    ('ruta_valles_pasiegos.jpg', 'https://www.rutasporcantabria.com/ruta-por-los-valles-pasiegos.html'),
    ('ruta_villas_marineras.jpg', 'https://www.rutasporcantabria.com/ruta-por-las-villas-marineras.html'),
    ('ruta_interior_desconocido.jpg', 'https://www.rutasporcantabria.com/ruta-por-el-interior-desconocido-de-cantabria.html'),
    ('ruta_carlos_v.jpg', 'https://www.rutasporcantabria.com/ruta-del-emperador-carlos-v.html'),
    ('ruta_cuevas_prehistoricas.jpg', 'https://www.rutasporcantabria.com/visita-a-las-cuevas-prehistoricas-de-cantabria.html'),
    ('ruta_cantabria_medieval.jpg', 'https://www.rutasporcantabria.com/ruta-por-la-cantabria-medieval.html'),
    ('ruta_puertos_miticos.jpg', 'https://www.rutasporcantabria.com/ruta-por-los-puertos-miticos-de-la-vuelta-a-espana.html'),
    ('ruta_campoo_palombera.jpg', 'https://www.rutasporcantabria.com/ruta-por-campoo-y-palombera.html'),
    ('ruta_cabuerniga.jpg', 'https://www.rutasporcantabria.com/ruta-por-cabuerniga.html'),
    ('ruta_polaciones_liebana.jpg', 'https://www.rutasporcantabria.com/ruta-por-polaciones-y-liebana.html'),
    ('ruta_arte_romanico.jpg', 'https://www.rutasporcantabria.com/arte-romanico-en-campoo-y-valderredible.html'),
    ('ruta_soba_ason.jpg', 'https://www.rutasporcantabria.com/ruta-por-soba-y-ason.html'),
    ('ruta_playa_montana.jpg', 'https://www.rutasporcantabria.com/un-dia-de-playa-y-montana-en-cantabria.html'),
    ('ruta_montignac_vezere.jpg', 'https://www.france.fr/es/articulo/ruta-coche-montignac-valle-vezere/')
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'}

for fname, url in urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            
            # Find og:image or first big image
            match = re.search(r'property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', html, re.I)
            if not match:
                match = re.search(r'content=["\']([^"\']+)["\']\s+property=["\']og:image["\']', html, re.I)
            if not match:
                match = re.search(r'<img\s+[^>]*src=["\']([^"\']+\.(?:jpg|png|webp))["\']', html, re.I)
                
            if match:
                img_url = match.group(1)
                if img_url.startswith('//'):
                    img_url = 'https:' + img_url
                elif not img_url.startswith('http'):
                    parts = url.split('/')
                    domain = parts[0] + '//' + parts[2]
                    if img_url.startswith('/'):
                        img_url = domain + img_url
                    else:
                        img_url = domain + '/' + img_url

                print(f'{fname} -> {img_url}')
                img_req = urllib.request.Request(img_url, headers=headers)
                with urllib.request.urlopen(img_req, timeout=12) as img_resp:
                    with open(fname, 'wb') as f:
                        f.write(img_resp.read())
                print(f'Downloaded {fname} successfully ({os.path.getsize(fname)} bytes)')
            else:
                print(f'No image found for {url}')
    except Exception as e:
        print(f'Error processing {url}: {e}')
