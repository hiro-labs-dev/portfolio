# Hiro Labs → Figma

Import-ready HTML for building an organized Figma file of hiro-labs.dev with the html.to.design plugin.
Each file becomes one Figma page.

| File | Figma page | Import width |
|---|---|---|
| 00-cover.html | Cover | 1920 (then set as file thumbnail) |
| 01-foundations.html | Foundations | 1440 |
| 02-components.html | Components | 1440 |
| 03-home.html | Screens / Home | 1440 **and** 390 (import twice, place side by side) |

`tokens.css` holds the shared colors and type, so keep it next to the HTML files.
If the plugin can't load local files, serve the folder: `python3 -m http.server 8080` and
import `http://localhost:8080/<file>`.

## After import (~15 min)
1. **Color styles**: on Foundations, select each swatch → Fill → "Create style", named as labeled (e.g. `Background/Primary`).
2. **Text styles**: same for each sample on the Typography rows (`Display`, `Heading 2`, …).
3. **Components**: on Components, select each labeled block → Create component (⌥⌘K).
   Select a group's states → "Combine as variants" and name properties from the gray labels (`Type=Primary, State=Hover`).
4. **Swap instances**: on Home, replace the imported buttons and cards with instances of those components.
5. Mono font: the site uses SF Mono; if Figma flags it as missing, swap to Roboto Mono.
