import { imagePath } from "../public";

export function getPackageIcon(pIconName: Array<AppDescriptionIconType>, appDescription: AppDescription): string {
    const pIconNamesCopy = Array.from(pIconName);
    for (const nextIconName of pIconNamesCopy) {
        const getIcon = appDescription.icon[nextIconName];
        if (getIcon != undefined) {
            return getIcon;
        }
    }
    return `${imagePath}not-logo.png`;
}