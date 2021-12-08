
interface OSNotification extends OSNotificationBuildConfig {
    nid:string
    date: number,
}
interface OSNotificationBase {
    title?: string,
    content: string,
    packageID: PackageID
}
interface OSNotificationBuildConfig extends OSNotificationBase {
}