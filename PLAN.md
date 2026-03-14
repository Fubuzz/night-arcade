# Night Arcade integration plan

## Objective
Integrate playable Orbit Drop and Stack Sprint experiences into Night Arcade without breaking the premium shell or existing non-game pages.

## Scope
- Inspect workspace for existing Orbit / Stack Sprint game code
- Add reusable game-embed architecture
- Mount playable games at `/games/orbit-drop` and `/games/stack-sprint`
- Update README with integration/add-more-games guidance
- Validate with lint/build and route rendering checks

## Findings / risks
- Stack Sprint source appears to exist in `/data/.openclaw/workspace/tmp-stack-sprint-fix`
- Orbit Drop source is not yet found in workspace; may require creating a clean playable replacement if original source truly does not exist
- Need mobile-friendly embed behavior and intentional production feel

## Validation plan
- `npm run lint`
- `npm run build`
- Run app and verify both routes render playable game surfaces
