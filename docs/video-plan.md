# Divin Solutions Video Plan

Status: Fase 3 concluida.

Objetivo: substituir os hero videos temporarios por videos claros, horizontais, profissionais e leves, sem criar um site pesado.

## Resultado final

1. Os 4 hero videos finais foram criados e integrados:
   - Home: `public/assets/rebrand-light/home/home-hero-final-10s.mp4`
   - Construction Supply: `public/assets/rebrand-light/supply/supply-hero-final-10s.mp4`
   - Civil Construction: `public/assets/rebrand-light/civil/civil-hero-final-10s.mp4`
   - Accommodations & Industrial Support: `public/assets/rebrand-light/accommodations/accommodations-hero-final-10s.mp4`
2. Cada video tem poster/fallback WebP:
   - `home-hero-final-10s-poster.webp`
   - `supply-hero-final-10s-poster.webp`
   - `civil-hero-final-10s-poster.webp`
   - `accommodations-hero-final-10s-poster.webp`
3. Os videos finais ficaram otimizados para web:
   - MP4
   - sem audio
   - autoplay/loop/muted/playsInline
   - ficheiros finais entre cerca de 0.94 MB e 1.66 MB
4. Os videos antigos e ficheiros brutos foram retirados de `public` e arquivados localmente em `asset-archive/phase-3-unused-public-assets`.
5. O build foi validado com `npm run build`.

## Especificacao recomendada

- Modelo: Sora / ChatGPT video
- Tipo: text-to-video
- Duracao: 10 segundos
- Formato principal: 1792x1024 ou 1280x720 horizontal
- Estilo: commercial documentary, bright construction operations, realistic, clean daylight
- Movimento: lento, estavel, sem camera dramatica
- Audio: nenhum
- Pessoas: sem rostos reconheciveis em destaque
- Texto: nenhum texto dentro do video
- Cor: claro, profissional, branco industrial, verde teal, areia/champagne, cinza concreto

## Prompt 1 - Home

Ultra-realistic horizontal commercial documentary video inside a modern construction company office with a large floor-to-ceiling window overlooking an active building site. Two people enter the office together: the client is wearing a dark business suit and tie, polished and professional; the Divin Solutions owner is wearing construction trousers, a clean button-up shirt, a safety helmet, and carries rolled construction drawings and site papers in one hand. They walk toward the window, pause, and look outside at a real construction project being built: cranes, workers at a safe distance, concrete structure, materials and site logistics visible through the glass. The atmosphere is bright, premium, trustworthy and optimistic, not corporate stock footage. No visible text, no logos, no readable documents, no exaggerated acting. Lighting is natural daylight from the window with soft office fill light. Palette: white office walls, concrete grey, teal green accents, muted champagne sand, navy suit. Cinematography: slow stabilized tracking shot from behind and slightly to the side as they enter, then a gentle orbit toward a three-quarter view near the window, leaving clean negative space on the left side for website headline overlay. Mood: trust, coordination, project confidence. Actions: seconds 0 to 2, both enter the office and walk naturally toward the window; seconds 2 to 5, they stop and look out at the construction site while the Divin owner gestures subtly with the rolled plans; seconds 5 to 8, they turn toward each other with genuine smiles; seconds 8 to 10, they shake hands confidently in front of the window, with the construction site still visible in the background. No audio.

Recommended parameters: Sora 2 Pro, 10 seconds, 1792x1024 or 1280x720, no audio.

## Prompt 2 - Construction Supply

Ultra-realistic horizontal commercial documentary video from the perspective of a construction site gatekeeper at the entrance of a large active building site. The camera is positioned just inside the security gate, slightly behind and beside the gatekeeper, looking outward as several construction material trucks arrive in an organized sequence. The gatekeeper wears a clean safety vest and helmet, holds a clipboard or tablet, and checks incoming deliveries without showing readable text. Trucks carry pallets, steel, pipes, concrete bags and site consumables; they slow down, queue calmly, and enter through the gate one by one. The site beyond the gate is bright, clean and coordinated, with cranes, concrete structure, material staging zones and forklifts visible in the background. No visible logos, no readable documents, no close-up faces, no chaotic traffic. Lighting is bright morning daylight, realistic and clear, not dark or cinematic. Palette: concrete grey, white site cabins, teal green safety accents, muted champagne sand, navy shadows. Cinematography: slow stabilized documentary tracking shot from the gatekeeper's point of view, with a gentle pan following the first truck as it enters, keeping clean negative space on the left side for website headline overlay. Mood: reliable supply, controlled access, materials arriving before the site stops. Actions: seconds 0 to 2, gatekeeper watches the access road as the first trucks approach; seconds 2 to 5, the first truck stops at the gate and is checked; seconds 5 to 8, multiple trucks enter in an orderly flow while forklifts prepare the receiving area; seconds 8 to 10, the gatekeeper gives a clear hand signal and the camera holds on the coordinated stream of materials entering the site. No audio.

Recommended parameters: fal.ai MiniMax H3, 10 seconds, 16:9, 768P, no audio.

## Prompt 3 - Civil Construction

Ultra-realistic horizontal commercial documentary video at the controlled perimeter entrance of a large civil construction site. A construction coordinator and a client enter the work perimeter together. The coordinator wears clean construction trousers, a button-up work shirt, safety boots, a white helmet and a high-visibility vest, carrying rolled drawings or site documents. The client wears a dark business suit and tie, polished and professional, also wearing a visitor safety helmet and vest. They approach the guarded perimeter gate from the outside, walking beside temporary fencing, concrete barriers and clear site access markings. Inside the perimeter there are foundations, drainage trenches, concrete bases, utility routes, excavators and workers at a safe distance. The coordinator raises one hand and waves calmly to the gatekeeper at the perimeter, asking for access. The gatekeeper acknowledges and opens or signals the entry, allowing both men to walk into the civil works area. No visible logos, no readable text, no close-up faces, no chaotic movement. Lighting is bright morning daylight, realistic and clear, not dark or cinematic. Palette: pale concrete, white daylight, teal green safety accents, muted sand, steel grey, navy suit. Cinematography: slow stabilized documentary tracking shot from a three-quarter side/back angle, following the coordinator and client as they approach and enter the perimeter, with clean negative space on the left side for website headline overlay. Mood: professional site control, safe access, technical coordination and project confidence. Actions: seconds 0 to 2, coordinator and client walk toward the guarded perimeter gate; seconds 2 to 4, the coordinator raises his hand and waves to the gatekeeper; seconds 4 to 6, the gatekeeper acknowledges and access is cleared; seconds 6 to 10, the coordinator and client enter the perimeter together, looking toward the active civil works and infrastructure area. No audio.

Recommended parameters: fal.ai MiniMax H3, 10 seconds, 16:9, 768P, no audio.

## Prompt 4 - Accommodations & Industrial Support

Ultra-realistic horizontal commercial documentary video from the perspective of a construction worker finishing his morning coffee inside a simple, clean single-storey house provided near a construction site. The camera feels like the worker's point of view, calm and natural, not shaky. A coffee mug is set down on a small kitchen table in warm morning light. The worker picks up a helmet or work bag and immediately, but normally, walks toward the front door. He opens the door and steps outside onto a small porch or paved entry path. A clean work van is already waiting outside the single-storey house, with the driver seated near the open window and several coworkers beside the van. The driver and coworkers greet him warmly with relaxed morning gestures, small waves and smiles, as if saying good morning before leaving for the site. The environment should feel safe, organized and livable: a neat ground-level house, clear access road, soft morning daylight, subtle construction site or industrial area in the far background. No visible logos, no readable text, no close-up faces, no exaggerated acting, no chaotic traffic. Palette: daylight white, light concrete, teal green safety accents, soft sand, muted vegetation, navy workwear. Cinematography: smooth first-person-to-over-the-shoulder transition, starting indoors and moving naturally outside, with clean negative space on the left side for website headline overlay after the door opens. Mood: workforce cared for, accommodation close to site, day starts smoothly. Actions: seconds 0 to 2, worker finishes coffee and sets the mug down; seconds 2 to 4, he picks up helmet or work bag and walks to the door; seconds 4 to 6, he exits the single-storey house into bright morning light; seconds 6 to 10, the waiting work van, driver and coworkers greet him with friendly good-morning gestures before departure. No audio.

Recommended parameters: fal.ai MiniMax H3, 10 seconds, 16:9, 768P, no audio.

## Prompt 5 - Optional mobile vertical Home

Vertical commercial documentary shot of a bright organized construction operations site, framed for a mobile website hero. Keep the central subject in the middle third and leave clean negative space at the top for navigation and headline overlay. Show temporary offices, materials, machinery routes and safe team movement in the distance. No visible text, no logos, no close-up faces. Bright daylight, realistic, clean white and concrete palette with teal green accents and muted champagne sand. Camera moves slowly forward with stable motion and minimal parallax. No audio.

Recommended parameters: Sora 2 Pro, 10 seconds, 720x1280 or 1024x1792, no audio.

## File naming after generation

- home-hero-final.mp4
- supply-hero-final.mp4
- civil-hero-final.mp4
- accommodations-hero-final.mp4
- home-hero-final-poster.webp
- supply-hero-final-poster.webp
- civil-hero-final-poster.webp
- accommodations-hero-final-poster.webp

## Integration checklist

1. Add raw files to a temporary folder. Done.
2. Optimize each video with ffmpeg. Done.
3. Export first clean frame as WebP poster. Done.
4. Replace hero video paths in `src/App.tsx`. Done.
5. Test desktop at 1440px and 1920px. Moved to final QA pass.
6. Test mobile at 390px and 430px. Moved to final QA pass.
7. Build with `npm run build`. Done.
8. Only after approval, remove old heavy videos. Done by moving unused heavy public assets to local archive.
