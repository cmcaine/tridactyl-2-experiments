// import * as Logging from "@src/lib/logging"

// const logger = new Logging.Logger("styling")

// let THEME_NAMES_CACHE: string[] = undefined
// async function installedThemes(): Promise<string[]> {
//   if (THEME_NAMES_CACHE === undefined) {
//     THEME_NAMES_CACHE = await installedThemesUncached()
//   }
//   return THEME_NAMES_CACHE
// }
// async function installedThemesUncached(): Promise<string[]> {
//   const package_dir: any = await browser.runtime.getPackageDirectoryEntry()
//   const themes_dir: any = package_dir.getDirectory("build/static/themes")
//   const reader: any = themes_dir.createReader()
//   return reader.readEntries()
//     .filter((fse: any) => fse.isDirectory())
//     .map((fse: any) => fse.name)
// }

// function capitalise(str: string): string {
//   if (str === "") return str
//   return str[0].toUpperCase() + str.slice(1)
// }

// function prefixTheme(name: string): string {
//   return "TridactylTheme" + capitalise(name)
// }

// // At the moment elements are only ever `:root` and so this array and stuff is all a bit overdesigned.
// const THEMED_ELEMENTS: HTMLElement[] = []

// let insertedCSS = false
// const customCss = {
//   allFrames: true,
//   matchAboutBlank: true,
//   code: "",
// }

// export async function theme(element: HTMLElement): Promise<void> {
//   // Remove any old theme
//   for (const theme of (await installedThemes()).map(prefixTheme)) {
//     element.classList.remove(theme)
//   }
//   if (insertedCSS) {
//     // Typescript doesn't seem to be aware than remove/insertCSS's tabid
//     // argument is optional
//     await browserBg.tabs.removeCSS(await ownTabId(), customCss)
//     insertedCSS = false
//   }

//   const newTheme = await config.getAsync("theme")

//   // Add a class corresponding to config.get('theme')
//   if (newTheme !== "default") {
//     element.classList.add(prefixTheme(newTheme))
//   }

//   // Insert custom css if needed
//   if (newTheme !== "default" && !(await installedThemes()).includes(newTheme)) {
//     customCss.code = await config.getAsync("customthemes", newTheme)
//     if (customCss.code) {
//       await browserBg.tabs.insertCSS(await ownTabId(), customCss)
//       insertedCSS = true
//     } else {
//       logger.error("Theme " + newTheme + " couldn't be found.")
//     }
//   }

//   // Record for re-theming
//   // considering only elements :root (page and cmdline_iframe)
//   // TODO:
//   //     - Find ways to check if element is already pushed
//   if (
//     THEMED_ELEMENTS.length < 2 &&
//       element.tagName.toUpperCase() === "HTML"
//   ) {
//     THEMED_ELEMENTS.push(element)
//   }
// }

// function retheme() {
//   THEMED_ELEMENTS.forEach(element => {
//     theme(element).catch(e => {
//       logger.warning(
//         `Failed to retheme element "${element}". Error: ${e}`,
//       )
//     })
//       })
// }

// config.addChangeListener("theme", retheme)

// // Sometimes pages will overwrite class names of elements. We use a
// // MutationObserver to make sure that the HTML element always has a
// // TridactylTheme class.
// //
// // We can't just call theme() because it would first try to remove
// // class names from the element, which would trigger the
// // MutationObserver before we had a chance to add the theme class and
// // thus cause infinite recursion
// new MutationObserver(async mutationList => {
//   const theme = await config.getAsync("theme")
//   mutationList
//     .filter(m => (m.target as Element).className.search(prefixTheme("")) === -1)
//     .forEach(m => (m.target as Element).classList.add(prefixTheme(theme)))
// }).observe(document.documentElement, {
//   attributes: true,
//   childList: false,
//   characterData: false,
//   subtree: false,
//   attributeOldValue: false,
//   attributeFilter: ["class"],
// })
